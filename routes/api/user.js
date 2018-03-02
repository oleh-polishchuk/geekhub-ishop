var express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    path = require('path');

var User = require('../../models/user');
var ResponseService = require('../../services/response');

function mustAuthenticated(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    }

    console.error('[UserAPI] User must be authenticated.');
    ResponseService.e401(req, res, 'User must be authenticated.');
}

router.get('/', function (req, res) {
    User.find({}, function (err, users) {
        if (err) {
            console.log('Error: ', err);
            return ResponseService.e500(req, res, err);
        }

        if (!users) {
            console.error('[UserAPI] User with id: ' + req.body._id + ' not found.');
            return ResponseService.e500(req, res, 'User with id: ' + req.body._id + ' not found.');
        }

        ResponseService.api.success(req, res, {
            users: users
        });
    });
});

router.post('/', mustAuthenticated, function (req, res) {
    if (req.user.role.indexOf('admin') < 0) {
        return ResponseService.e403(req, res);
    }

    User.find({email: req.body.email}, function (err, user) {
        if (err) {
            console.log('Error: ', err);
            return ResponseService.e500(req, res, err);
        }

        if (user && user.length > 0) {
            console.error('[UserAPI] User with email: ' + req.body.email + ' already exist.');
            return ResponseService.api.failure(req, res, 'User with email \'' + req.body.email + '\' already exist.');
        }

        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: User.getPasswordHash(req.body.password),
            role: 'user'
        });

        user.save(function (err, user) {
            if (err) {
                console.error(err);
                return ResponseService.e500(req, res, err);
            }

            ResponseService.api.success(req, res, {
                user: user
            });
        });
    });
});

router.post('/changePassword', mustAuthenticated, function (req, res) {
    if (req.user.role.indexOf('admin') < 0) {
        return ResponseService.e403(req, res);
    }

    User.update({email: req.user.email}, {password: User.getPasswordHash(req.body.password)}, function (err, user) {
        if (err) {
            console.log('Error: ', err);
            return ResponseService.e500(req, res, err);
        }

        ResponseService.api.success(req, res, {
            user: user
        });
    });
});

router.get('/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            console.error('[UserAPI]', err);
            return ResponseService.e500(req, res, err);
        }

        if (!user) {
            console.error('[UserAPI] User with id: ' + req.body._id + ' not found.');
            return ResponseService.e500(req, res, 'User with id: ' + req.body._id + ' not found.');
        }

        ResponseService.api.success(req, res, {
            user: user
        });
    });
});

router.put('/', function (req, res) {
    User.findById(req.body._id, function (err, user) {
        if (err) {
            console.error('[User]', err);
            return ResponseService.e500(req, res, err);
        }

        if (!user) {
            console.error('[User] User with id: ' + req.body._id + ' not found.');
            return ResponseService.e500(req, res, 'User with id: ' + req.body._id + ' not found.');
        }

        if (req.body && req.body.name) {
            user.name = req.body.name;
        }
        if (req.body && req.body.email) {
            user.email = req.body.email;
        }
        if (req.body && req.body.role) {
            user.role = req.body.role;
        }

        user.save(function (err, user) {
            if (err) {
                console.error(err);
                return ResponseService.e500(req, res, err);
            }

            ResponseService.api.success(req, res, {
                user: user
            });
        });
    });
});

router.delete('/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            console.error(err);
            return ResponseService.e500(req, res, err);
        }

        if (!user) {
            console.error('[UserAPI] User with id: ' + req.params.uid + ' not found.');
            return ResponseService.e500(req, res, 'User with id: ' + req.params.uid + ' not found.');
        }

        user.remove(function (err) {
            if (err) {
                console.error(err);
                return ResponseService.e500(req, res, err);
            }

            ResponseService.api.success(req, res, {
                msg: 'User successfully removed'
            });
        });
    });
});

module.exports = router;