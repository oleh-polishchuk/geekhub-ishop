angular
    .module('app')
    .config(function ($routeProvider) {

        $routeProvider

            .when('/cart', {
                templateUrl: './views/templates/cart/cart.html',
                controller: 'BasketOrdersController'
            })
    });