from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

db = SQLAlchemy()


class Rol (db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    rol_type: Mapped[str] = mapped_column(String(120))

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    firstname: Mapped[str] = mapped_column(String(120))
    lastname: Mapped[str] = mapped_column(String(120))
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)

    id_rol: Mapped[int] = mapped_column(ForeignKey("rol.id"))
    rol: Mapped [Rol] = relationship ()

    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)

    def __init__(self, firstname, lastname, email, password):
        self.email = email
        self.password = password
        self.firstname = firstname
        self.lastname = lastname
        self.is_active = True

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "firstname": self.firstname,
            "lastname": self.lastname,
            # do not serialize the password, its a security breach
        }


class Unit (db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    unit_number: Mapped [int] = mapped_column ()
    Building: Mapped[str] = mapped_column(String(120))

    id_owner: Mapped[int] = mapped_column(ForeignKey("user.id"))
    owner: Mapped [User] = relationship ()

    id_resident: Mapped[int] = mapped_column(ForeignKey("user.id"))
    resident: Mapped [User] = relationship ()

    def __init__(self, unit_number, building):
        self.unit_number = unit_number
        self.building = building

    def serialize(self):
        return {
            "id": self.id,
            "unit_number": self.unit_number,
            "building": self.building,
        }
