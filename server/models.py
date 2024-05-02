from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import MetaData
from sqlalchemy.ext.associationproxy import association_proxy


metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    password = db.Column(db.String)
    
    game_statistics = db.relationship('GameStatistics', back_populates='user', cascade='all, delete-orphan')
    games = association_proxy('game_statistics', 'game')
class Game(db.Model, SerializerMixin):
    __tablename__ = 'games'
    
    id = db.Column(db.Integer, primary_key=True)
    game_name = db.Column(db.String)
    genre = db.Column(db.String)
    developer = db.Column(db.String)
    description = db.Column(db.String)
    release_date = db.Column(db.String)
    
    game_statistics = db.relationship('GameStatistics', back_populates='game')
    users = association_proxy('game_statistics', 'user')
    
    
class GameStatistics(db.Model, SerializerMixin):
    __tablename__ = 'gameStatistics'
    
    game_stats_id = db.Column(db.Integer, primary_key=True) 
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)
    
    comments = db.Column(db.String)
    rating = db.Column(db.Integer)
    favorited = db.Column(db.Boolean, default = False)
    wish_listed = db.Column(db.Boolean, default = False)
    
    user = db.relationship('User', back_populates = 'game_statistics')
    game = db.relationship('Game', back_populates='game_statistics')