/**
 * Response service help to handle with response error.
 */
function handleResponse(req, res, err) {
    if (err.message) {
        console.error(err.message);
    }
    res.sendStatus(err.code);
}

// 401 (Unauthorized)
exports.e401 = function (req, res, message) {
    var err = {
        code: 401,
        message: message
    };
    handleResponse(req, res, err);
};

// 403 (Forbidden)
exports.e403 = function (req, res, message) {
    var err = {
        code: 403,
        message: message
    };
    handleResponse(req, res, err);
};

// 404 (Not Found)
exports.e404 = function (req, res, message) {
    var err = {
        code: 404,
        message: message
    };
    handleResponse(req, res, err);
};

// 500 (Internal Server Error)
exports.e500 = function (req, res, message) {
    var err = {
        code: 500,
        message: message
    };
    handleResponse(req, res, err);
};

exports.api = {
    success: function (req, res, data) {
        res.send({
            success: true,
            data: data ? data : {}
        });
    },

    failure: function (req, res, msg) {
        res.send({
            success: false,
            msg: msg ? msg : ''
        });
    }
};