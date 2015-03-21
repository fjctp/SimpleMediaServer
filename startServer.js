"use strict"
var path = require("path");
var os = require("os");

// If hostname and port are provided, use it
// else use default value
if(process.argv.length != 5) {
    var hostname = undefined;
    var port = 8080;
    var home_dir = path.join(__dirname, "test");
    
    var net_ifs = os.networkInterfaces(); // get network interfaces
    var net_ifs_name = Object.keys(net_ifs);
    net_ifs_name.forEach(function(name) {
        net_ifs[name].forEach(function(family) {
            if( family.family == "IPv4" && 
                family.internal == false && 
                name.indexOf("VirtualBox") == -1)
                hostname = family.address;
        });
    });
    
    
    console.log(
        "Usage: server.js [hostname] [port] [home_dir]\n"
    )
    console.log(
        "Start the server with default values\n"
    );
}
else {
    var hostname = process.argv[2];
    var port = Number(process.argv[3]);
    var home_dir = process.argv[4];
}

var SimpleMediaServer = require('./');
var server = new SimpleMediaServer();
server.start(hostname, port, home_dir);