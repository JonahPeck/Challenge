from flask import Flask, request, make_response, jsonify
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import db, User


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///usertickets.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)

api = Api(app)

class AllTickets(Resource):
    def get(self):
        response_dict_list = [n.to_dict() for n in User.query.all()]
        response = make_response(
            response_dict_list,
            200,
        )
        return response
    def post(self):
        new_ticket = User(
            name = request.form['name'],
            email = request.form['email'],
            description = request.form['description'],
            status = request.form['status']
        )
        db.session.add(new_ticket)
        db.session.commit()

        response_dict = new_ticket.to_dict()
        response = make_response(
            response_dict,
            201,
        )
        return response
    
api.add_resource(AllTickets,'/tickets')

class TicketById(Resource):
    def get(self, id):
        response_dict = User.query.filter_by(id=id).first().to_dict()

        response = make_response(
            response_dict,
            200,
        )
        return response

    def patch(self, id):
        record = User.query.filter(User.id == id).first()
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

        def delete (self, id):

            delete_ticket = User.query.filter_by(id=id).first()
            if delete_ticket:
                all_delete_ticket = User.query.filter_by(id=id).all()
                db.session.delete(delete_ticket)
                for delete_ticket in all_delete_ticket:
                    db.session.delete(delete_ticket)
                db.session.commit()
                return make_response({}, 200)
            else:
                return make_response({"error":"Ticket not found"}, 400)

api.add_resource(TicketById, '/tickets/<int:id>')

if __name__ == '__main__':
    app.run(port=5555)




