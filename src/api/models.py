from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Integer, Float, Date, Numeric, ForeignKey, UniqueConstraint, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import date, datetime
from decimal import Decimal

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True)
    firstname: Mapped[str] = mapped_column(String(120))
    lastname: Mapped[str] = mapped_column(String(120))
    birth_date: Mapped[str] = mapped_column(String(10), nullable=True)
    rol: Mapped[str] = mapped_column(String(100), nullable=True)
    profile_image_url: Mapped[str] = mapped_column(String(500), nullable=True)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(255), nullable=False)

    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)

    def __repr__(self):
        return self.firstname + " " + self.lastname

    def __init__(self, firstname, lastname, email, password):
        self.firstname = firstname
        self.lastname = lastname
        self.email = email
        self.password = password

        self.is_active = True

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "rol": self.rol,
            "birth_date": self.birth_date,
            "profile_image_url": self.profile_image_url,
            # do not serialize the password, its a security breach
        }


class Unit(db.Model):
    __tablename__ = "unit"

    id: Mapped[int] = mapped_column(primary_key=True)
    unit_number: Mapped[int] = mapped_column(Integer, unique=True)
    building: Mapped[str] = mapped_column(String(120))

    id_owner: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=True)
    owner: Mapped["User"] = relationship("User", foreign_keys=[id_owner])

    id_resident: Mapped[int] = mapped_column(
        ForeignKey("user.id"), nullable=True)
    resident: Mapped["User"] = relationship("User", foreign_keys=[id_resident])

    def __repr__(self):
        return self.building + " - " + str(self.unit_number)

    def serialize(self):
        return {
            "id": self.id,
            "unit_number": self.unit_number,
            "building": self.building,
            "id_owner": self.id_owner,
            "id_resident": self.id_resident
        }


class Income(db.Model):
    __tablename__ = "income"

    id: Mapped[int] = mapped_column(primary_key=True)

    payment_date: Mapped[date] = mapped_column(Date, nullable=False)
    description: Mapped[str] = mapped_column(String(120), nullable=False)
    currency: Mapped[str] = mapped_column(String(10), nullable=False)
    amount_paid: Mapped[float] = mapped_column(Float, nullable=False)
    operation_number: Mapped[int | None] = mapped_column(
        Integer, nullable=True)

    id_unit: Mapped[int] = mapped_column(ForeignKey("unit.id"), nullable=False)
    unit: Mapped["Unit"] = relationship("Unit")

    def serialize(self):
        return {
            "id": self.id,
            "payment_date": self.payment_date.isoformat(),
            "description": self.description,
            "currency": self.currency,
            "amount_paid": self.amount_paid,
            "operation_number": self.operation_number,
            "id_unit": self.id_unit,
        }


class Expenses (db.Model):
    __tablename__ = "expenses"

    id: Mapped[int] = mapped_column(primary_key=True)

    expense_date: Mapped[date] = mapped_column(Date, nullable=False)
    description: Mapped[str] = mapped_column(String(120), nullable=False)
    currency: Mapped[str] = mapped_column(String(10), nullable=False)
    expense_amount: Mapped[float] = mapped_column(
        Numeric(10, 2), nullable=False)
    operation_number: Mapped[str | None] = mapped_column(
        String(50), nullable=True)

    description_detail: Mapped[str] = mapped_column(String(255), nullable=True)

    def serialize(self):
        return {
            "id": self.id,
            "expense_date": self.expense_date,
            "description": self.description,
            "currency": self.currency,
            "expense_amount": self.expense_amount,
            "operation_number": self.operation_number,
            "description_detail": self.description_detail,
        }


class Budget (db.Model):
    __tablename__ = "budget"

    id: Mapped[int] = mapped_column(primary_key=True)

    building: Mapped[str] = mapped_column(String(120))
    year: Mapped[int] = mapped_column(Integer, nullable=True)
    month: Mapped[int] = mapped_column(Integer, nullable=True)

    group: Mapped[str] = mapped_column(String(120), nullable=True)
    category: Mapped[str] = mapped_column(String(120), nullable=True)
    description: Mapped[str] = mapped_column(String(120), nullable=True)

    currency: Mapped[str] = mapped_column(String(10), nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)
    base_amount: Mapped[Decimal] = mapped_column(
        Numeric(10, 2), nullable=False)

    additional_amount: Mapped[Decimal] = mapped_column(
        Numeric(10, 2), nullable=False, default=0)

    def serialize(self):
        return {
            "id": self.id,
            "building": self.building,
            "year": self.year,
            "month": self.month,
            "group": self.group,
            "category": self.category,
            "description": self.description,
            "currency": self.currency,
            "quantity": self.quantity,
            "base_amount": float(self.base_amount),
            "additional_amount": float(self.additional_amount),
        }


