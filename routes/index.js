var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    User = require('../models/user'),
    Product = require('../models/product'),
    multiparty = require('multiparty'),
    async = require('async'),
    path = require('path'),
    fs = require('fs');

var ResponseService = require('../services/response');

router.get('/', function (req, res) {
    res.render('./views/index');
});

router.get('/login', function (req, res) {
    res.render('login');
});

router.get('/info', function (req, res) {
    if (!req.isAuthenticated()) {
        return ResponseService.api.failure(req, res);
    }

    var user = {
        id: req.user.id,
        name: req.user.name,
        role: req.user.role
    };

    ResponseService.api.success(req, res, {
        user: user
    });
});

router.post('/login', function (req, res, next) {
    var authenticate = function (err, user) {
        if (err) {
            console.error('[Controller]', err);
            return next(err);
        }

        // login fail
        if (!user) {
            console.error('[Controller] Authenticate fail');
            return res.redirect('/login');
        }

        req.logIn(user, function (err) {
            if (err) {
                console.error('[Controller]', err);
                return next(err);
            }

            // can redirect to private page
            res.redirect('/');
        });
    };

    if (req.body && req.body.email && req.body.password) {
        req.body.password = User.getPasswordHash(req.body.password);
    }

    passport.authenticate('local', authenticate)(req, res, next);
});

router.get('/singup', function (req, res) {
    res.render('singup');
});

router.post('/register', function (req, res, next) {
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        password: User.getPasswordHash(req.body.password),
        role: 'user'
    });

    user.save(function (err) {
        if (err) {
            console.error('[Controller]', err);
            return next(err);
        }

        req.login(user, function (err) {
            if (err) {
                console.error('[Controller]', err);
                return next(err);
            }

            // can redirect to private page
            res.redirect('/');
        })
    });
});

router.get('/cart', function (req, res) {
    res.render('cart');
});

router.get('/fail', function (req, res) {
    res.render('fail');
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/login');
});

router.get('/api/product/export', function (req, res) {
    Product.find({}, function (err, products) {
        if (err) {
            console.error(err);
            return ResponseService.e500(req, res, err);
        }

        if (!products) {
            console.error('[ProductAPI] Products not found.');
            return ResponseService.e500(req, res, 'Products not found.');
        }

        res.set('Content-Disposition', 'attachment; filename="products.json"');
        res.set('Content-Type', 'text/plain');
        res.send(products);
    })
});

router.post('/api/product/import', function (req, res) {
    var form = new multiparty.Form();

    form.on('error', function (err) {
        console.error(err);
        return ResponseService.e500(req, res, err);
    });

    form.parse(req, function (err, fiels, files) {
        if (files) {
            async.each(
                files,
                function (file, next) {
                    fs.readFile(file[0].path, function (err, data) {
                        if (err) {
                            console.error(err);
                            return ResponseService.e500(req, res, err);
                        }

                        var products = JSON.parse(new Buffer(data).toString());
                        async.each(
                            products,
                            function (p) {
                                var product = new Product({
                                    name: p.name,
                                    url: p.url,
                                    description: p.description,
                                    price: p.price,
                                    group: p.group,
                                    isDeleted: p.isDeleted
                                });

                                product.save(function (err) {
                                    if (err) {
                                        console.log(err);
                                    }
                                });

                            },
                            function (err) {
                                if (err) {
                                    console.error(err);
                                    return ResponseService.e500(req, res, err);
                                }
                            }
                        );

                        next();
                    });
                },
                function (err) {
                    if (err) {
                        console.error(err);
                        return ResponseService.e500(req, res, err);
                    }

                    console.log('Import new products successfully!');
                    ResponseService.api.success(req, res, {});
                }
            )
        }
    });
});

module.exports = router;