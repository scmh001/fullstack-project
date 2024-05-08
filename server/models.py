from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable =False)
    _password_hash = db.Column(db.String, nullable=False)
    
    game_statistics = db.relationship('GameStatistics', back_populates='user', cascade='all, delete-orphan')
    games = association_proxy('game_statistics', 'game')
    
    serialize_rules = ('-game_statistics',)

    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8')) #encrypt passed in password
        self._password_hash = password_hash.decode('utf-8') #set private attribute to decoded password

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8') #check to see if encrypted password match
        )
class Game(db.Model, SerializerMixin):
    __tablename__ = 'games'
    
    id = db.Column(db.Integer, primary_key=True)
    game_name = db.Column(db.String)
    genre = db.Column(db.String)
    developer = db.Column(db.String)
    description = db.Column(db.String)
    release_date = db.Column(db.String)
    maturity_level = db.Column(db.String)
    release_date= db.Column(db.String)
    system = db.Column(db.String)
    rating = db.Column(db.Integer)
    image = db.Column(db.String)
    
    game_statistics = db.relationship('GameStatistics', back_populates='game')
    users = association_proxy('game_statistics', 'user')
    
    serialize_rules = ('-game_statistics',)
    
class GameStatistics(db.Model, SerializerMixin):
    __tablename__ = 'gameStatistics'
    
    game_stats_id = db.Column(db.Integer, primary_key=True) 
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)
    
    comments = db.Column(db.String, nullable=True)
    rating = db.Column(db.Integer, nullable=True)
    favorited = db.Column(db.Boolean, default = False)
    wish_listed = db.Column(db.Boolean, default = False)
    
    user = db.relationship('User', back_populates = 'game_statistics')
    game = db.relationship('Game', back_populates='game_statistics')
    

    # serialize_rules = ('-user', '-game',)
