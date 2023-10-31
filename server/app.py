from flask import Flask, request, make_response, jsonify
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS
from models import db, Ticket
# from email import notify_admin_of_ticket_create


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///usertickets.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)

api = Api(app)
CORS(app)

class AllTickets(Resource):

    def get(self):
        response_dict_list = [n.to_dict() for n in Ticket.query.all()]
        response = make_response(
            response_dict_list,
            200,
        )
        return response


    def post(self):
        data = request.get_json()
        try:
            new_ticket = Ticket(
                title = data['name'],
                submitted_by = data['email'],
                description = data['description'],
                # status = data['status'],
                # response = data['response'],
            )
        except ValueError as e:
            return make_response({"error": str(e)}, 400)

        db.session.add(new_ticket)
        db.session.commit()
        notify_admin_of_ticket_create()
        response_dict = new_ticket.to_dict()
        response = make_response(
            response_dict,
            201,
        )
        return response
    
api.add_resource(AllTickets,'/tickets')


class TicketById(Resource):
    def get(self, id):
        response_dict = Ticker.query.filter_by(id=id).first().to_dict()

        response = make_response(
            response_dict,
            200,
        )
        return response

    def patch(self, id):
        record = Ticket.query.filter(Ticket.id == id).first()
        for attr in request.form:
            setattr(record, attr, request.form[attr])
            
            db.session.add(record)
            db.session.commit()

            response_dict = record.to_dict()
            response = make_response(
                response_dict,
                200
            )

            return response

    def delete(self, id): 
        ticket = Ticket.query.get(id)

        if ticket:
            db.session.delete(ticket)
            db.session.commit()
            return make_response({"Ticket deleted successfully"}, 200)
        else:
            return make_response({"error": "Ticket not found"}, 404)

api.add_resource(TicketById, '/tickets/<int:id>')

if __name__ == '__main__':
    app.run(port=5000)





