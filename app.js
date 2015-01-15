var express = require('express');
var app = express();

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Server listenning on http://%s:%s', host, port);
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});
app.get('/path/:protocol/:url', require('./controllers/path/getIndex.js'));
