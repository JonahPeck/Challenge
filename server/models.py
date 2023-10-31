#imports
from flask_sqlalchemy import SQLAlchemy 
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates


db = SQLAlchemy()


class User(db.Model, SerializerMixin):
    __tablename__ = 'usertickets'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    description = db.Column(db.String)
    response = db.Column(db.String)
    status = db.Column(db.String, server_default="New")
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    @validates('email')
    def validate_email(self, key, email):
        if "@" in email and not None:
            return email
        else:
            raise Exception("Not a Valid Email input")

    @validates('name')
    def validate_title(self, key, name):
        if name is None or name == "":
            raise ValueError("Name must be provided.")
        return name

    @validates('description')
    def check_description(self, key, description):
        if description is None or description == "":
            raise ValueError("Description must be provided.")
        return description

        

        



    # def __repr__ (self):
    #     return f'<User {self.name}, created a ticket at {ticket_created}>'
    