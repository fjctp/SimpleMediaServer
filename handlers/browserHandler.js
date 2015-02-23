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
        var files_list = {};
        files.forEach(function (file) {
            // for each file in the folder if it is a directory or video
            // add it to the list, { file: url }
            var stats = fs.statSync(path.join(folder_path, file));
            var path_to_file = path.join(parsed_request.get_path, file)
            if (stats.isDirectory())
                // it is a directory, open browser
                files_list[file] = 'browser?get=' + path_to_file;
            else if (path.extname(file) in include.video_type)
                // it is a video, open player
                files_list[file] = 'player?get=' + path_to_file;
        });
        
        var html_path = path.join(
            include.path.ROOT,
            include.path.JADE_FOLDER,
            'browser.jade'
        );
        var jade_options = {
            pageData: {
                'title': 'File Broswer',
                'previous_page': 'test',
                'files': files_list,
            }
        };
        // render jade template, and get the html content
        var html_content = jade.renderFile(html_path, jade_options)
        // write the html_content to the response
        htmlHandler(html_content, response);
    });
};

module.exports = writeResponse;