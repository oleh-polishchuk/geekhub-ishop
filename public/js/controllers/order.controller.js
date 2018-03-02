angular
    .module('app')
    .controller('OrderController', ['$scope', 'orders', OrderController]);

function OrderController($scope, orders) {
    orders.$promise.then(function (res) {
        console.log(res);
        $scope.orders = res.data.orders;
    });
}