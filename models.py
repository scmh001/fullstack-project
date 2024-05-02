from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import MetaData

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    password = db.Column(db.String)
    
class Game(db.Model, SerializerMixin):
    __tablename__ = 'games'
    
    game_id = db.Column(db.Integer, primary_key=True)
    game_name = db.Column(db.String)
    genre = db.Column(db.String)
    developer = db.Column(db.String)
    description = db.Column(db.String)
    release_date = db.Column(db.String)
    
class GameStatistics(db.Model, SerializerMixin):
    __tablename__ = 'gameStatistics'
    
    game_stats_id = db.Column(db.Integer, primary_key=True) 
    
    comments = db.Column(db.String)
    rating = db.Column(db.Integer)
    favorited = db.Column(db.Boolean, default = False)
    