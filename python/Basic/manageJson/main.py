import json


with open('./data.json') as json_data:
    d = json.load(json_data)


print(d)
print(json.dumps(d))
# print(d['name'])
# logging.debug('My name is %s' % d['name'])
# print(d['job'])