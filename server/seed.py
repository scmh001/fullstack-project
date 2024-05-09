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


# fake = Faker()

with app.app_context():
    db.drop_all()
    db.create_all()

  
    create_games()
    # Create game statistics
    