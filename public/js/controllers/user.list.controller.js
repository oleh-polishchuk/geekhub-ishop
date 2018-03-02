angular
    .module('app')
    .controller('UserListController', ['$scope', 'user', UserListController]);

function UserListController($scope, user) {
    user.$promise.then(function (res) {
        console.log(res);
        $scope.users = res.data.users;
    });
}