angular
    .module('app')
    .service('BasketOrdersService', ['$rootScope', 'ngCart', '$resource', BasketOrdersService]);

function BasketOrdersService($rootScope, ngCart, $resource) {
    this.placeOrder = function (order) {
        var Order = $resource('/api/purchase/:id', {id: '@id'}, {});

        Order.save(order, function (res) {
            console.log(res)
        });
    };
}