from app.models import db, Room


def seed_rooms():
    room1 = Room(
        user_id=1,
        progress_id=1,
        name='The Cave',
        entered=False
    )
    room2 = Room(
        user_id=1,
        progress_id=2,
        name='The Sewer',
        entered=False
    )
    room3 = Room(
        user_id=1,
        progress_id=3,
        name='The Sewer Door',
        entered=False
    )
    room4 = Room(
        user_id=1,
        progress_id=4,
        name='The Empty Room',
        entered=False
    )
    room5 = Room(
        user_id=1,
        progress_id=5,
        name='The Bat Cave',
        entered=False
    )
    room6 = Room(
        user_id=1,
        progress_id=6,
        name='The Telegraph',
        entered=False
    )
    room7 = Room(
        user_id=1,
        progress_id=7,
        name='The End',
        entered=False
    )
    room8 = Room(
        user_id=1,
        progress_id=8,
        name='Escaped!',
        entered=False
    )


    db.session.add(room1)
    db.session.add(room2)
    db.session.add(room3)
    db.session.add(room4)
    db.session.add(room5)
    db.session.add(room6)
    db.session.add(room7)
    db.session.add(room8)

    db.session.commit()


def undo_rooms():
    db.session.execute('TRUNCATE rooms RESTART IDENTITY CASCADE;')
    db.session.commit()
