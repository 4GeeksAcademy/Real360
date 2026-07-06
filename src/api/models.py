from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Integer, Float, Date, Numeric, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import date
from decimal import Decimal

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True)
    firstname: Mapped[str] = mapped_column(String(120))
    lastname: Mapped[str] = mapped_column(String(120))
    birth_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    rol: Mapped[str] = mapped_column(String(100), nullable=True)
    profile_image_url: Mapped[str] = mapped_column(String(500), nullable=True)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(255), nullable=False)

    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)

    def __repr__(self):
        return self.firstname + " " + self.lastname

    def __init__(self, firstname, lastname, rol, email, password):
        self.firstname = firstname
        self.lastname = lastname
        self.rol = rol
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

    period_start: Mapped[date] = mapped_column(Date, nullable=False)
    period_end: Mapped[date] = mapped_column(Date, nullable=False)

    currency: Mapped[str] = mapped_column(String(10), nullable=False)
    water_usage_total_m3: Mapped[Decimal] = mapped_column(
        Numeric(10, 3), nullable=False)
    water_usage_total_cost: Mapped[Decimal] = mapped_column(
        Numeric(10, 2), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "provider": self.provider,
            "supply_number": self.supply_number,
            "year": self.year,
            "month": self.month,
            "period_start": self.period_start.isoformat(),
            "period_end": self.period_end.isoformat(),
            "currency": self.currency,
            "water_usage_total_m3": float(self.water_usage_total_m3),
            "water_usage_total_cost": float(self.water_usage_total_cost)
        }
