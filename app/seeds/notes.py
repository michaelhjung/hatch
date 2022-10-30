from app.models import db, Note


def seed_notes():
    test_note1 = Note(
        user_id=1,
        title='Hi, Game Master',
        body='Welcome to hatch, a virtual escape room!'
    )
    test_note2 = Note(
        user_id=1,
        title='Notes',
        body='Feel free to create, read, update, or delete notes!'
    )
    test_note3 = Note(
        user_id=1,
        title='Items',
        body='Feel free to create, read, update, or delete items on the right side. We made some examples for you already, check them out.'
    )
    test_note4 = Note(
        user_id=2,
        title='Hi, Demo User',
        body='Welcome to hatch, a virtual escape room!'
    )
    test_note5 = Note(
        user_id=2,
        title='Notes',
        body='Feel free to create, read, update, or delete notes!'
    )
    test_note6 = Note(
        user_id=2,
        title='Items',
        body='Feel free to create, read, update, or delete items on the right side. We made some examples for you already, check them out.'
    )


    db.session.add(test_note1)
    db.session.add(test_note2)
    db.session.add(test_note3)
    db.session.add(test_note4)
    db.session.add(test_note5)
    db.session.add(test_note6)

    db.session.commit()


def undo_notes():
    db.session.execute('TRUNCATE notes RESTART IDENTITY CASCADE;')
    db.session.commit()