class WaterBill (db.Model):

    id: Mapped[int] = mapped_column(primary_key=True)

    provider: Mapped[str] = mapped_column(String(120), nullable=False)
    supply_number: Mapped[str] = mapped_column(String(50), nullable=False)
    year: Mapped[int] = mapped_column(Integer, nullable=False)
    month: Mapped[int] = mapped_column(Integer, nullable=False)

    bill_number: Mapped[str] = mapped_column(String(50), nullable=True)
    period_start: Mapped[date] = mapped_column(Date, nullable=False)
    period_end: Mapped[date] = mapped_column(Date, nullable=False)

    currency: Mapped[str] = mapped_column(String(10), nullable=False)
    water_usage_total_m3: Mapped[Decimal] = mapped_column(
        Numeric(10, 3), nullable=False)
    water_usage_total_cost: Mapped[Decimal] = mapped_column(
        Numeric(10, 2), nullable=False)

    water_bill_attachment: Mapped[str] = mapped_column(
        String(255), nullable=True)

    def serialize(self):
        return {
            "id": self.id,
            "provider": self.provider,
            "supply_number": self.supply_number,
            "year": self.year,
            "month": self.month,

            "bill_number": self.bill_number,
            "period_start": self.period_start.isoformat(),
            "period_end": self.period_end.isoformat(),
            "currency": self.currency,
            "water_usage_total_m3": float(self.water_usage_total_m3),
            "water_usage_total_cost": float(self.water_usage_total_cost),
            "water_bill_attachment": self.water_bill_attachment
        }


class WaterUsageUnit (db.Model):

    id: Mapped[int] = mapped_column(primary_key=True)

    provider: Mapped[str] = mapped_column(String(120), nullable=False)
    supply_number: Mapped[str] = mapped_column(String(50), nullable=False)
    year: Mapped[int] = mapped_column(Integer, nullable=False)
    month: Mapped[int] = mapped_column(Integer, nullable=False)

    building: Mapped[str] = mapped_column(String(120))
    unit_number: Mapped[int] = mapped_column(Integer)

    period_start: Mapped[date] = mapped_column(Date, nullable=True)
    period_end: Mapped[date] = mapped_column(Date, nullable=True)

    meter_reading_m3: Mapped[Decimal] = mapped_column(
        Numeric(10, 3), nullable=False)
    meter_reading_photo: Mapped[str] = mapped_column(
        String(255), nullable=True)

    def serialize(self):
        return {
            "id": self.id,
            "provider": self.provider,
            "supply_number": self.supply_number,
            "year": self.year,
            "month": self.month,
            "building": self.building,
            "unit_number": self.unit_number,
            "period_start": self.period_start.isoformat() if self.period_start else None,
            "period_end": self.period_end.isoformat() if self.period_end else None,
            "meter_reading_m3": float(self.meter_reading_m3),
            "meter_reading_photo": self.meter_reading_photo
        }


class ElectricityBills (db.Model):

    __tablename__ = "electricity_bills"

    id: Mapped[int] = mapped_column(primary_key=True)

    provider: Mapped[str] = mapped_column(String(120), nullable=False)
    supply_number: Mapped[str] = mapped_column(String(50), nullable=False)
    supply_number_2: Mapped[str] = mapped_column(String(50), nullable=False)
    year: Mapped[int] = mapped_column(Integer, nullable=False)
    month: Mapped[int] = mapped_column(Integer, nullable=False)

    period_start: Mapped[date] = mapped_column(Date, nullable=True)
    period_end: Mapped[date] = mapped_column(Date, nullable=True)

    electricity_usage_total_cost_1: Mapped[Decimal] = mapped_column(
        Numeric(10, 2), nullable=False)
    electricity_usage_total_cost_2: Mapped[Decimal] = mapped_column(
        Numeric(10, 2), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "provider": self.provider,
            "supply_number": self.supply_number,
            "supply_number_2": self.supply_number_2,
            "year": self.year,
            "month": self.month,
            "period_start": self.period_start.isoformat() if self.period_start else None,
            "period_end": self.period_end.isoformat() if self.period_end else None,
            "electricity_usage_total_cost": float(self.electricity_usage_total_cost_1 + self.electricity_usage_total_cost_2)
    }


