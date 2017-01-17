from flask import Flask

app = Flask(__name__, static_folder='test/abc')
# app = Flask(__name__)


@app.route('/')
def index():
    return app.send_static_file('orange.html')


if __name__ == '__main__':
    app.run()

