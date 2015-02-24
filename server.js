"strict mode"

var http = require("http");
var fs = require("fs");
var router = require("./router");
var include = require("./include");    
var logger = require("./logger");

var url = require('url');
var path = require('path');
var querystring = require('querystring');

var handlers = require("./handlers");

// Define StreamServer Constructor
function StreamServer () {
    this.server = http.createServer(); // get a http.Server instance 
};

// functions
// start function: start the server
StreamServer.prototype.start = function (hostname, port, home_dir) {
    logger.write(include.message.type.INFO,
        'Started Server at ' + hostname + ':' + port);
    logger.write(include.message.type.INFO,
        'Home Dir: ' + home_dir + '\n');
    this.server.home_dir = home_dir;
    
    this.server.on('request', this.onRequest); // when a request is received
    this.server.listen(port, hostname, this.onServerStart); // the server listens
};

// Event Listeners
StreamServer.prototype.onRequest = function (request, response) {
    // parse the request
    var parsed_request = {};
    // general information
    parsed_request.method = request.method;
    parsed_request.pathname = url.parse(request.url, true).pathname;
    parsed_request.home_dir = this.home_dir;
    
    // querystring, expect '?get=xxxx'
    parsed_request.get_path = url.parse(request.url, true).query.get;
        
    // get start and end for streaming request
    logger.write(include.message.type.REQUEST, request.headers.range);
    parsed_request.start = undefined;
    parsed_request.end = undefined;
    var re = /bytes=(\d+)-(\d+)?/;
    var m = re.exec(request.headers.range);
    if ( m != null ) {
        parsed_request.start = m[1];
        parsed_request.end = m[2];
    }
    
    logger.write(include.message.type.REQUEST,
        'From ' + request.socket.remoteAddress + 
        ' to ' + parsed_request.pathname + 
        ' ?get=' + parsed_request.get_path
    );
    
    // Get the handler
    var handler = this.router.getHandler(parsed_request);
    handler(parsed_request, response);
};

// when the server starts
// get an instance of router and add handlers
StreamServer.prototype.onServerStart = function () {
    this.router = new router();
    this.router.addErrorHandler(handlers.error);
    this.router.addHandler('GET', '/favicon.ico', handlers.eror);
    //this.router.addHandler('GET', '/home', handlers.home);
    this.router.addHandler('GET', '/browser', handlers.browser);
    this.router.addHandler('GET', '/player', handlers.player);
    this.router.addHandler('GET', '/streaming', handlers.streaming);
}

// module.export
module.exports = StreamServer;