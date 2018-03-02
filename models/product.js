var mongoose = require('mongoose'),
    config = require('../services/config'),
    Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true},
    url: {type: String, default: config.getConfig().product.defaultImageURL},
    description: {type: String, default: config.getConfig().product.defaultDescription},
    price: {type: Number, default: 0},
    group: {type: String, default: 'Other'},
    isDeleted: {type: Boolean, default: false}
});

module.exports = mongoose.model('Product', schema);