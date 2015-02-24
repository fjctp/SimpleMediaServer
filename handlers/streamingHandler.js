"strict mode"

var fs = require('fs');
var path = require('path');
var include = require('../include');

function writeResponse (parsed_request, response) {
    var video_path = path.join(parsed_request.home_dir, parsed_request.get_path);
    // check if the video exist, if not, return error 404
    if (fs.existsSync(video_path)) {
        // get parameters for the video
        var stats = fs.statSync(video_path)
        var videoTotalSize = stats.size;
        var videoStart = parsed_request.start === undefined ?
            0 : parsed_request.start;
        var videoEnd = parsed_request.end === undefined ?
            videoTotalSize-1 : parsed_request.end;
        var videoChunkSize = videoEnd - videoStart + 1;

        var extname = path.extname(parsed_request.get_path).replace('.', '');
        var MIMEType = 'video/' + extname;

        // write http header
        http_header = {
            "Accept-Ranges": "bytes",
            "Content-Type": MIMEType,
            "Content-Range": "bytes " + videoStart + "-" + videoEnd + "/" + videoTotalSize,
            "Content-Length": videoChunkSize,
        };
        response.writeHead(include.http.status_codes.PARTIAL_CONTENT, http_header);

        // open a read stream for the video
        var video = fs.createReadStream(
            video_path, {
                start: parseInt(videoStart),
                end: parseInt(videoEnd),
            }
        );

        // transmit data using event
        video.on('data', function(chunk) {
            response.write(chunk);
        });
        video.on('end', function(chunk) {
            response.end(chunk);
        });
    }
    else {
        http_header = {};
        response.writeHead(include.http.status_codes.ERROR, http_header)
        response.end();
    }
}

module.exports = writeResponse;