"strict mode"

// define constant
module.exports = {
    message : {
        type : {
            'ERROR': 'Error',
            'INFO': 'Info',
            'REQUEST': 'Request',
        },
    },
    
    path: {
        'ROOT': __dirname, // absolute path to project root
        'JADE_FOLDER': 'views', // folder for htmls
    },
    video_type: {
        '.mp4': '.mp4',
        '.ogg': '.ogg',
        '.webm': '.webm',
    },
    http: {
        status_codes: {
            'OK': 200,
            'ERROR': 404,
            'PARTIAL_CONTENT': 206,
        },
        methods: {
            'GET': 'GET',
            'POST': 'POST',
        },
    },
};
