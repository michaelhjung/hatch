from app.models import db, Note


def seed_notes():
    test_note = Note(
        user_id=1,
        title='Hello, Game Master',
        body='This is where you can write notes.'
    )
    test_note2 = Note(
        user_id=2,
        title='Hello, Demo User',
        body='This is where you can write notes.'
    )


    db.session.add(test_note)
    db.session.add(test_note2)

    db.session.commit()


def undo_notes():
    db.session.execute('TRUNCATE notes RESTART IDENTITY CASCADE;')
    db.session.commit()
