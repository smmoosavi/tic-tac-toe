function Display() {
    var n = 3;
    var display = this;
    var boxes = {};
    var color = ['red', 'blue'];
    var _board = null;
    var _status = null;
    var _player = null;
    display.init = function (board) {
        board.empty();
        _status = $('<div></div>').addClass('status').text('wait');
        _status.appendTo(board);
        _board = $('<div></div>').addClass('board');
        _board.appendTo(board);
        boxes = {};
        _.range(n).forEach(function (i) {
            var row = $('<div></div>').addClass('row');
            boxes[i] = {};
            row.appendTo(_board);
            _.range(n).forEach(function (j) {
                var box = $('<div></div>').addClass('box');
                boxes[i][j] = box;
                box.appendTo(row);
                box.on('click', function () {
                    if (_player != null) {
                        if (box.is('.red')) {
                            return;
                        }
                        if (box.is('.blue')) {
                            return;
                        }
                        _player.set(i, j);
                    }
                });
            });
        });
    };
    display.setBox = function (x, y, playerID, turn) {
        if (turn == _player.pid) {
            _board.addClass(color[_player.pid] + '-player');
            _status.find('.turn').removeClass('hide');
        } else {
            _board.removeClass(color[_player.pid] + '-player');
            _status.find('.turn').addClass('hide');
        }
        boxes[x][y].addClass(color[playerID])
    };
    display.setPlayer = function (player) {
        _status.text('start').append('<br><span class="turn hide">your turn</span>');
        _player = player;
        if (player.pid == 0) {
            _board.addClass(color[player.pid] + '-player');
            _status.find('.turn').removeClass('hide');
        }
    };
    display.onCountDown = function (n) {
        _status.text(n);
    };

    display.end = function (winner) {
        if (winner == _player.pid) {
            _status.text('WIN');
        } else {
            _status.text('LOSS');
        }
    };

}
