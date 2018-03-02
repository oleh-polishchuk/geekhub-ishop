angular
    .module('app')
    .controller('ProductControllerView', ['$scope', '$resource', '$location', 'product', 'WishListService', ProductControllerView]);

function ProductControllerView($scope, $resource, $location, product, WishListService) {
    var Product = $resource('/api/product/:id', {userId: '@id'}, {
        'delete': {method: 'DELETE'}
    });

    $scope.delete = function (id) {
        Product.delete({id: id}, function (res) {
            console.log(res);
            $location.path('/api/product/list')
        });
    };

    product.$promise.then(function (res) {
        $scope.product = res.data.product;
        $scope.editMode = false;
    });

    $scope.addToWishList = function (id) {
        WishListService.addToWishList('WISHLIST', id);
    };
}