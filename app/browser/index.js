function App(host) {
    var app = this;
    var client = null;
    app.init = function () {
        client = new Client();
        var board = $('#board');
        client.init(board);
        client.join(host);
    };
}
$(function () {
    var app = new App('127.0.0.1:9898');
    app.init();
});