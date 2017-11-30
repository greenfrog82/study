from flask import Flask, make_response

app = Flask(__name__, static_url_path='')


@app.route('/')
def index():
    app.logger.info('index page')
    return app.send_static_file('index.html')


if __name__ == '__main__':
    app.run()