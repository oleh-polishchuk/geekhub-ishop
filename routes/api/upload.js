var express = require('express'),
    router = express.Router(),
    multiparty = require('multiparty'),
    async = require('async'),
    path = require('path'),
    fs = require('fs');

var NameService = require('../../services/name'),
    ResponseService = require('../../services/response'),
    config = require('../../services/config');

var pathToSave = '/images/products/';

router.post('/image', function (req, res) {
    var form = new multiparty.Form();

    form.on('error', function (err) {
        console.error(err);
        return ResponseService.e500(req, res, err);
    });

    form.parse(req, function (err, fiels, files) {
        var image = {};

        if (files) {
            async.each(
                files,
                function (file, next) {
                    image = file[0];
                    fs.readFile(file[0].path, function (err, data) {
                        var fileType = '.' + file[0].headers['content-type'].substr(6),
                            fileName = NameService.generateUniqueName() + fileType;

                        fs.writeFile(path.join(config.getConfig().root_path, '/public' + pathToSave + fileName), data, function (err) {
                            if (err) {
                                return next(err);
                            }

                            image.url = pathToSave + fileName;

                            next();
                        })
                    });
                },
                function (err) {
                    if (err) {
                        console.error(err);
                        return ResponseService.e500(req, res, err);
                    }

                    ResponseService.api.success(req, res, [{
                        name: image.originalFilename,
                        size: image.size,
                        url: image.url
                    }]);
                }
            )
        }
    });
});

module.exports = router;