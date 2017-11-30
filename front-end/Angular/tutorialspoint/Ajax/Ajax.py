from flask import Flask, make_response, url_for
from settings import APP_STATIC
import json
import os

app = Flask(__name__, static_url_path='')


@app.route('/')
def hello_world():
    return app.send_static_file('index.html')


@app.route('/hello', methods=['GET'])
def hello():
    return 'Hello, World'


@app.route('/data', methods=['GET'])
def data():
    dataJsonFileAbsPath = os.path.join(APP_STATIC, 'data.json')

    with open(dataJsonFileAbsPath) as json_data:
        d = json.load(json_data)

    #return make_response(json.dumps(d), 200)
    return json.dumps(d)


if __name__ == '__main__':
    app.run()
