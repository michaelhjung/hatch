from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    master = User(
        first_name='Game',
        last_name='Master',
        username='gamemaster',
        email='gamemaster@user.io',
        password='michaeljung',
        profile_pic='https://bit.ly/3gJiENx',
        secret_code='dr_doom'
    )

    demo = User(
        first_name='Demo',
        last_name='User',
        username='demouser',
        email='demouser@aa.io',
        password='password',
        profile_pic='https://bit.ly/3zb8KL6',
        secret_code='secret_code'
    )


    db.session.add(master)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
