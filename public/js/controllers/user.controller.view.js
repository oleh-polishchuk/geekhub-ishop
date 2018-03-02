angular
    .module('app')
    .controller('UserControllerView', ['$scope', '$location', 'user', 'UserService', UserControllerView]);

function UserControllerView($scope, $location, user, UserService) {
    $scope.deleteUserById = function (id) {
        UserService.deleteUserById(id);
        $location.path('/api/user/list')
    };

    $scope.updateUserById = function (user) {
        UserService.updateUserById(user);
    };

    user.$promise.then(function (res) {
        console.log('user', res.data);
        $scope.user = res.data.user;
    });
}