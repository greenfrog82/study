rm db.sqlite3
rm -rf snippets/migrations/
python3 manage.py makemigrations snippet
python3 manage.py migrate