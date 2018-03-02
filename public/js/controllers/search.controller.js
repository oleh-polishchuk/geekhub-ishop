angular
    .module('app')
    .controller('SearchController', ['$scope', 'products', SearchController]);

function SearchController($scope, products) {
    products.$promise.then(function (res) {
        $scope.products = res.data.products.length > 0 ? res.data.products : false;
        $scope.keyword = res.data.name;
    });
}