# DELETE OLD DATABASE AND VERSIONS FOLDER:
rm -rf app/dev.db
rm -rf migrations/versions
echo "==> Finished deleting database"

# RECREATE VERSIONS FOLDER:
mkdir migrations/versions

# RE-CREATE TABLES AND SEED:
pipenv run flask db migrate -m "Create all tables"
pipenv run flask db upgrade
pipenv run flask seed all
echo "==> Finished remigrating and seeding new database"
echo "==> Otsukaresamadeshita!"
echo "==> cám ơn sự làm việc chăm chỉ của bạn!"
echo "==> 수고했어요!"
