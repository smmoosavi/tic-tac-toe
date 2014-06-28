var Core = require('./game-core');
var events = require('events');

var servers = {};
var lastServerID = 0;

function Server(serverID) {
    var server = this;
    var core = null;
    var lastID = 0;
    var players = [];
    server.id = serverID;
    server.init = function () {
        core = new Core(server);
        core.init();
    };
    server.addPlayer = function (socket) {
        var pid = lastID;
        players.push({socket: socket, pid: pid});
        socket.on('set', function (x, y) {
            core.set(x, y, pid);
        });
        lastID += 1;
        console.log(pid, socket.id, serverID);
    };

    server.start = function () {
        setTimeout(countDownGen(3), 0);
        setTimeout(countDownGen(2), 1000);
        setTimeout(countDownGen(1), 2000);
        setTimeout(onStart, 3000);
    };

    function countDownGen(n) {
        return function () {
            players.forEach(function (player) {
                player.socket.emit('count-down', n);
            });
        };
    }

    function onStart() {
        players.forEach(function (player) {
            player.socket.emit('start', player.pid);
        });
    }

    server.update = function (x, y, pid, turn) {
        players.forEach(function (player) {
            player.socket.emit('update', x, y, pid, turn);
        });
    };
    server.end = function (pid) {
        players.forEach(function (player) {
            player.socket.emit('end', pid);
        });
        if (servers[serverID]) {
            delete servers[serverID];
        }
    };
    Server.onDisconnected = function (socket) {
        players.forEach(function (player) {
            if (player.socket.id == socket.id) {
                player['disconnected'] = true;
                return;
            }
            if (player['disconnected']) {
                return;
            }
            player.socket.emit('opponent-gone');
        });
    };
}
Server.onDisconnected = function (serverID, socket) {
    console.log(Object.keys(servers));
    var server = servers[serverID];
    if (server == undefined) {
        return;
    }
    server.ondisconnect(socket);
};
Server.createGame = function (socket1, socket2) {
    lastServerID++;
    var serverID = lastServerID;
    var server = new Server(serverID);
    servers[serverID] = server;
    server.init();
    server.addPlayer(socket1);
    server.addPlayer(socket2);
    server.start();
    return serverID;
};
module.exports = Server;