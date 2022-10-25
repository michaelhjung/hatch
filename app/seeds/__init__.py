from flask.cli import AppGroup
from .users import seed_users, undo_users
from .rooms import seed_rooms, undo_rooms
from .notes import seed_notes, undo_notes
from .room_images import seed_room_images, undo_room_images
from .items import seed_items, undo_items
from .logs import seed_logs, undo_logs

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_rooms()
    seed_notes()
    seed_room_images()
    seed_items()
    seed_logs()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_rooms()
    undo_notes()
    undo_room_images()
    undo_items()
    undo_logs()
