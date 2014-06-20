var io = require('socket.io')(9898);
var Server = require('./game-server');

var idealSocket = null;

io.on('connection', function (socket) {
    if (idealSocket == null) {
        console.log('ideal');
        idealSocket = socket;
    } else {
        console.log('new game');
        var server = new Server();
        server.init();
        server.addPlayer(socket);
        server.addPlayer(idealSocket);
        server.start();
        idealSocket = null;
    }
});
