var path = require('path'),
    Config = require('../conf/config.json');

var config = {};

exports.setConfig = function () {
    config = Config;
    config.root_path = path.join(__dirname, '../')
};

exports.getConfig = function () {
    return config
};