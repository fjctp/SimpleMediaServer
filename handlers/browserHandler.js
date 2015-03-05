"strict mode"

var fs = require('fs');
var path = require('path');
var jade = require('jade');
var include = require('../include');
var htmlHandler = require('../utils/htmlHandler');

function writeResponse (parsed_request, response) {
    var folder_path = path.join(
        parsed_request.home_dir,
        parsed_request.get_path
    );
    fs.readdir(folder_path, function (err, files) {
        if (err)
            throw err;
        
        // Get a list of videos and folders
        var files_list = {};
        var folders_list = {};
        files.forEach(function (file) {
            var stats = fs.statSync(path.join(folder_path, file));
            if (err)
                throw err;
            var get_path = path.join(parsed_request.get_path, file)
            if (stats.isDirectory())
                // it is a directory, open browser
                folders_list[file] = 'browser?get=' + get_path;
            else if (path.extname(file) in include.video_type)
                // it is a video, open player
                files_list[file] = 'player?get=' + get_path;
        });
        
        var html_path = path.join(
            include.path.ROOT,
            include.path.JADE_FOLDER,
            'browser.jade'
        )
        var jade_options = {
            pageData: {
                'title': parsed_request.get_path == '' ?
                    'Home' : parsed_request.get_path, // default to Home
                'previous_page': '',
                'files': files_list,
                'folders': folders_list,
            }
        };
        
        // render jade template, and get the html content
        var html_content = jade.renderFile(html_path, jade_options)
        // write the html_content to the response
        htmlHandler(html_content, response);
    });
};

module.exports = writeResponse;