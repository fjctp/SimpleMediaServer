"strict mode"

var path = require('path');
var jade = require('jade');
var include = require('../include');
var htmlHandler = require('../utils/htmlHandler');

function writeResponse (parsed_request, response) {
    // get the file path with different video format
    var ext = path.extname(parsed_request.get_path);
    switch (ext) {
        case '.mp4':
            var mp4 = parsed_request.get_path;
            var ogg = parsed_request.get_path.replace(ext, '.ogg');
            var webm = parsed_request.get_path.replace(ext, '.webm');
            break;
        case '.ogg':
            var mp4 = parsed_request.get_path.replace(ext, '.mp4');
            var ogg = parsed_request.get_path;
            var webm = parsed_request.get_path.replace(ext, '.webm');
            break;
        case '.webm':
            var mp4 = parsed_request.get_path.replace(ext, '.mp4');
            var ogg = parsed_request.get_path.replace(ext, '.ogg');
            var webm = parsed_request.get_path;
            break;
        default:
            throw "In playerHandler.js, Unhandled extension";
    }
    
    // Get the parameters for jade.render ready
    var html_path = path.join(
        include.path.ROOT,
        include.path.JADE_FOLDER,
        'player.jade'
    );
    var jade_options = {
        pageData: {
            'title': 'File Broswer',
            'previous_page': 'test',
            'mp4': mp4,
            'ogg': ogg,
            'webm': webm,
        }
    };
    // render jade template, and get the html content
    var html_content = jade.renderFile(html_path, jade_options)
    // write the html_content to the response
    htmlHandler(html_content, response);
};

module.exports = writeResponse;