var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['admin', 'user'], default: 'user'},
    createdAt: {type: Date, default: new Date},
    updatedAt: {type: Date, default: new Date}
});

schema.statics.getPasswordHash = function (password) {
    return crypto.createHash('sha256').update(password).digest('base64');
};

module.exports = mongoose.model('User', schema);