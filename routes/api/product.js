var express = require('express'),
    router = express.Router();

var Product = require('../../models/product'),
    ResponseService = require('../../services/response');

router.post('/', function (req, res) {
    var product = new Product({
        name: req.body.name,
        group: req.body.group.name,
        url: req.body.url,
        description: req.body.description,
        price: req.body.price
    });

    product.save(function (err, product) {
        if (err) {
            console.error(err);
            return ResponseService.e500(req, res, err);
        }

        res.send(product);
    });
});

router.get('/', function (req, res) {
    Product.find({}, function (err, products) {
        if (err) {
            console.error(err);
            return ResponseService.e500(req, res, err);
        }

        ResponseService.api.success(req, res, {
            products: products
        });
    });
});

router.get('/:id', function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) {
            console.error(err);
            return ResponseService.e500(req, res, err);
        }

        var bin = {
            id: product.id,
            name: product.name,
            group: product.group,
            price: product.price,
            url: product.url,
            description: product.description
        };

        ResponseService.api.success(req, res, {
            product: bin
        });
    });
});

router.delete('/:id', function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) {
            console.error(err);
            return ResponseService.e500(req, res, err);
        }

        if (!product) {
            console.error('[ProductAPI] Product with id: ' + req.params.id + ' not found.');
            return ResponseService.e500(req, res, 'Product with id: ' + req.params.id + ' not found.');
        }

        product.remove(function (err) {
            if (err) {
                console.error(err);
                return ResponseService.e500(req, res, err);
            }

            ResponseService.api.success(req, res, {
                msg: 'Product successfully removed.'
            });
        });
    });
});

module.exports = router;