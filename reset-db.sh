# DELETE OLD DATABASE AND VERSIONS FOLDER:
rm -rf instance/dev.db
rm -rf migrations/versions
echo "==> Finished deleting database"

# RECREATE VERSIONS FOLDER:
mkdir migrations/versions

# RE-CREATE TABLES AND SEED:
pipenv run flask db migrate -m "Create all tables"
pipenv run flask db upgrade
pipenv run flask seed all
echo "==> Finished remigrating and seeding new database"
echo "==> 수고했어요!"
