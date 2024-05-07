#!/usr/bin/env python3

from flask import Flask, jsonify, make_response, request, session
from flask_cors import CORS
from models import db, User, Game, GameStatistics
from flask_restful import Api, Resource
from flask_migrate import Migrate
import os

app = Flask(__name__)
CORS(app)

app.secret_key = b'\x9c\x8a\xc3\xdd\xce\x9e\xb9\x99\xdb!8"w\xd5~\xde'

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)

@app.route('/users', methods=['POST'])
def manage_users():
        data = request.json
        new_user = User(username=data.get('username'), password=data.get('password'))
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id
        response = make_response(new_user.to_dict())
        response.set_cookie('user_id', str(new_user.id))
        return response, 201

@app.route('/logout', methods=["GET"])
def logout():
    session['user_id'] = None 
    response = make_response({})
    response.delete_cookie('user_id')
    return response, 200

@app.route('/authenticate-session')
def authorize():
    cookie_id = request.cookies.get('user_id')
    if cookie_id:
        user = User.query.filter_by(id=cookie_id).first()
        if user:
            return make_response(user.to_dict(only=['id', 'username'])), 200
    return make_response({'message': 'failed to authenticate'}), 401

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data.get('username')).first()
    if user and user.password == data['password']:
        session['user_id'] = user.id
        response = make_response(user.to_dict(only=['id', 'username']))
        response.set_cookie('user_id', str(user.id))
        return response, 200
    return jsonify({'message': 'Invalid credentials'}), 401


class RecentReviews(Resource):
    def get(self):
        games = [game.to_dict() for game in GameStatistics.query.order_by(GameStatistics.rating).limit(5).all()]

        return make_response(games)
    
api.add_resource(RecentReviews, '/recent_reviews')

class Games(Resource):
    def get(self):
        games = [game.to_dict() for game in Game.query.all()]

        return make_response(games)
    
api.add_resource(Games, '/games')

class TopGames(Resource):
    def get(self):
        games = [game.to_dict() for game in Game.query.order_by(Game.rating).limit(5).all()]

        return make_response(games)
    
api.add_resource(TopGames, '/top-games')

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
    #this gets ALL comments, ratings for a specific game NOT BY USER
    def get(self,game_id): 
        gamestats = [gamestat.to_dict() for gamestat in GameStatistics.query.filter(GameStatistics.game_id==game_id).all()]
        if gamestats:
            return make_response(gamestats)
        else:
            return make_response({'error': ['No reviews yet']})

api.add_resource(GameStatsByGameID, '/game-statistic/<int:game_id>')

class GameStatsByUserAndGameIDs(Resource):
    #this allows a user to patch, passing both ids in (i think)
    def get(self, game_id, user_id):
        gamestat = GameStatistics.query.filter(GameStatistics.game_id == game_id, GameStatistics.user_id == user_id).first()
        if gamestat:
            return make_response(gamestat.to_dict())
        else:
            return make_response({'error': ['Game statistics not found']}, 404)
    
    def patch(self, game_id, user_id):
        gamestats = GameStatistics.query.filter(GameStatistics.game_id == game_id, GameStatistics.user_id==user_id).first()
        if not gamestats:
            return make_response({"error": "Statistics not found"}, 404)
        else:
            try:
                for attr in request.json:
                    setattr(gamestats, attr, request.json.get(attr))
                
                db.session.add(gamestats)
                db.session.commit()

                return make_response(gamestats.to_dict(), 202)
            except:
                return make_response({"errors": ["validation errors"]}, 400)

api.add_resource(GameStatsByUserAndGameIDs, '/game-statistics/<int:game_id>/<int:user_id>')

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
                wish_listed = data.get('wish_listed')
            )
            if new_gamestats:
                db.session.add(new_gamestats)
                db.session.commit()

                return make_response(new_gamestats.to_dict(), 201)
            else:
                return make_response({'error': 'Review could not be made'}, 400) #TODO check code 
        except:
            return make_response({'error': ['validation errors']}, 400)
    
api.add_resource(GameStats, '/game-statistics')
class FavoritesByUser(Resource):
    def get(self, user_id):
        favorites = [gamestat.game.to_dict() for gamestat in GameStatistics.query.filter(GameStatistics.user_id==user_id, GameStatistics.favorited==True).all()]
        if favorites:
            return make_response(favorites)
        else:
            return make_response({'error': ['No games favorited yet']})
        
api.add_resource(FavoritesByUser, '/favorites/<int:user_id>')

class WishlistByUser(Resource):
    def get(self, user_id):
        wishlisted = [gamestat.game.to_dict() for gamestat in GameStatistics.query.filter(GameStatistics.user_id==user_id, GameStatistics.wish_listed==True).all()]
        if wishlisted:
            return make_response(wishlisted)
        else:
            return make_response({'error': ['No games in your wishlist yet']})
        
api.add_resource(WishlistByUser, '/wishlist/<int:user_id>')

if __name__ == "__main__":
    app.run(debug=True, port=8080)