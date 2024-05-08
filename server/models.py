from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from sqlalchemy.exc import IntegrityError

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable =False, unique = True)
    _password_hash = db.Column(db.String, nullable=False)
    
    game_statistics = db.relationship('GameStatistics', back_populates='user', cascade='all, delete-orphan')
    games = association_proxy('game_statistics', 'game') # many to many relationship through game statistics
    
    serialize_rules = ('-game_statistics',) #serializing for recursion depth

    @validates('username')
    def validates_username(self, key, username):
        if not username:
            raise ValueError("Username cannot be left blank.")
        try:
            existing_user = User.query.filter_by(username=username).first()
            if existing_user and existing_user.id != self.id:
                raise ValueError("Username already exists.")
        except IntegrityError: #throws errors for db side constraints 
            raise ValueError("Username already exists.")
        return username
    
    @validates('_password_hash')
    def validates_password_hash(self, key, _password_hash):
        if not _password_hash:
            raise ValueError("Password cannot be left blank.")
        return _password_hash


    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter #setter function for private variable 
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8')) #encrypts the password passed in
        self._password_hash = password_hash.decode('utf-8') #sets the password to the decoded password

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8') #checks to see if encoded passed in password is the same as password_hash
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
    users = association_proxy('game_statistics', 'user') # many to many relationship through game statistics 
    
    serialize_rules = ('-game_statistics',) #serializing for recursion depth 
    
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

    @validates('user_id')
    def validates_user_id(self, key, user_id):
        if not user_id:
            raise ValueError("User ID cannot be blank.")
        return user_id
    
    @validates('game_id')
    def validates_game_id(self, key, game_id):
        if not game_id:
            raise ValueError("Game ID cannot be blank.")
        return game_id

   
