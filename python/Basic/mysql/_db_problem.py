# import MySQLdb as my
import mysql.connector as connector
 
conn = connector.connect(
    host="docker.for.mac.localhost",
    user="root",
    passwd="1234",
    db="study_db"
)

cursor = conn.cursor()

# ret = cursor.execute("select * from auth_user where username in %(name)s", {'name': ','.join(['jaeyoung.cho'])})

query = "select * from person where name in (%s)"
# query = 'select * from person where name in (%(name)s)'
# args = {'name': 'greenfrog, greenfrog1'}
args = [['greenfrog', 'greenfrog1']]

# cursor.execute(query, ('greenfrog',))
# cursor.execute(query, ['greenfrog'])
cursor.execute(query, args)

for (name) in cursor:
    print(name)

cursor.close()
conn.close()