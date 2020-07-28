document.addEventListener('DOMContentLoaded', () => {
    connectSocketIO();
    addMessage();
});

var socket;
function connectSocketIO () {
    console.log(window.location.protocol);
    socket = io.connect(window.location.protocol + '//' + document.domain + ':' + location.port);
    socket.on('connect', () => {
        console.log('client connected');
        socket.on('disconnect', () => console.log('client disconnected'));
    });

    socket.on('message', (data) => {
            console.log("message received");
            console.log(data);
        });
}
function addMessage () {
    // emit a new message announcement when message is posted
    document.querySelector('#btn').onclick = () => {
        const message = document.querySelector('input').value;
        socket.emit('message', {'message': message});
        message = '';
        return false;
    };
}
