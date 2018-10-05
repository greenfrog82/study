import MySQLdb as my
 
db = my.connect(
    host="docker.for.mac.localhost",
    user="root",
    passwd="1234",
    db="study_db"
)

cursor = db.cursor()

# import pdb; pdb.set_trace()
cursor.execute(
    "select * from person where name in %(name)s", 
    {'name': ['greenfrog']}
)

for row in cursor.fetchall():
    print(row)