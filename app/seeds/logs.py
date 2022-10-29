from app.models import db, EventLog


def seed_logs():
    room1_log1 = EventLog(
        room_id=1,
        user_id=None,
        title='The Cave - Waking Up',
        body='Oh God, why is it so blurry...'
    )
    room1_log2 = EventLog(
        room_id=1,
        user_id=None,
        title='The Cave - Found Item',
        body='You found a bottle on the ground. There\'s a note inside... It says "Check your pockets."',
    )
    room2_log1 = EventLog(
        room_id=2,
        user_id=None,
        title='The Sewer - Observing New Room',
        body='An underground sewage system... Now to keep looking around...'
    )
    room2_log2 = EventLog(
        room_id=2,
        user_id=None,
        title='The Sewer - Creepy Thing in Water',
        body='Gross, did I feel something crawling on my feet?'
    )
    room2_log3 = EventLog(
        room_id=2,
        user_id=None,
        title='The Sewer - Found Note',
        body='A note... it says, "serial id: BA09JM19"'
    )
    room3_log1 = EventLog(
        room_id=3,
        user_id=None,
        title='The Locked Door - Observing New Room',
        body='I found a door, but it\'s locked... Looks like it wants a very specific key...'
    )
    room3_log2 = EventLog(
        room_id=3,
        user_id=None,
        title='The Locked Door - Found Note',
        body='A nother note... it says, "url: https://bit.ly/3fkBytZ"'
    )
    room3_log3 = EventLog(
        room_id=3,
        user_id=None,
        title='The Locked Door - Key',
        body='You made the right key! Nice...'
    )
    room4_log1 = EventLog(
        room_id=4,
        user_id=None,
        title='The Empty Room - Observing New Room',
        body='There\'s a hole in the ceiling, but how do I get up there? Maybe I can make something...'
    )
    room4_log2 = EventLog(
        room_id=4,
        user_id=None,
        title='The Empty Room - Game Console?',
        body='What is this old video game console doing here...? Someone must be living around here... gotta be careful...'
    )
    room4_log3 = EventLog(
        room_id=4,
        user_id=None,
        title='The Empty Room - Random Rabbit',
        body='A random rabbit.'
    )
    room4_log4 = EventLog(
        room_id=4,
        user_id=None,
        title='The Empty Room - The Right Tool',
        body='Nice job again, let\'s get out of here...'
    )
    room5_log1 = EventLog(
        room_id=5,
        user_id=None,
        title='The Bat Cave - Observing New Room',
        body='What is this the bat cave? Am I supposed to be iron man or batman?'
    )
    room5_log2 = EventLog(
        room_id=5,
        user_id=None,
        title='The Bat Cave - Bat 1',
        body='A bat flew into you.'
    )
    room5_log3 = EventLog(
        room_id=5,
        user_id=None,
        title='The Bat Cave - Bat 2',
        body='Another bat flew into you.'
    )
    room5_log4 = EventLog(
        room_id=5,
        user_id=None,
        title='The Bat Cave - Bat 3',
        body='A third bat flew into you. This one dropped a note.'
    )
    room6_log1 = EventLog(
        room_id=6,
        user_id=None,
        title='The Telegraph - Observing New Room',
        body='Ok, now this is just getting weird. Did I teleport in time? Who designed this game?'
    )
    room6_log2 = EventLog(
        room_id=6,
        user_id=None,
        title='The Telegraph - Success',
        body='Solid work.'
    )
    room7_log1 = EventLog(
        room_id=7,
        user_id=None,
        title='The Dead End - Observing New Room',
        body='Dang it, I\'m back in the caves... but it looks like all I need to do now is get this final lock!'
    )
    room7_log2 = EventLog(
        room_id=7,
        user_id=None,
        title='The Dead End - Hunger',
        body='How long has it been since I ate? Really want a chocolate chip cookie right now...'
    )
    room8_log1 = EventLog(
        room_id=8,
        user_id=None,
        title='Game Over?',
        body='Congratulations, you escaped.'
    )
    room9_log1 = EventLog(
        room_id=9,
        user_id=None,
        title='Reality',
        body='You found the real final room. This world is not what it seems... Do you want to stay in wonderland, or see how far the rabbit hole goes...?'
    )


    db.session.add(room1_log1)
    db.session.add(room1_log2)
    db.session.add(room2_log1)
    db.session.add(room2_log2)
    db.session.add(room2_log3)
    db.session.add(room3_log1)
    db.session.add(room3_log2)
    db.session.add(room3_log3)
    db.session.add(room4_log1)
    db.session.add(room4_log2)
    db.session.add(room4_log3)
    db.session.add(room4_log4)
    db.session.add(room5_log1)
    db.session.add(room5_log2)
    db.session.add(room5_log3)
    db.session.add(room5_log4)
    db.session.add(room6_log1)
    db.session.add(room6_log2)
    db.session.add(room7_log1)
    db.session.add(room7_log2)
    db.session.add(room8_log1)
    db.session.add(room9_log1)


    db.session.commit()


def undo_logs():
    db.session.execute('TRUNCATE eventlogs RESTART IDENTITY CASCADE;')
    db.session.commit()
