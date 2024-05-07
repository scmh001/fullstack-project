"""empty message

Revision ID: 8f9d87379aa8
Revises: 
Create Date: 2024-05-07 18:05:55.938509

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8f9d87379aa8'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('games',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('game_name', sa.String(), nullable=True),
    sa.Column('genre', sa.String(), nullable=True),
    sa.Column('developer', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('release_date', sa.String(), nullable=True),
    sa.Column('maturity_level', sa.String(), nullable=True),
    sa.Column('system', sa.String(), nullable=True),
    sa.Column('rating', sa.Integer(), nullable=True),
    sa.Column('image', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('_password_hash', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('gameStatistics',
    sa.Column('game_stats_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('game_id', sa.Integer(), nullable=False),
    sa.Column('comments', sa.String(), nullable=True),
    sa.Column('rating', sa.Integer(), nullable=True),
    sa.Column('favorited', sa.Boolean(), nullable=True),
    sa.Column('wish_listed', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['game_id'], ['games.id'], name=op.f('fk_gameStatistics_game_id_games')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_gameStatistics_user_id_users')),
    sa.PrimaryKeyConstraint('game_stats_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('gameStatistics')
    op.drop_table('users')
    op.drop_table('games')
    # ### end Alembic commands ###
