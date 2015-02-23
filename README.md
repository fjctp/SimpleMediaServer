# SimpleMediaServer
A Streaming Server using Nodejs

Usage:
    Get a new instance of SimpleMediaServer
    And run its start function to create a server
    Goto http://localhost:8080/browser?get= with your browser

    ex.
        var SimpleMediaServer = require('./SimpleMediaServer');
        var server = new SimpleMediaServer();
        server.start(hostname, port, home_dir);

        hostname:
            the ip address that the server listens to (localhost)
        port:
            the port number that the server listens to (8080)
        home_dir:
            the path to the folder that the server share to the public (C:\Download)
    
Note:
    This is intended for home use. There is no security build in
    Please use as your own risk
