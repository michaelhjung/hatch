from app.models import db, Item


def seed_items():
    bottle = Item(
        room_id=1,
        user_id=None,
        name='Bottle with a Note',
        serial_id='B92E70',
        img='https://bit.ly/3zeSmt5'
    )

    cookie = Item(
        room_id=None,
        user_id=1,
        name='Cookie',
        serial_id='C00KI3',
        img='https://bit.ly/3DGqFfz'
    )


    db.session.add(bottle)
    db.session.add(cookie)

    db.session.commit()


def undo_items():
    db.session.execute('TRUNCATE items RESTART IDENTITY CASCADE;')
    db.session.commit()
