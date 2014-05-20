var Core = require('./game-core');

function Server() {
    var server = this;
    var core = null;
    var lastID = 0;
    var players = [];
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
    };
}
module.exports = Server;