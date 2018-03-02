var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    code: {type: Number},
    name: {type: String}
});

module.exports = mongoose.model('Group', schema);