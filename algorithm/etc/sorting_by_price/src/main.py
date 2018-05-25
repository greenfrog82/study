import json

def sort_by_price_ascending(data):
    data = json.loads(data)

    repo = {}
    for item in data:
        if not repo.get(item.get('price')):
            repo[item.get('price')] = [item.get('name')]
        else:
            repo.get(item.get('price')).append(item.get('name'))
            
    sorted_key = sorted(repo.keys())

    ret = []

    for key in sorted_key:
        items = repo[key]
        items = sorted(items)
        for item in items:
            ret.append({'name':item, 'price': key})

    return json.dumps(ret)

data = '[{"name": "eggs", "price": 1}, \
  {"name": "coffee", "price": 9.99}, \
  {"name": "rice", "price": 4.04}, \
  {"name": "apple", "price":1}]'

print sort_by_price_ascending(data) == '[{"price": 1, "name": "apple"}, {"price": 1, "name": "eggs"}, {"price": 4.04, "name": "rice"}, {"price": 9.99, "name": "coffee"}]'
