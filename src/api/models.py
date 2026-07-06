from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True)
    firstname: Mapped[str] = mapped_column(String(120))
    lastname: Mapped[str] = mapped_column(String(120))
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    rol: Mapped[str] = mapped_column(String(100), nullable=True)

    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)

    def __repr__(self):
        return self.firstname + " " + self.lastname

    def __init__(self, firstname, lastname, rol, email, password ):
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
    unit_number: Mapped[int] = mapped_column(Integer)
    building: Mapped[str] = mapped_column(String(120))

    id_owner: Mapped [int] = mapped_column (ForeignKey("user.id"))
    owner:Mapped ["User"] = relationship ("User", foreign_keys=[id_owner])

    id_resident: Mapped [int] = mapped_column (ForeignKey("user.id"))
    resident:Mapped ["User"] = relationship ("User", foreign_keys=[id_resident])

    def serialize(self):
        return {
            "id": self.id,
            "unit_number": self.unit_number,
            "building": self.building,
            "id_owner": self.id_owner,
            "id_resident": self.id_resident
        }