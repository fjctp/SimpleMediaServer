 "strict mode"

var path = require('path');
var jade = require('jade');
var include = require('../include');
var htmlHandler = require('../utils/htmlHandler');

function writeResponse (parsed_request, response) {
    var html_path = path.join(
        include.path.ROOT,
        include.path.JADE_FOLDER,
        'error.jade'
    );
    var jade_options = {
        pageData: {
            'title': 'Error!!!',
            'previous_page': '',
        }
    };
    // render jade template, and get the html content
    var html_content = jade.renderFile(html_path, jade_options);
    // write the html_content to the response
    htmlHandler(html_content, response);
};

module.exports = writeResponse;