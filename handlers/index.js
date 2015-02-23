"strict mode"
// it is an index for the handlers
var fs = require('fs');
var path = require('path');

module.exports = getHandlers(__dirname); // get all the handlers within the folder
                                         // using the filename without 'Handler' as key

function getHandlers (path_to_handlers_folder) {
    handlers = {}
    var isExist = fs.existsSync(path_to_handlers_folder);
    if (isExist) {
        // get files in the folder in sync mode, since this gets called once (when server initializing)
        var files = fs.readdirSync(path_to_handlers_folder);
        files.forEach(function (file) {
            var group = file.match(/(\w+)Handler/)
            if( group !== null) {
                handlers[group[1]] = require(path.join(__dirname, file)); // get the handler object
            }
        });
        return handlers;
    }
    else
    {
        throw 'folder does not exist: ' + path_to_handlers_folder;
        return null;
    }
}