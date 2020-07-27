from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = 'secret?'
socketio = SocketIO(app, engineio_logger=True, logger=True)

@app.route("/", methods=["GET"])
def index():
    return render_template("layout.html")

@socketio.on('message')
def handleMessage(msg):
    print(msg)
    emit('message', {'data': msg}, broadcast=True)

if __name__ == '__main__':
    socketio.run(app)
