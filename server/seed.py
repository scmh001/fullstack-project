from app import app
from models import db, User, Game, GameStatistics
from faker import Faker
import json
from os.path import join, dirname

def create_games():
    # Construct the file path to JSON data
    file_path = join(dirname(__file__), '../client/src/assets/TEST.json')

    # Load the JSON data
    with open(file_path, 'r') as file:
        data = json.load(file)

    for game_data in data:
        game = Game(
            game_name=game_data['name'],
            genre=game_data['genre'],
            developer=game_data['developer'],
            description=game_data['description'],
            release_date=str(game_data['release-date']),
            maturity_level=game_data['maturity-level'],
            system=game_data['system'],
            rating=game_data['rating'],
            image=game_data['image']
        )
        db.session.add(game)

    # Commit the changes to the database
    db.session.commit()


fake = Faker()

def create_users(num_users):
    users = []
    for _ in range(num_users):
        username = fake.email()
        password = fake.password()
        user = User(username=username, password=password)
        users.append(user)
    db.session.add_all(users)
    db.session.commit()

with app.app_context():
    db.drop_all()
    db.create_all()

    create_users(3) # Create 3 users
    create_games()
    # Create game statistics
    users = User.query.all()
    games = Game.query.all()
    for user in users:
        for game in games:
            if fake.boolean(chance_of_getting_true=50):
                rating = fake.random_int(min=1, max=5)
                favorited = fake.boolean(chance_of_getting_true=25)
                wish_listed = fake.boolean(chance_of_getting_true=25)
                comments = fake.sentence() if fake.boolean(chance_of_getting_true=50) else None
                gamestat = GameStatistics(user=user, game=game, rating=rating,
                                          favorited=favorited, wish_listed=wish_listed,
                                          comments=comments)
                db.session.add(gamestat)
    db.session.commit()