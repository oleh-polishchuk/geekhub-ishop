angular
    .module('app')
    .service('WishListService', ['$window', '$rootScope', 'ProductService', WishListService]);

function WishListService($window, $rootScope, ProductService) {

    /**
     * Get WishList
     * @param {string} key
     */
    this.getWishList = function (key) {
        if ($window.localStorage [key]) {
            console.log(angular.fromJson($window.localStorage [key]));
            return angular.fromJson($window.localStorage [key]);
        }
        return false;
    };

    /**
     * Add item to WishList
     * @param {string} key
     * @param {string} id
     */
    this.addToWishList = function (key, id) {
        var it = this;
        ProductService.getById(id).$promise.then(function (res) {
            var key = 'WISHLIST';
            var wishList = it.getWishList(key) ? it.getWishList(key) : [];

            var isSimilar = false;
            for (var k in wishList) {
                if (wishList.hasOwnProperty(k)) {
                    var prod = wishList[k];
                    if (prod.id == id) {
                        isSimilar = true;
                    }
                }
            }

            if (!isSimilar) {
                wishList.push(res.data.product);
                $window.localStorage [key] = angular.toJson(wishList);
                $rootScope.wishlistCount = wishList.length;
                console.log($window.localStorage [key]);
                return $window.localStorage [key];
            }
        });
    };

    /**
     * Clear WishList
     */
    this.clearWishList = function (key) {
        $window.localStorage [key] = angular.toJson([]);
        $rootScope.wishlistCount = 0;
        console.log($window.localStorage [key]);
        return $window.localStorage [key];
    }
}