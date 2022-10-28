from app.models import db, Note


def seed_notes():
    test_note = Note(
        user_id=1,
        title='Hello, Game Master',
        body='Feel free to create, read, update, or delete notes!'
    )
    test_note2 = Note(
        user_id=2,
        title='Hello, Demo User',
        body='Feel free to create, read, update, or delete notes!'
    )


    db.session.add(test_note)
    db.session.add(test_note2)

    db.session.commit()


def undo_notes():
    db.session.execute('TRUNCATE notes RESTART IDENTITY CASCADE;')
    db.session.commit()
