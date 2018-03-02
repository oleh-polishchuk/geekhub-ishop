var config = require('../services/config');
var User = require('../models/user');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

/**
 * Initialize config
 * @param cb
 */
exports.config = function (cb) {
    config.setConfig();
    cb();
};

/**
 * Initialize db
 * @param cb
 */
exports.db = function (cb) {
    var url = config.getConfig().mongo.url,
        poolSize = config.getConfig().mongo.poolSize;

    var options = {
        server: {
            poolSize: poolSize
        }
    };

    var callbackCalled = false;

    var db = mongoose.connection;

    db.on('error', function (err) {
        console.error('Error occurred while establishing new MongoDB connection. ' + err);
    });

    db.on('connected', function () {
        console.log('Successfully connected to MongoDB on "' + url + '" with pool size: ' + poolSize);
        if (!callbackCalled) {
            callbackCalled = true;
            cb();
        }
    });

    db.on('disconnected', function () {
        console.error('Connection lost or not established with MongoDB on "' + url + '" Reconnecting in 5s.');
        setTimeout(function () {
            console.log('Try to re-establish MongoDB connection on "' + url + '" with pool size: ' + poolSize);
            mongoose.connect(url, options);
        }, 5000);

        if (!callbackCalled) {
            callbackCalled = true;
            cb();
        }
    });

    console.log('Try to establish MongoDB connection on "' + url + '" with pool size: ' + poolSize);
    mongoose.connect(url);
};

/**
 * Initialize passport
 * @param cb
 */
exports.passport = function (cb) {
    var params = {
        usernameField: 'email',
        passwordField: 'password'
    };

    passport.use(new LocalStrategy(params, function (email, password, done) {
        User.findOne({email: email}, function (err, user) {
            if (err) {
                console.error('[InitService]', err);
                return done(err);
            }

            if (!user) {
                console.error('[InitService] Incorrect username.');
                return done(null, false, {message: 'Incorrect username.'});
            }

            if (password != user.password) {
                console.error('[InitService] Incorrect password.');
                return done(null, false, {message: 'Incorrect password.'})
            }

            done(null, user);
        });
    }));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            if (err) {
                console.error('[InitService]', err);
                return done(err);
            }

            done(null, user);
        });
    });

    cb();
};

/**
 * Initialize admin user
 * @param cb
 */
exports.admin = function (cb) {
    var root = config.getConfig().mongo.user;

    User.find({email: root.email}, function (err, user) {
        if (err) {
            console.error('[InitService] ', err);
            return cb(err);
        }

        if (user && user.length > 0) {
            console.log('[InitService] Admin user already created: ', JSON.stringify(user));
            return cb();
        }

        var admin = new User({
            name: 'Admin',
            email: 'admin@ishop.geekhub.com',
            password: User.getPasswordHash('admin'),
            role: 'admin'
        });

        admin.save(function (err, user) {
            if (err) {
                console.error('[InitService]', err);
                return cb(err);
            }

            console.log('[InitService] Create new admin user: ', JSON.stringify(user));
            cb();
        });
    });
};