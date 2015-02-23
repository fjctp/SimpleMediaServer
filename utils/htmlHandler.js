"strict mode"
// General html handler
// it read html string, and write it to http response
var fs = require('fs');
var include = require('../include');

function writeResponse (html_content, http_response) {
    // write http response's header
    header = {
        'Content-Length': 0,
        'Content-Type': 'text/html',
    };
    header['Content-Length'] = html_content.length;
    http_response.writeHead(
        include.http.status_codes.OK,
        header
    );
    // http response's content
    http_response.end(html_content);
};

module.exports = writeResponse;