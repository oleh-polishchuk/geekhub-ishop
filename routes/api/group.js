var express = require('express');
var router = express.Router();
var Group = require('../../models/group');
var ResponseService = require('../../services/response');

router.post('/', function (req, res) {
    var group = new Group({
        code: req.body.code,
        name: req.body.name
    });

    group.save(function (err, group) {
        if (err) {
            console.error(err);
            return ResponseService.e500(req, res, err);
        }

        res.send(group);
        ResponseService.api.success(req, res, {
            group: group
        })
    });
});

router.get('/', function (req, res) {
    Group.find({}, function (err, groups) {
        if (err) {
            console.error(err);
            return ResponseService.e500(req, res, err);
        }

        ResponseService.api.success(req, res, {
            groups: groups
        });
    });
});

router.get('/:id', function (req, res) {
    Group.findById(req.params.id, function (err, group) {
        if (err) {
            console.error(err);
            return ResponseService.e500(req, res, err);
        }

        if (!group) {
            console.info('[Group] No groups found');
            return ResponseService.e404(req, res, 'No groups found');
        }

        ResponseService.api.success(req, res, {
            group: group
        });
    });
});

router.delete('/:id', function (req, res) {
    Group.findById(req.params.id, function (err, group) {
        if (err) {
            console.error(err);
            return ResponseService.e500(req, res, err);
        }

        if (!group) {
            console.error('[Group] Group with id: ' + req.params.id + ' not found.');
            return ResponseService.e500(req, res, 'Group with id: ' + req.params.id + ' not found.');
        }

        group.remove(function (err) {
            if (err) {
                console.error(err);
                return ResponseService.e500(req, res, err);
            }

            ResponseService.api.success(req, res, {
                msg: 'Group removed successfully.'
            });
        });
    });
});

module.exports = router;