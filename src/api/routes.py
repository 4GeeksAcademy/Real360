"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, WaterBill
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

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

    if not email or not password:
        return jsonify({"msg": "Field email and field password are required"}), 400

    new_user = User(firstname, lastname, email, password)

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

    try:
        db.session.commit()
        return jsonify({"msg": "Perfil actualizado correctamente"}), 200

    except:
        db.session.rollback()
        return jsonify({"msg": "Error al actualizar"})
    
@api.route("/water-bills", methods=["POST"])
def create_water_bill():

    form = request.form
    file = request.files.get("water_bill_attachment")

    new_water_bill = WaterBill(
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
        db.session.commit()

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