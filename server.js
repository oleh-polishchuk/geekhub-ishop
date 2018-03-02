var http = require('http'),
    path = require('path'),
    logger = require('morgan'),
    express = require('express'),
    favicon = require('serve-favicon'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser');

var index = require('./routes/index'),
    user = require('./routes/api/user'),
    group = require('./routes/api/group'),
    upload = require('./routes/api/upload'),
    search = require('./routes/api/search'),
    product = require('./routes/api/product'),
    purchase = require('./routes/api/purchase');

var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);
var mongoose = require('mongoose');
var passport = require('passport');

var config = require('./services/config');

exports.init = function (cb) {
    var app = express();

    app.set('views', path.join(__dirname, 'public'));
    app.set('view engine', 'jade');

    app.use(favicon(path.join(__dirname, 'public', './images/favicon.ico')));
    app.use(logger('dev'));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(express.static(path.join(__dirname, 'public')));

    app.use(expressSession({
        secret: 'secretsecretsecret',
        resave: true,
        saveUninitialized: false,
        store: new MongoStore({
            collection: 'web-sessions',
            mongooseConnection: mongoose.connection
        })
    }));

    // Passport:
    app.use(passport.initialize());
    app.use(passport.session());

    var mustAuthenticated = function(req, res, next){
        if (req.isAuthenticated()) {
            next()
        } else {
            res.redirect('/login');
        }
    };

    app.all('/cart', mustAuthenticated);
    app.all('/cart/*', mustAuthenticated);

    // public routes
    app.use('/', index);
    app.use('/api/search', search);
    app.use('/api/group', group);

    // require registration
    app.use('/api/purchase', purchase);

    // require registration and admin access
    app.use('/api/user', user);
    app.use('/api/upload', upload);
    app.use('/api/product', product);

    config.setConfig();

    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('./views/error', {
                message: err.message,
                error: err
            });
        });
    }

    var port = config.getConfig().port;

    app.set('port', port);

    http.createServer(app).listen(port);

    cb(port);
};