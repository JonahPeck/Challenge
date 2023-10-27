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
    status = db.Column(db.String)
    ticket_created = db.Column(db.DateTime, server_default=db.func.now())

    #validations for names and email
    @validates('email')
    def check_email(self, key, email):
        if "@" in email:
            return email 
        else:
            raise Exception("Not a Valid Email, must contain '@' symbol")
    
    @validates('name')
    def check_name(self, key, name):
        if not name:
            raise ValueError("Name must be provided.")
        return name

    @validates('description')
    def check_description(self, key, description):
        if not description:
            raise ValueError("Description must be provided.")
        return description
        

        



    # def __repr__ (self):
    #     return f'<User {self.name}, created a ticket at {ticket_created}>'
    