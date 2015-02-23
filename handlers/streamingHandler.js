"strict mode"

var fs = require('fs');
var path = require('path');
var include = require('../include');

function writeResponse (parsed_request, response) {
    var video_path = path.join(parsed_request.home_dir, parsed_request.get_path);
    fs.stat(video_path, function (err, stats) {
        if(err)
            throw 'Cannot open file: ' + video_path;
            
        // get parameters for the video
        var videoTotalSize = stats.size;
        var videoStart = parsed_request.start === undefined ?
            0 : parsed_request.start;
        var videoEnd = parsed_request.end === undefined ?
            videoTotalSize-1 : parsed_request.end;
        var videoChunkSize = videoEnd - videoStart + 1;
        var MIMEType = 'video/mp4';
        
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
    });
    
}

module.exports = writeResponse;