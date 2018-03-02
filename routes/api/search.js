var express = require('express'),
    router = express.Router();

var Product = require('../../models/product'),
    ResponseService = require('../../services/response');

router.get('/product/:name', function (req, res) {
    var query = {};

    if (req.params.name && req.params.name.length > 0) {
        query.name = new RegExp('.*' + req.params.name + '.*', 'i');
    }

    Product.find(query, function (err, products) {
        if (err) {
            console.error(err);
            return ResponseService.e500(req, res, err);
        }

        if (!products) {
            console.error('[SearchAPI] Products not found.');
            return ResponseService.e500(req, res, 'Products not found.');
        }

        ResponseService.api.success(req, res, {
            products: products,
            name: req.params.name ? req.params.name : ''
        });
    });
});

router.get('/group/:name', function (req, res) {
    var query = {};

    if (req.params.name && req.params.name.length > 0) {
        query.group = new RegExp('.*' + req.params.name + '.*', 'i');
    }

    Product.find(query, function (err, products) {
        if (err) {
            console.error(err);
            return ResponseService.e500(req, res, err);
        }

        if (!products) {
            console.error('[SearchAPI] Products not found.');
            return ResponseService.e500(req, res, 'Products not found.');
        }

        ResponseService.api.success(req, res, {
            products: products,
            name: req.params.name ? req.params.name : ''
        });
    });
});

router.get('/', function (req, res) {
    Product.find({}, function (err, products) {
        if (err) {
            console.error(err);
            return ResponseService.e500(req, res, err);
        }

        if (!products) {
            console.error('[SearchAPI] Products not found.');
            return ResponseService.e500(req, res, 'Products not found.');
        }

        ResponseService.api.success(req, res, {
            products: products,
            name: req.params.name ? req.params.name : ''
        });
    });
});

module.exports = router;

