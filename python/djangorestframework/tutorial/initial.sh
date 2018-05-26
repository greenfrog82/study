#!/usr/bin/env bash

rm db.sqlite3

rm -rf snippets/migrations/
rm -rf users/migrations/

python3 manage.py makemigrations
python3 manage.py makemigrations snippets

python3 manage.py migrate