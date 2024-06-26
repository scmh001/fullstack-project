#!/usr/bin/env python3

from flask import jsonify, make_response, request, session
from models import User, Game, GameStatistics
from flask_restful import  Resource
from sqlalchemy import desc

from config import app, db, api


# routes for login and user authentication 
@app.route('/users', methods=['POST']) #sign up route
def manage_users():
        data = request.json
        new_user = User(username=data.get('username')) #create new user instance 
        new_user.password_hash = data.get('password')  # Set the password_hash using the setter
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id #set session hash to user id to keep logged in
        response = make_response(new_user.to_dict())
        response.set_cookie('user_id', str(new_user.id))
        return response, 201

@app.route('/logout', methods=["GET"])
def logout():
    session['user_id'] = None #clear session hash
    response = make_response({})
    response.delete_cookie('user_id')
    return response, 200

@app.route('/authenticate-session') #route for authentication 
def authorize():
    cookie_id = request.cookies.get('user_id')  
    if cookie_id:
        user = User.query.filter_by(id=cookie_id).first() #check to see if cookie matches current user id
        if user:
            return make_response(user.to_dict(only=['id', 'username'])), 200
    return make_response({'message': 'failed to authenticate'}), 401

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data.get('username')).first() #check to see if username exists in db
    password = data.get('password') 
    if user and user.authenticate(password): #check entered password against encrypted password in db 
        session['user_id'] = user.id 
        response = make_response(user.to_dict())
        response.set_cookie('user_id', str(user.id))
        return response, 200
    return jsonify({'message': 'Invalid username or password'}), 401

# route to get all game stats for a user to display on their profile page 
@app.route('/reviews/<int:user_id>', methods=['GET'])
def get_reviews(user_id):
    reviews = [gamestat.to_dict() for gamestat in GameStatistics.query.filter(GameStatistics.user_id==user_id, GameStatistics.comments != None ).all()]
    if reviews:
        return make_response(reviews)
    else:
        return make_response({'error': ['No games reviewed yet']})

# route to get 5 comments made to display on home page
class RecentReviews(Resource):
    def get(self):
        games = [game.to_dict() for game in GameStatistics.query.filter(GameStatistics.comments != None).order_by(GameStatistics.rating.desc()).limit(5).all()]

        return make_response(games)
    
api.add_resource(RecentReviews, '/recent_reviews')

#route to get all games in db
class Games(Resource):
    def get(self):
        games = [game.to_dict() for game in Game.query.all()]

        return make_response(games)
    
api.add_resource(Games, '/games')

#route to order games by rating for most popular page 
class GamesByRating(Resource):
    def get(self):
        games = [game.to_dict() for game in Game.query.order_by(Game.rating.desc()).all()]

        return make_response(games)
    
api.add_resource(GamesByRating, '/games-by-rating')

#route that to get top 5 rated games to display on home page 
class TopGames(Resource):
    def get(self):
        games = [game.to_dict() for game in Game.query.order_by(Game.rating.desc()).limit(5).all()]

        return make_response(games)
    
api.add_resource(TopGames, '/top-games')

#route to get details for specific individual game page 
class GamesById(Resource):
    def get(self, id):
        game = Game.query.filter(Game.id==id).first()
        if game:
            return make_response(game.to_dict())
        else:
            return make_response({'error': 'Game not found'}, 404)
    
api.add_resource(GamesById, '/games/<int:id>')

#route to access user info and delete user 
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

#jasen was NOT wrong about how this works! 
class GameStatsByGameID(Resource):
    #this gets ALL comments, ratings for a specific game to be displayed on the individual game page 
    def get(self,game_id): 
        gamestats = [gamestat.to_dict() for gamestat in GameStatistics.query.filter(GameStatistics.game_id==game_id, GameStatistics.comments != None).all()]
        if gamestats:
            return make_response(gamestats)
        else:
            return make_response({'error': ['No reviews yet']})

api.add_resource(GameStatsByGameID, '/game-statistic/<int:game_id>')

class GameStatsByUserAndGameIDs(Resource):
    #this allows a user to patch (favorite, wishlist, comment, rate)
    def get(self, game_id, user_id):
        gamestat = GameStatistics.query.filter(GameStatistics.game_id == game_id, GameStatistics.user_id == user_id).first()
        if gamestat:
            return make_response(gamestat.to_dict())
        else:
            return make_response({'error': ['Game statistics not found']}, 404)
    
    def patch(self, game_id, user_id):
        gamestats = GameStatistics.query.filter(GameStatistics.game_id == game_id, GameStatistics.user_id == user_id).first()
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

#route for creating a new GameStatistic instance when a user comments, rates, favorites or wishlists for the first time
class GameStats(Resource):
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

# route for accessing a user's favorites to display on favorites page
class FavoritesByUser(Resource):
    def get(self, user_id):
        favorites = [gamestat.game.to_dict() for gamestat in GameStatistics.query.filter(GameStatistics.user_id==user_id, GameStatistics.favorited==True).all()]
        if favorites:
            return make_response(favorites)
        else:
            return make_response({'error': ['No games favorited yet']})
        
api.add_resource(FavoritesByUser, '/favorites/<int:user_id>')

# route for accessing a user's wishlisted items to display on wishlist page
class WishlistByUser(Resource):
    def get(self, user_id):
        wishlisted = [gamestat.game.to_dict() for gamestat in GameStatistics.query.filter(GameStatistics.user_id==user_id, GameStatistics.wish_listed==True).all()]
        if wishlisted:
            return make_response(wishlisted)
        else:
            return make_response({'error': ['No games in your wishlist yet']})
        
api.add_resource(WishlistByUser, '/wishlist/<int:user_id>')

#route for search queries for searchbar 
@app.route('/search', methods=['GET'])
def search_games():
    query = request.args.get('q')
    games = Game.query.filter(Game.game_name.ilike(f'%{query}%')).limit(10).all()
    return make_response([game.to_dict() for game in games])

if __name__ == "__main__":
    app.run(debug=True, port=8080)