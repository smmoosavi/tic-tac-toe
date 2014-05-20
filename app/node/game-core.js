var _ = require('underscore');
function Core(server) {
    var core = this;
    var board = {};
    var turn = 0;
    var winner = -1;
    core.init = function () {
        _.range(3).forEach(function (i) {
            board[i] = {};
            _.range(3).forEach(function (j) {
                board[i][j] = -1;
            });
        });
    };
    core.set = function (x, y, pid) {
        if (winner != -1) {
            return;
        }
        if (pid != turn) {
            return
        }
        if (board[x] == undefined) {
            return;
        }
        if (board[x][y] != -1) {
            return;
        }
        board[x][y] = pid;
        turn = 1 - turn;
        checkWin();

        if (winner == -1) {
            server.update(x, y, pid, turn);
            return;
        }
        server.update(x, y, pid, -1);
        server.end(winner);
    };

    function checkWin() {
        var wins = [
            [
                [0, 0],
                [0, 1],
                [0, 2]
            ],
            [
                [1, 0],
                [1, 1],
                [1, 2]
            ],
            [
                [2, 0],
                [2, 1],
                [2, 2]
            ],
            [
                [0, 0],
                [1, 0],
                [2, 0]
            ],
            [
                [0, 1],
                [1, 1],
                [2, 1]
            ],
            [
                [0, 2],
                [1, 2],
                [2, 2]
            ],
            [
                [0, 0],
                [1, 1],
                [2, 2]
            ],
            [
                [0, 2],
                [1, 1],
                [2, 0]
            ]
        ];

        wins.forEach(function (win) {
            var pids = win.map(function (c) {
                return board[c[0]][c[1]];
            });
            if (pids[0] == pids[1] && pids[1] == pids[2]) {
                winner = pids[0];
            }
        });
    }

}
module.exports = Core;