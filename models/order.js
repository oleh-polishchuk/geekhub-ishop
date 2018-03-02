var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    user: [{
        index: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: {type: String},
    telephone: {type: String},
    deliveryAddress: {type: String},
    items: [{
        _id: {type: String},
        _name: {type: String},
        _price: {type: String},
        _quantity: {type: String},
        _data: {type: String}
    }],
    status: {type: String, enum: ['PENDING', 'CANCELED', 'PROCESSED'], default: 'PENDING'},
    createdAt: {type: Date, default: new Date}
});

module.exports = mongoose.model('Order', schema);