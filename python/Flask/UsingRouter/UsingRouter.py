from flask import Flask, request, jsonify
import json

app = Flask(__name__)


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/data', methods=['GET', 'POST'])
def message():
    if 'GET' == request.method:
        msg = request.args.get('message', '')
        return '[GET] echo ' + msg
    elif 'POST' == request.method:
        # 삽질의 흔적 ..
        # msg = request.form['message']
        # return '[POST] echo ' + msg
        # return request.form

        # data = request.form['message']
        # return 'test' + json.dumps(request.form)
        # return jsonify(request.get_json(force=True))
        # return json.dumps(request.data)
        # return '[POST] echo ' + jsonify(request.get_json()['message'])

        # 클라이언트에서 json 데이터를 전달하면 Content-Type이 application/json으로 전달되는 듯.
        # 따라서, request.get_json으로 받아 처리해야함.
        # json.form은 Content-Type이 x-www-form-urlencoded로 전달 되는 형식에 대해서 동작한다. (Postman으로 확인했으며, 이 포맷은 일반적으
        # 웹에서 <form>태그를 통해서 submit을 했을때의 Content-Type이라고 한다.
        return '[POST] echo ' + request.get_json()['message']
    else:
        return 'There is no process to handle %s method.' % request.method


if __name__ == '__main__':
    app.run()
