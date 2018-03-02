angular
    .module('app')
    .controller('ProductControllerList', ['$scope', 'products', ProductControllerList]);

function ProductControllerList($scope, products) {
    products.$promise.then(function (res) {
        console.log(res);
        $scope.products = res.data.products;
    });
}