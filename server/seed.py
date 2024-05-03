from app import app
from models import db, User, Game, GameStatistics
from faker import Faker

fake = Faker()

def create_users(num_users):
    users = []
    for _ in range(num_users):
        username = fake.user_name()
        password = fake.password()
        user = User(username=username, password=password)
        users.append(user)
    db.session.add_all(users)
    db.session.commit()

def create_games(num_games):
    games = []
    ratings = ['Everyone', 'Teen', 'Mature']
    for _ in range(num_games):
        game_name = fake.catch_phrase()
        genre = fake.word()
        developer = fake.company()
        maturity_level = fake.random_element(ratings)
        system = fake.word()
        description = fake.sentence()
        rating = fake.random_number()
        image = 'https://upload.wikimedia.org/wikipedia/en/c/c6/The_Legend_of_Zelda_Breath_of_the_Wild.jpg'
        release_date = fake.date_between(start_date='-30y', end_date='today').strftime('%Y-%m-%d')
        game = Game(game_name=game_name, genre=genre, developer=developer,
                    description=description, release_date=release_date, maturity_level=maturity_level,
                    system=system, rating=rating, image=image)
        games.append(game)
    db.session.add_all(games)
    db.session.commit()

with app.app_context():
    db.drop_all()
    db.create_all()

    create_users(3) # Create 3 users
    create_games(10) # Create 10 games

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