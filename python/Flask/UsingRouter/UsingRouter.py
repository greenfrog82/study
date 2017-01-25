from flask import Flask, request, jsonify
import json

app = Flask(__name__)


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/data', methods=['GET', 'POST'])
def message():
    if 'GET' == request.method:
        msg = request.args.get('message')
        return '[GET] echo ' + msg
    elif 'POST' == request.method:
        return '[POST] echo ' + request.get_json()['message']
    else:
        return 'There is no process to handle %s method.' % request.method


if __name__ == '__main__':
    app.run()
