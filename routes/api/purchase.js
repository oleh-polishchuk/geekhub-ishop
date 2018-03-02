var express = require('express'),
    async = require('async'),
    router = express.Router(),
    Order = require('../../models/order'),
    User = require('../../models/user'),
    ResponseService = require('../../services/response');

router.post('/', function (req, res) {
    async.waterfall([
        function (next) {
            if (req.body.user.id) {
                User.findById(req.body.user.id, function (err, user) {
                    if (err) {
                        console.error('[Purchase]', err);
                        return next(err);
                    }

                    if (!user) {
                        console.error('[Purchase] User with id: ' + req.body.user.id + ' not found.');
                        return next(err);
                    }

                    next(null, user);
                });
            } else {
                User.find({email: req.body.user.email}, function (err, users) {
                    if (err) {
                        console.error('[Purchase]', err);
                        return next(err);
                    }

                    if (users && users.length > 0) {
                        return next(null, users[0]);
                    }

                    var user = User({
                        name: req.body.user.name,
                        email: req.body.user.email,
                        password: User.getPasswordHash(new Date().getTime().toString())
                    });

                    user.save(function (err, user) {
                        if (err) {
                            console.error('[Purchase]', err);
                            return next(err);
                        }

                        next(null, user);
                    });
                });
            }
        },
        function (user, next) {
            var order = new Order({
                user: user._id,

                comments: req.body.user.comments,
                telephone: req.body.user.telephone,
                deliveryAddress: req.body.user.deliveryAddress,

                items: req.body.items,
                status: 'PENDING'
            });

            order.save(function (err, order) {
                if (err) {
                    console.error('[Purchase]', err);
                    return next(err);
                }

                next(null, order);
            });
        }
    ],
    function (err, order) {
        if (err) {
            console.error(err);
            return ResponseService.e500(req, res, err);
        }

        ResponseService.api.success(req, res, {
            order: order
        });
    });
});

router.get('/', function (req, res) {
    Order.find({}, function (err, orders) {
        if (err) {
            console.error(err);
            return ResponseService.e500(req, res, err);
        }

        if (!orders) {
            console.error('[Purchase] No orders were found.');
            return ResponseService.e500(req, res, 'No orders were found.');
        }

        ResponseService.api.success(req, res, {
            orders: orders
        });
    });
});

router.get('/history/:id', function (req, res) {
    Order.find({user: req.params.id}, function (err, orders) {
        if (err) {
            console.error(err);
            return ResponseService.e500(req, res, err);
        }

        if (!orders) {
            console.error('[Purchase] No orders were found.');
            return ResponseService.e500(req, res, 'No orders were found.');
        }

        ResponseService.api.success(req, res, {
            orders: orders
        });
    });
});

router.get('/:id', function (req, res) {
    Order.findById(req.params.id, function (err, order) {
        if (err) {
            console.error(err);
            return ResponseService.e500(req, res, err);
        }

        if (!order) {
            console.error('[Purchase] No orders were found.');
            return ResponseService.e404(req, res, 'No orders were found.');
        }

        ResponseService.api.success(req, res, {
            order: order
        });
    });
});

router.delete('/:id', function (req, res) {
    Order.findById(req.params.id, function (err, order) {
        if (err) {
            console.error(err);
            return ResponseService.e500(req, res, err);
        }

        if (!order) {
            console.error('[Purchase] Order with id: ' + req.params.id + ' not found.');
            return ResponseService.e500(req, res, 'Order with id: ' + req.params.id + ' not found.');
        }

        order.remove(function (err) {
            if (err) {
                console.error(err);
                return ResponseService.e500(req, res, err);
            }

            ResponseService.api.success(req, res, {
                msg: 'Order successfully removed.'
            });
        });
    });
});

router.put('/:id', function (req, res) {
    Order.findById(req.params.id, function (err, order) {
        if (err) {
            console.error(err);
            return ResponseService.e500(req, res, err);
        }

        if (!order) {
            console.error('[Purchase] Order with id: ' + req.params.id + ' not found.');
            return ResponseService.e500(req, res, 'Order with id: ' + req.params.id + ' not found.');
        }

        if (req.body && req.body.status && req.body.status.length > 0) {
            order.status = req.body.status;
        }

        order.save(function (err, order) {
            if (err) {
                console.error(err);
                return ResponseService.e500(req, res, err);
            }

            ResponseService.api.success(req, res, {
                order: order
            });
        });
    });
});

module.exports = router;