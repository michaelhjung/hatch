from app.models import db, Note


def seed_notes():
    test_note = Note(
        user_id=1,
        title='Test Note Title',
        body='Test Note Body'
    )


    db.session.add(test_note)

    db.session.commit()


def undo_notes():
    db.session.execute('TRUNCATE notes RESTART IDENTITY CASCADE;')
    db.session.commit()
