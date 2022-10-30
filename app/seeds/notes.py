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
    test_note3 = Note(
        user_id=2,
        title='Items',
        body='Also feel free to create, read, update, or delete items on the right! We made some cookies for you already as an example.'
    )


    db.session.add(test_note)
    db.session.add(test_note2)
    db.session.add(test_note3)

    db.session.commit()


def undo_notes():
    db.session.execute('TRUNCATE notes RESTART IDENTITY CASCADE;')
    db.session.commit()
