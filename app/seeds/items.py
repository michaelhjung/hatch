from app.models import db, Item


def seed_items():
    control = Item(
        room_id=None,
        user_id=1,
        name='Control',
        serial_id='#master',
        img='https://bit.ly/3DMK5iw'
    )

    bottle = Item(
        room_id=None,
        user_id=1,
        name='Bottle',
        serial_id='B92E70',
        img='https://bit.ly/3zeSmt5'
    )

    tool = Item(
        room_id=None,
        user_id=2,
        name='Random Tool',
        serial_id='T25976',
        img='https://bit.ly/3fkwTbg'
    )

    cookie = Item(
        room_id=None,
        user_id=2,
        name='Cookie',
        serial_id='C00KI3',
        img='https://bit.ly/3DGqFfz'
    )


    db.session.add(control)
    db.session.add(bottle)
    db.session.add(tool)
    db.session.add(cookie)

    db.session.commit()


def undo_items():
    db.session.execute('TRUNCATE items RESTART IDENTITY CASCADE;')
    db.session.commit()
