angular
    .module('app')
    .config(function ($routeProvider) {

        $routeProvider

            .when('/wishlist', {
                templateUrl: './views/templates/wishlist/list.html',
                controller: 'WishListController',
                resolve: {
                    wishList: function (WishListService) {
                        return WishListService.getWishList('WISHLIST');
                    }
                }
            })
    });