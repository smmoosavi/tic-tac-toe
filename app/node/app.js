var io = require('socket.io')(9898);
var Server = require('./game-server');

var idealSocket = null;

io.on('connection', function (socket) {
    var serverID = -1;
    if (idealSocket == null) {
        idealSocket = socket;
    } else {
        serverID = Server.createGame(socket, idealSocket);
        idealSocket = null;
    }

    socket.on('disconnect', function () {
        if (idealSocket == socket) {
            idealSocket = null;
        }
        Server.onDisconnected(serverID, socket);
    });
});