class MaintenanceFees (db.Model):

    id: Mapped[int] = mapped_column(primary_key=True)

    report_number: Mapped[int] = mapped_column(Integer, nullable=False)
    emission_date: Mapped[date] = mapped_column(Date, nullable=False)
    building: Mapped[str] = mapped_column(String(120), nullable=False)
    year: Mapped[int] = mapped_column(Integer, nullable=False)
    month: Mapped[int] = mapped_column(Integer, nullable=False)

    unit_number: Mapped[int] = mapped_column(Integer, nullable=False)
    water_usage_total_cost: Mapped[float] = mapped_column(Numeric(10, 2))
    electricity_usage_common_cost: Mapped[float] = mapped_column(
        Numeric(10, 2))

    administration_amount: Mapped[float] = mapped_column(
        Numeric(10, 2), nullable=True)
    security_staff_amount: Mapped[float] = mapped_column(
        Numeric(10, 2), nullable=True)
    cleaning_staff_amount: Mapped[float] = mapped_column(
        Numeric(10, 2), nullable=True)
    elevator_maintenance_amount: Mapped[float] = mapped_column(
        Numeric(10, 2), nullable=True)
    miscellaneous_expenses_amount: Mapped[float] = mapped_column(
        Numeric(10, 2), nullable=True)
    preventive_maintenance_amount: Mapped[float] = mapped_column(
        Numeric(10, 2), nullable=True)

    penalty_amount: Mapped[float] = mapped_column(
        Numeric(10, 2), nullable=True)
    total_cost: Mapped[float] = mapped_column(Numeric(10, 2), nullable=True)


def serialize(self):
    return {
        "id": self.id,
        "report_number": self.report_number,
        "building": self.building,
        "year": self.year,
        "month": self.month,

        "unit_number": self.unit_number,
        "water_usage_total_cost": float(self.water_usage_total_cost),
        "electricity_usage_common_cost": float(self.electricity_usage_common_cost),

        "administration_amount": float(self.administration_amount),
        "security_staff_amount": float(self.security_staff_amount),
        "cleaning_staff_amount": float(self.cleaning_staff_amount),
        "elevator_maintenance_amount": float(self.elevator_maintenance_amount),
        "miscellaneous_expenses_amount": float(self.miscellaneous_expenses_amount),
        "preventive_maintenance_amount": float(self.preventive_maintenance_amount),

        "penalty_amount": float(self.penalty_amount),
        "total_cost": float(self.total_cost)
    }


class UnitDebt (db.Model):

    __table_args__ = (
        UniqueConstraint(
            "building",
            "unit_number",
            "fee_year",
            "fee_month",
            name="unique_unit_debt_period"
        ),
    )

    id: Mapped[int] = mapped_column(primary_key=True)

    building: Mapped[str] = mapped_column(String(120), nullable=False)
    unit_number: Mapped[int] = mapped_column(Integer, nullable=False)

    fee_year: Mapped[int] = mapped_column(Integer, nullable=False)
    fee_month: Mapped[int] = mapped_column(Integer, nullable=False)

    currency: Mapped[str] = mapped_column(String(10), nullable=False)
    fee_amount: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    payment_status: Mapped[str] = mapped_column(String(20), nullable=False, default="pending")

    paid_amount: Mapped[Decimal]= mapped_column(Numeric(10, 2), nullable=False, default=0)
    paid_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)

    @ property
    def pending_amount(self):
        return self.fee_amount - self.paid_amount

    def serialize(self):
        return {
            "id": self.id,
            "building": self.building,
            "unit_number": self.unit_number,
            "fee_year": self.fee_year,
            "fee_month": self.fee_month,
            "currency": self.currency,
            "fee_amount": float(self.fee_amount),
            "payment_status": self.payment_status,
            "paid_amount": float(self.paid_amount),
            "pending_amount": float(self.pending_amount),
            "paid_at": self.paid_at.isoformat() if self.paid_at else None,
        }

class ElectricityBill (db.Model):

    __tablename__ = "electricity_bill"

    id: Mapped[int] = mapped_column(primary_key=True)

    provider: Mapped[str] = mapped_column(String(120), nullable=False)
    building: Mapped[str] = mapped_column(String(120))
    supply_number_1: Mapped[str] = mapped_column(String(50), nullable=False)
    supply_number_2: Mapped[str] = mapped_column(String(50), nullable=False)
    year: Mapped[int] = mapped_column(Integer, nullable=False)
    month: Mapped[int] = mapped_column(Integer, nullable=False)

    period_start: Mapped[date] = mapped_column(Date, nullable=True)
    period_end: Mapped[date] = mapped_column(Date, nullable=True)

    electricity_usage_total_cost_1: Mapped[Decimal] = mapped_column(
        Numeric(10, 2), nullable=False)
    electricity_usage_total_cost_2: Mapped[Decimal] = mapped_column(
        Numeric(10, 2), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "provider": self.provider,
            "supply_number_1": self.supply_number,
            "supply_number_2": self.supply_number_2,
            "year": self.year,
            "month": self.month,
            "period_start": self.period_start.isoformat() if self.period_start else None,
            "period_end": self.period_end.isoformat() if self.period_end else None,
            "electricity_usage_total_cost": float(self.electricity_usage_total_cost_1 + self.electricity_usage_total_cost_2)
    }

