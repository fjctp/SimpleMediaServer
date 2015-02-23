"strict mode"
// Provide API for data logging

var include = require('./include');

module.exports = {
    write: write,
};

function write (type, message) {
    // need to validate "type"
    // it should be from include.message
    console.log('[' + type + ']: ' + message);
}
