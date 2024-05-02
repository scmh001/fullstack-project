#!/usr/bin/env python3

from flask import Flask, jsonify, make_response, request
from flask_cors import CORS
from models import db, User, Game, GameStatistics
from flask_restful import Api, Resource
from flask_migrate import Migrate
import os

app = Flask(__name__)
cors = CORS(app, origins='*')

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)

@app.route("/api/users", methods = ['GET'])
def users():
    return jsonify(
        {
            "users": [
                'shukri',
                'jasen',
                'michael',
                'kristen'
            ]
        }
    )

class Games(Resource):
    def get(self):
        games = [game.to_dict() for game in Game.query.all()]

        return make_response(games)
    
api.add_resource(Games, '/games')

class Users(Resource):
    def post(self):
        data = request.json
        try:
            new_user = User(
                username = data.get('username'),
                password = data.get('password')
            )
            if new_user:
                db.session.add(new_user)
                db.session.commit()

                return make_response(new_user, 201)
            else:
                return make_response({'error': 'user could not be made'}, 400) #TODO check code 
        except:
            return make_response({'error': ['validation errors']}, 400)
        
api.add_resource(Users, '/users')
        
class GamesById(Resource):
    def get(self, id):
        game = Game.query.filter(Game.id==id).first()
        if game:
            return make_response(game.to_dict())
        else:
            return make_response({'error': 'Game not found'}, 404)
    
api.add_resource(GamesById, 'games/<int:id')

class UsersById(Resource):
    def get(self, id):
        user = User.query.filter(User.id==id).first()
        if user:
            return make_response(user.to_dict())
        else:
            return make_response({'error': 'User not found'}, 404)
        
    def patch(self, id):
        user = User.query.filter(User.id == id).first()
        if not user:
            return make_response({"error": "User not found"}, 404)
        else:
            try:
                for attr in request.json:
                    setattr(user, attr, request.json.get(attr))
                
                db.session.add(user)
                db.session.commit()

                return make_response(user.to_dict(), 202)
            except:
                return make_response({"errors": ["validation errors"]}, 400)
           
    def delete(self, id):
        user = User.query.filter(User.id == id).first()
        if not user:
            return make_response({"error": "User not found"}, 404)
        else:
            db.session.delete(user)
            db.session.commit()

            return make_response({}, 204)

api.add_resource(UsersById, 'users/<int:id>')



if __name__ == "__main__":
    app.run(debug=True, port=8080)