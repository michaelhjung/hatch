from app.models import db, RoomImage


def seed_room_images():
    room1image1 = RoomImage(
        room_id=1,
        name='The Cave - 1',
        img='https://bit.ly/3DxLKss',
        order='1'
    )
    room1image2 = RoomImage(
        room_id=1,
        name='The Cave - 2',
        img='https://bit.ly/3FgmWGx',
        order='2'
    )
    room2image1 = RoomImage(
        room_id=2,
        name='The Sewer - 1',
        img='https://bit.ly/3f5D8Qd',
        order='1'
    )
    room2image2 = RoomImage(
        room_id=2,
        name='The Sewer - 2',
        img='https://bit.ly/3N46YBk',
        order='2'
    )
    room3image1 = RoomImage(
        room_id=3,
        name='The Sewer Door',
        img='https://bit.ly/3Ff8O06',
        order='1'
    )
    room4image1 = RoomImage(
        room_id=4,
        name='The Empty Room',
        img='https://bit.ly/3DwkLgI',
        order='1'
    )
    room5image1 = RoomImage(
        room_id=5,
        name='The Bat Cave',
        img='https://bit.ly/3W0Yrmy',
        order='1'
    )
    room6image1 = RoomImage(
        room_id=6,
        name='The Telegraph',
        img='https://bit.ly/3gJqcjx',
        order='1'
    )
    room7image1 = RoomImage(
        room_id=7,
        name='The End',
        img='https://bit.ly/3TYRIrJ',
        order='1'
    )
    room8image1 = RoomImage(
        room_id=8,
        name='Escaped!',
        img='https://bit.ly/3zeZmWV',
        order='1'
    )


    # room1image1 = RoomImage(
    #     room_id=9,
    #     name='The Cave - 1',
    #     img='https://bit.ly/3DxLKss',
    #     order='1'
    # )
    # room1image2 = RoomImage(
    #     room_id=9,
    #     name='The Cave - 2',
    #     img='https://bit.ly/3FgmWGx',
    #     order='2'
    # )
    # room2image1 = RoomImage(
    #     room_id=10,
    #     name='The Sewer - 1',
    #     img='https://bit.ly/3f5D8Qd',
    #     order='1'
    # )
    # room2image2 = RoomImage(
    #     room_id=10,
    #     name='The Sewer - 2',
    #     img='https://bit.ly/3N46YBk',
    #     order='2'
    # )
    # room3image1 = RoomImage(
    #     room_id=11,
    #     name='The Sewer Door',
    #     img='https://bit.ly/3Ff8O06',
    #     order='1'
    # )
    # room4image1 = RoomImage(
    #     room_id=12,
    #     name='The Empty Room',
    #     img='https://bit.ly/3DwkLgI',
    #     order='1'
    # )
    # room5image1 = RoomImage(
    #     room_id=13,
    #     name='The Bat Cave',
    #     img='https://bit.ly/3W0Yrmy',
    #     order='1'
    # )
    # room6image1 = RoomImage(
    #     room_id=14,
    #     name='The Telegraph',
    #     img='https://bit.ly/3gJqcjx',
    #     order='1'
    # )
    # room7image1 = RoomImage(
    #     room_id=15,
    #     name='The End',
    #     img='https://bit.ly/3TYRIrJ',
    #     order='1'
    # )
    # room8image1 = RoomImage(
    #     room_id=16,
    #     name='Escaped!',
    #     img='https://bit.ly/3zeZmWV',
    #     order='1'
    # )


    db.session.add(room1image1)
    db.session.add(room1image2)
    db.session.add(room2image1)
    db.session.add(room2image2)
    db.session.add(room3image1)
    db.session.add(room4image1)
    db.session.add(room5image1)
    db.session.add(room6image1)
    db.session.add(room7image1)
    db.session.add(room8image1)

    db.session.commit()


def undo_room_images():
    db.session.execute('TRUNCATE room_images RESTART IDENTITY CASCADE;')
    db.session.commit()
