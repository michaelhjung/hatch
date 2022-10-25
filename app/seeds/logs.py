from app.models import db, EventLog


def seed_logs():
    testuserlog = EventLog(
        room_id=None,
        user_id=1,
        title='Test User Event Log Title',
        body='Test user event log body'
    )
    room1log1 = EventLog(
        room_id=1,
        user_id=None,
        title='',
        body='Oh God, why is it so blurry...'
    )
    room1log2 = EventLog(
        room_id=1,
        user_id=None,
        title='',
        body='You found a bottle! There\'s a note inside... It says, There\'s a hidden escape path under your bed. You\'ll need this code: ',
    )
    room2log1 = EventLog(
        room_id=2,
        user_id=None,
        title='',
        body='An underground sewage system... Now to keep looking around...'
    )
    room2log2 = EventLog(
        room_id=2,
        user_id=None,
        title='',
        body='Gross, did I feel something crawling on my feet?'
    )
    room2log3 = EventLog(
        room_id=2,
        user_id=None,
        title='',
        body='A note... it says, "serial id: BA09JM19"'
    )
    room3log1 = EventLog(
        room_id=3,
        user_id=None,
        title='',
        body='I found a door, but it\'s locked... Looks like it wants a very specific key...'
    )
    room4log1 = EventLog(
        room_id=4,
        user_id=None,
        title='',
        body='There\'s a hole in the ceiling, but how do I get up there? Maybe I can make something...'
    )
    room4log2 = EventLog(
        room_id=4,
        user_id=None,
        title='',
        body='Interesting, when did this get here?'
    )
    room5log1 = EventLog(
        room_id=5,
        user_id=None,
        title='',
        body='What is this the bat cave? Am I supposed to be iron man or batman?'
    )
    room6log1 = EventLog(
        room_id=6,
        user_id=None,
        title='',
        body='Ok, now this is just getting weird. Did I teleport in time? Who\'s writing this script?'
    )
    room7log1 = EventLog(
        room_id=7,
        user_id=None,
        title='',
        body='Dang it, I\'m back in the caves... but it looks like all I need to do now is get this final lock!'
    )
    room7log2 = EventLog(
        room_id=7,
        user_id=None,
        title='',
        body='How long has it been since I ate? Really want a chocolate chip cookie right now...'
    )
    room8log1 = EventLog(
        room_id=8,
        user_id=None,
        title='',
        body='Congratulations you escaped!'
    )


    db.session.add(testuserlog)
    db.session.add(room1log1)
    db.session.add(room1log2)
    db.session.add(room2log1)
    db.session.add(room2log2)
    db.session.add(room2log3)
    db.session.add(room3log1)
    db.session.add(room4log1)
    db.session.add(room4log2)
    db.session.add(room5log1)
    db.session.add(room6log1)
    db.session.add(room7log1)
    db.session.add(room7log2)
    db.session.add(room8log1)

    db.session.commit()


def undo_logs():
    db.session.execute('TRUNCATE eventlogs RESTART IDENTITY CASCADE;')
    db.session.commit()
