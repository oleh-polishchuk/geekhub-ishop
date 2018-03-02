angular
    .module('app')
    .controller('UserController', ['$scope', '$resource', '$location', 'UserService', UserController]);

function UserController($scope, $resource, $location, UserService) {
    var User = $resource('/api/user/:uid', {uid: '@id'}, {
        'update': {method: 'PUT'},
        'delete': {method: 'DELETE'}
    });

    $scope.u = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    $scope.isSuccess = true;
    $scope.passwordChangeStatus = false;

    $scope.user = {

        // $scope.user.create()
        create: function () {
            if ($scope.u && $scope.u.name && $scope.u.email && $scope.u.password) {
                User.save($scope.u, function (res) {
                    if (!res.success) {
                        $scope.isSuccess = res.success;
                        $scope.msg = res.msg;
                    }

                    if (res.success) {
                        $location.path('/api/user/list');
                    }
                });
            }
        },

        changePassword: function () {
            if (!$scope.u.password.length > 0 || !$scope.u.confirmPassword.length > 0) {
                return $scope.passwordChangeStatus = 'empty';
            }
            if ($scope.u.password.length > 0 && $scope.u.confirmPassword.length > 0 && $scope.u.password == $scope.u.confirmPassword) {
                UserService.changePassword($scope.u.password);
                $scope.passwordChangeStatus = 'success';
                $scope.u.password = '';
                $scope.u.confirmPassword = '';
            } else {
                $scope.passwordChangeStatus = 'notEquals';
            }
        }
    };
}