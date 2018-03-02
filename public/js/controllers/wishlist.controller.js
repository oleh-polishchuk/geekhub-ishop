angular
    .module('app')
    .controller('WishListController', ['$scope', '$location', 'wishList', 'WishListService', WishListController]);

function WishListController($scope, $location, wishList, WishListService) {
    $scope.wishlist = wishList;

    $scope.clearWishList = function () {
        WishListService.clearWishList('WISHLIST');
        $location.path('/')
    }
}