"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, WaterBill, WaterUsageUnit, ElectricityBills, Income, UnitDebt, Budget, Expenses, ElectricityBill, UnitDebt
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from datetime import date
from sqlalchemy import func, extract
import smtplib
import ssl
from email.message import EmailMessage

SMTP_SERVER = "smtp.gmail.com".replace('\xa0', '')
PORT = 465
SENDER_EMAIL = "marioramirez.lopez98@gmail.com".replace('\xa0', '')
PASSWORD = "jnrc reoe aofl fcqp".replace('\xa0', '')
RECEIVER_EMAIL = "mario.ramirez@utp.edu.co".replace('\xa0', '')

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email, password=password).one_or_none()

    if not user or email != user.email or password != user.password:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token, user=user.serialize()), 200


@api.route("/signup", methods=["POST"])
def signup():
    firstname = request.json.get("firstname", None),
    lastname = request.json.get("lastname", None),
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    print(firstname)
    print(lastname)
    print(email)
    print(password)

    if not email or not password:
        return jsonify({"msg": "Field email and field password are required"}), 400

    new_user = User(firstname=firstname, lastname=lastname,
                    email=email, password=password)

    try:
        db.session.add(new_user)
        db.session.commit()

    except Exception as e:
        return jsonify({"msg": f"Unexpected {e=}, {type(e)=}"}), 500

    return jsonify({"msg": "Created succesfully", "user": new_user.serialize()}), 201


