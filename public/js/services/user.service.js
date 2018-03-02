angular
    .module('app')
    .factory('UserListService', ['$resource', UserListService])
    .service('UserService', ['$http', '$resource', UserService]);

function UserListService($resource) {
    var User = $resource('/api/user/:id', {id: '@id'}, {
        'update': {method: 'PUT'},
        'delete': {method: 'DELETE'}
    });

    return {
        getUserList: function () {
            return User.get({});
        },

        getUserById: function (id) {
            return User.get({id: id});
        }
    }
}

function UserService($http, $resource) {
    var User = $resource('/api/user/:id', {id: '@id'}, {
        'update': {method: 'PUT'},
        'delete': {method: 'DELETE'}
    });

    this.changePassword = function (password) {
        var data = {
            password: password
        };

        $http.post('/api/user/changePassword', data).then(function (res) {
            console.log(res)
        })
    };

    this.updateUserById = function (user) {
        User.get({id: user._id}, function (res) {
            res.data.user.name = user.name;
            res.data.user.email = user.email;
            res.data.user.role = user.role;

            User.update(res.data.user, function (res) {
                console.log(res)
            });
        });
    };

    this.deleteUserById = function (id) {
        User.delete({id: id}, function (res) {
            console.log(res);
        });
    }
}