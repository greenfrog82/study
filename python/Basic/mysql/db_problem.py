import MySQLdb as my
 
db = my.connect(host="ngpdb.cdnetworks.com",
    user="prism_ui",
    passwd="tuNS?eLS(HIp60",
    db="prism"
)

print db


cursor = db.cursor()

format_strings = ','.join(['%s'] * 3)
print format_strings
ret = cursor.execute("select * from auth_user where username in (%(name)s)", {'name': ','.join(['jaeyoung.cho'])})
print ret