var http = require('http');
var WebSocket = require('websocket').server;

var server = http.createServer();
server.listen(9090);

var socket = new WebSocket({
    httpServer: server
});
socket.on('connect', function(request) {
    console.log('Client got connected ' + request);
})

socket.on('request', function(request) {
    const connection = request.accept(null, request.origin);

    connection.on('message', function(message) {
    console.log('Received Message:', message.utf8Data);

    var stockValue = Math.floor(Math.random() * 1000);
        console.log(stockValue);
        connection.send(stockValue);
    // for (i=0; i < 100; i++) {
    //     connection.sendUTF(setTimeout(function stockValue() { return Math.random(900, 1000) }, 5000));
    // } 
    
    // setInterval(function() {
    //     var stockValue = Math.floor(Math.random() * 1000);
    //     console.log(stockValue);
    //     connection.send(stockValue);
    // }, 5000)
    });

    connection.on('close', function(reasonCode, description) {
        console.log('Client has disconnected.');
    });
});
