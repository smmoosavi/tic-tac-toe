function Client() {

    var client = this;
    var socket = null;
    var display;

    function Player(pid) {
        var player = this;
        player.pid = pid;
        player.set = function (x, y) {
            socket.emit('set', x, y)
        }
    }

    client.init = function (board) {
        display = new Display();
        display.init(board);
    };

    client.join = function (host) {
        socket = io.connect(host);
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('count-down', display.onCountDown);
        socket.on('start', onStarted);
        socket.on('update', onUpdate);
        socket.on('end', display.end);
        socket.on('opponent-gone',display.opponentGone);
    };
    function onConnect() {
        $('#server-status').removeClass('text-danger').addClass('text-success');
        $('#server-status-icon').removeClass('fa-unlink').addClass('fa-link');
    }

    function onDisconnect() {
        $('#server-status').removeClass('text-success').addClass('text-danger');
        $('#server-status-icon').removeClass('fa-link').addClass('fa-unlink');
    }

    function onStarted(pid) {
        display.setPlayer(new Player(pid));
    }

    function onUpdate(x, y, pid, turn) {
        display.setBox(x, y, pid, turn);
    }
}
