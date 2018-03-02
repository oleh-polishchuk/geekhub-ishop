angular
    .module('app')
    .controller('HistoryController', ['$scope', 'orders', HistoryController]);

function HistoryController($scope, orders) {
    $scope.orders = orders;
}