"""Create all tables

Revision ID: 388cc9350309
Revises: 
Create Date: 2022-11-01 08:31:36.972300

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '388cc9350309'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=40), nullable=False),
    sa.Column('last_name', sa.String(length=40), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('profile_pic', sa.String(length=255), nullable=False),
    sa.Column('secret_code', sa.String(length=255), nullable=False),
    sa.Column('viz', sa.Integer(), nullable=True),
    sa.Column('won', sa.Boolean(), nullable=True),
    sa.Column('current_room', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.String(length=255), nullable=True),
    sa.Column('updated_at', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('notes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('title', sa.String(length=255), nullable=False),
    sa.Column('body', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.String(length=255), nullable=True),
    sa.Column('updated_at', sa.String(length=255), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('rooms',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('progress_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('entered', sa.Boolean(), nullable=False),
    sa.Column('created_at', sa.String(length=255), nullable=True),
    sa.Column('updated_at', sa.String(length=255), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('eventlogs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('room_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('title', sa.String(length=255), nullable=False),
    sa.Column('body', sa.String(length=5000), nullable=False),
    sa.Column('created_at', sa.String(length=255), nullable=True),
    sa.Column('updated_at', sa.String(length=255), nullable=True),
    sa.ForeignKeyConstraint(['room_id'], ['rooms.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('items',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('room_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('serial_id', sa.String(length=255), nullable=False),
    sa.Column('img', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.String(length=255), nullable=True),
    sa.Column('updated_at', sa.String(length=255), nullable=True),
    sa.ForeignKeyConstraint(['room_id'], ['rooms.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('room_images',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('room_id', sa.Integer(), nullable=True),
    sa.Column('room_progress_id', sa.Integer(), nullable=True),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('img', sa.String(length=255), nullable=False),
    sa.Column('order', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.String(length=255), nullable=True),
    sa.Column('updated_at', sa.String(length=255), nullable=True),
    sa.ForeignKeyConstraint(['room_id'], ['rooms.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('room_images')
    op.drop_table('items')
    op.drop_table('eventlogs')
    op.drop_table('rooms')
    op.drop_table('notes')
    op.drop_table('users')
    # ### end Alembic commands ###