@api.route("/profile", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


@api.route("/editProfile", methods=["PUT"])
@jwt_required()
def update_user():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 401

    body = request.get_json()

    if "firstname" in body:
        user.firstname = body["firstname"]

    if "lastname" in body:
        user.lastname = body["lastname"]

    if "birth_date" in body:
        user.birth_date = body["birth_date"]

    if "profile_image_url" in body:
        user.profile_image_url = body["profile_image_url"]

    try:
        db.session.commit()
        return jsonify({"msg": "Perfil actualizado correctamente"}), 200

    except:
        db.session.rollback()
        return jsonify({"msg": "Error al actualizar"})


def send_email(subject, body, current_user_email):
    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = SENDER_EMAIL
    msg["To"] = current_user_email

    msg.set_content(body)

    html = f"""
    <html>
        <body style = "background-color: #f4f6f9; font-family: Arial, sans-serif;">
            <table align = "center" style = "background-color: #ffffff; border-radius: 8px; padding: 30px; margin: 20px auto">
                <tr>
                    <td align="center" style="padding-bottom: 20px;">
                        <img src="https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcSWzjqwm3npjKGoG0pFosBGO0ZXfvwBM44z91ZDwKB7Axi1WGLduscwONt8d3Bs5GyL9SDx9Ck6SwAjFNM" alt="Seguridad" width="80" style="display: block; border: 0;" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <h1 style = "text-align: center;">{subject.replace('\xa0', '')}</h1>
                        <p>{body.replace('\xa0', '')}</p>
                    </td>
                </tr>
            </table>
        </body>
    </html>
    """

    msg.add_alternative(html.replace('\xa0', ''), subtype="html")

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(SMTP_SERVER, PORT, context=context) as server:
        server.login(SENDER_EMAIL, PASSWORD)
        server.send_message(msg) 


@api.route("/change-password", methods=["POST"])
@jwt_required()
def update_password():

    current_password = request.json.get("current_password")
    new_password = request.json.get("new_password")

    current_user_email = get_jwt_identity()

    user = User.query.filter_by(email=current_user_email).first()

    if(current_password != user.password):
        return jsonify({"msg":"La contraseña actual es incorrecta"}), 401

    user.password = new_password

    db.session.commit()

    send_email("Contraseña Real 360 Actualizada", "Tu contraseña se ha actualizado con éxito 🎉", current_user_email)

    return jsonify({"msg":"Contraseña actualizada con éxito"}), 200


@api.route("/water-bills", methods=["POST"])
def create_water_bill():

    form = request.form
    file = request.files.get("water_bill_attachment")

    new_water_bill = WaterBill(
        bill_number=form.get("bill_number"),

        provider=form.get("provider"),
        supply_number=form.get("supply_number"),
        year=int(form.get("year")),
        month=int(form.get("month")),

        period_start=form.get("period_start"),
        period_end=form.get("period_end"),

        currency=form.get("currency"),

        water_usage_total_m3=form.get("water_usage_total_m3"),
        water_usage_total_cost=form.get("water_usage_total_cost"),

        water_bill_attachment=file.filename if file else None
    )

    try:
        db.session.add(new_water_bill)

        print("Nuevo WaterBill:", new_water_bill)

        db.session.commit()

        print("ID generado:", new_water_bill.id)

        return jsonify({
            "msg": "Recibo de agua registrado correctamente",
            "water_bill": new_water_bill.serialize()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "msg": "Error al registrar recibo",
            "error": str(e)
        }), 500


@api.route("/water-usage-units/previous", methods=["GET"])
def get_previous_water_usage_units():

    provider = request.args.get("provider")
    supply_number = request.args.get("supply_number")
    year = int(request.args.get("year"))
    month = int(request.args.get("month"))

    if month == 1:
        previous_month = 12
        previous_year = year - 1
    else:
        previous_month = month - 1
        previous_year = year

    previous_units = WaterUsageUnit.query.filter_by(
        provider=provider,
        supply_number=supply_number,
        year=previous_year,
        month=previous_month
    ).all()

    return jsonify({
        "previous_year": previous_year,
        "previous_month": previous_month,
        "units": [
            unit.serialize()
            for unit in previous_units
        ]
    }), 200


@api.route("/water-usage-units", methods=["POST"])
def create_water_usage_units():

    data = request.get_json()

    if not data:
        return jsonify({"error": "No se recibieron datos"}), 400

    try:
        for item in data:

            existing_unit = WaterUsageUnit.query.filter_by(
                provider=item["provider"],
                supply_number=item["supply_number"],
                year=item["year"],
                month=item["month"],
                unit_number=item["unit_number"]
            ).first()

            if existing_unit:
                # Actualiza la lectura si ya existe
                existing_unit.meter_reading_m3 = item["meter_reading_m3"]
                existing_unit.meter_reading_photo = item.get(
                    "meter_reading_photo")

            else:
                # Crea un nuevo registro si no existe
                water_usage_unit = WaterUsageUnit(
                    provider=item["provider"],
                    supply_number=item["supply_number"],
                    year=item["year"],
                    month=item["month"],
                    building=item["building"],
                    unit_number=item["unit_number"],
                    meter_reading_m3=item["meter_reading_m3"],
                    meter_reading_photo=item.get("meter_reading_photo")
                )

                db.session.add(water_usage_unit)

        db.session.commit()

        return jsonify({
            "message": "Lecturas guardadas correctamente",
            "total": len(data)
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@api.route("/electricity-usage", methods=["POST"])
def create_electricity_bill():
    body = request.get_json()

    for bill_data in body:

        if bill_data.get("supply_number") == "" or bill_data.get("supply_number") is None:
            continue

        p_start = bill_data["period_start"] if bill_data["period_start"] != "" else None
        p_end = bill_data["period_end"] if bill_data["period_end"] != "" else None
        s_num = bill_data["supply_number"] if bill_data["supply_number"] != "" else None
        s_num2 = bill_data["supply_number_2"] if bill_data["supply_number_2"] != "" else None


        existing_bill = ElectricityBills.query.filter_by(
            year = bill_data["year"],
            month = bill_data["month"]
        ).first()

        if existing_bill:
            existing_bill.period_start = p_start,
            existing_bill.period_end = p_end,
            existing_bill.supply_number = s_num,
            existing_bill.supply_number_2 = s_num2,

        else:
            new_bill = ElectricityBills(
                provider="Luz del Sur",
                year=bill_data["year"],
                month=bill_data["month"],
                period_start=p_start,
                period_end=p_end,
                supply_number=s_num,
                supply_number_2=s_num2,
            )
            db.session.add(new_bill)

    try:
        db.session.commit()

        return jsonify({
            "msg": "Guardado correctamente",
        }), 201

    except Exception as e:
        db.session.rollback()
        import traceback
        traceback.print_exc()
        return jsonify({"msg": str(e)}), 500
    

@api.route("/electricity-usage", methods=["GET"])
def get_electricity_bill():
    bills = ElectricityBills.query.filter_by(year = 2026).all()
    if not bills:
        return jsonify([]), 200
    
    return jsonify([bill.serialize()
                   for bill in bills]), 200


@api.route("/reports/get-water-bill", methods=["GET"])
def get_water_bill():
    supply_number = request.args.get("supply_number")
    year = request.args.get("year", type=int)
    month = request.args.get("month", type=int)

    water_bill = WaterBill.query.filter_by(
        supply_number=supply_number,
        year=year,
        month=month
    ).first()

    if not water_bill:
        return jsonify({
            "message": "No se encontró el recibo de agua para la selección indicada."
        }), 404

    return jsonify({
        "bill_number": water_bill.bill_number,
        "water_usage_m3_building": float(water_bill.water_usage_total_m3),
        "water_usage_cost_building": float(water_bill.water_usage_total_cost),
    }), 200


@api.route("/dashboard/budget/summary", methods=["GET"])
def get_budget_summary():

    today = date.today()

    total_budget = (
        db.session.query(
            func.coalesce(
                func.sum(
                    (Budget.base_amount * Budget.quantity)
                    + Budget.additional_amount
                ),
                0
            )
        )
        .filter(
            Budget.year == today.year,
            Budget.month == today.month
        )
        .scalar()
    )

    return jsonify({
        "total_budget": float(total_budget),
        "year": today.year,
        "month": today.month
    }), 200


@api.route("/dashboard/income/summary", methods=["GET"])
def get_income_month():
    today = date.today()

    total_income = db.session.query(func.coalesce(func.sum(Income.amount_paid), 0)
                                    ).filter(
        extract("year", Income.payment_date) == today.year,
        extract("month", Income.payment_date) == today.month
    ).scalar()

    return jsonify({
        "total_income": float(total_income),
        "year": today.year,
        "month": today.month
    }), 200


@api.route("/dashboard/expenses/summary", methods=["GET"])
def get_expenses_month():

    today = date.today()

    total_expenses = (
        db.session.query(
            func.coalesce(
                func.sum(Expenses.expense_amount),
                0
            )
        )
        .filter(
            extract("year", Expenses.expense_date) == today.year,
            extract("month", Expenses.expense_date) == today.month
        )
        .scalar()
    )

    return jsonify({
        "total_expenses": float(total_expenses),
        "year": today.year,
        "month": today.month
    }), 200


@api.route("/dashboard/debt/summary", methods=["GET"])
def get_debt_summary():

    total_debt = (
        db.session.query(
            func.coalesce(
                func.sum(
                    UnitDebt.fee_amount - UnitDebt.paid_amount
                ),
                0
            )
        )
        .filter(
            UnitDebt.payment_status != "paid"
        )
        .scalar()
    )

    return jsonify({
        "total_debt": float(total_debt)
    }), 200


@api.route("/water-bills/last-six-months", methods=["GET"])
def get_last_six_water_bills():
    # La consulta trae los más recientes primero; para el gráfico
    water_bills = (
        WaterBill.query
        .order_by(
            WaterBill.year.desc(),
            WaterBill.month.desc()
        )
        .limit(6)
        .all()
    )

    water_bills.reverse()  # los devolvemos de más antiguo a más reciente.

    month_names = ["Ene", "Feb", "Mar", "Abr", "May",
                   "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]

    result = [
        {
            "month_name": f"{month_names[bill.month - 1]} {bill.year}",
            "water_usage_total_cost": float(bill.water_usage_total_cost)
        }
        for bill in water_bills
    ]

    return jsonify(result), 200


@api.route("/electricity-bills/last-six-months", methods=["GET"])
def get_last_six_electricity_bills():

    electricity_bill = (
        ElectricityBill.query
        .order_by(
            ElectricityBill.year.desc(),
            ElectricityBill.month.desc()
        )
        .limit(6)
        .all()
    )

    electricity_bill.reverse()

    return jsonify([
        bill.serialize()
        for bill in electricity_bill
    ])

@api.route("/unit-debts", methods=["GET"])
def get_unit_debts():

    unit_debts = (
        UnitDebt.query
        .order_by(
            UnitDebt.building,
            UnitDebt.unit_number,
            UnitDebt.fee_year.desc(),
            UnitDebt.fee_month.desc()
        )
        .all()
    )
    return jsonify([debt.serialize() for debt in unit_debts]), 200