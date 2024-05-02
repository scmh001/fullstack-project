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

# @app.route("/api/users", methods = ['GET'])
# def users():
#     return jsonify(
#         {
#             "users": [
#                 'shukri',
#                 'jasen',
#                 'michael',
#                 'kristen'
#             ]
#         }
#     )

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
    
api.add_resource(GamesById, '/games/<int:id>')

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

api.add_resource(UsersById, '/users/<int:id>')

#jasen might be wrong about how this should work and is willing to accept responsibility 
class GameStatsByGameID(Resource):
    #this gets ALL comments, reviews for a specific game NOT BY USER
    def get(self,game_id): 
        gamestats = [gamestat.to_dict() for gamestat in GameStatistics.query.filter(GameStatistics.game_id==game_id).all()]
        if gamestats:
            return make_response(gamestats)
        else:
            return make_response({'error': ['No reviews yet']})

api.add_resource(GameStatsByGameID, '/game-statistic/<int:game_id>')

class GameStatsByUserAndGameIDs(Resource):
    #this allows a user to patch, passing both ids in (i think)
    def patch(self, game_id, user_id):
        gamestats = GameStatistics.query.filter(GameStatistics.game_id == game_id and GameStatistics.user_id==user_id).first()
        if not gamestats:
            return make_response({"error": "User not found"}, 404)
        else:
            try:
                for attr in request.json:
                    setattr(gamestats, attr, request.json.get(attr))
                
                db.session.add(gamestats)
                db.session.commit()

                return make_response(gamestats.to_dict(), 202)
            except:
                return make_response({"errors": ["validation errors"]}, 400)

api.add_resource(GameStatsByUserAndGameIDs, '/game-statstics/<int:game_id>/<int:user_id>')

class GameStats(Resource):
    #is this right???
    def post(self):
        data = request.json
        try:
            new_gamestats = GameStatistics(
                user_id = data.get('user_id'),
                game_id = data.get('game_id'),
                comments = data.get('comments'),
                rating = data.get('rating'),
                favorited = data.get('favorited'),
                wishlisted = data.get('wishlisted')
            )
            if new_gamestats:
                db.session.add(new_gamestats)
                db.session.commit()

                return make_response(new_gamestats, 201)
            else:
                return make_response({'error': 'Review could not be made'}, 400) #TODO check code 
        except:
            return make_response({'error': ['validation errors']}, 400)

if __name__ == "__main__":
    app.run(debug=True, port=8080)