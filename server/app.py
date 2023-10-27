from flask import Flask, request, make_response, jsonify
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import db, User

from models import db, User

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///user.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)

api = Api(app)

class AllTickets(Resource):
    def get(self):
        all_tickets = User.query.all()
        dict_tickets = []
        for ticket in all_tickets:
            dict_tickets.append(ticket.to_dict())
        return make_response(dict_tickets, 200)
api.add_resource(AllTickets,'/home')

