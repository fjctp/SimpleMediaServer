"strict mode"
// route the request to the proper handler

var fs = require('fs');

var logger = require('./logger')
var include = require('./include');

function router () {
    this.handlers = {};
}
router.prototype.addHandler = function (method, pathname, handler) {
    var key = method + pathname;
    this.handlers[key] = handler;
}
router.prototype.addErrorHandler = function (handler) {
    var key = include.http.status_codes.ERROR;
    this.handlers[key] = handler;
}
router.prototype.getHandler = function (parsed_req) {
    // validate the request, and return a handler for that request
    var key = parsed_req.method + parsed_req.pathname;
    
    if (this.handlers[key] === undefined || parsed_req.get_path === undefined) {
        return this.handlers[include.http.status_codes.ERROR];
    }
    else {
        return this.handlers[key];
    }
}


module.exports = router;