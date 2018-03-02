angular
    .module('app')
    .service('OrderService', ['$rootScope', '$resource', OrderService])
    .factory('OrderItemService', ['$resource', '$http', OrderItemService]);

function OrderService($rootScope, $resource) {

}

function OrderItemService($resource, $http) {
    var Order = $resource('/api/purchase/:id', {id: '@id'}, {
        'update': {method: 'PUT'}
    });

    return {
        getOrderList: function () {
            return Order.get({});
        },

        getOrderListByUserId: function (id) {
            return $http.get('/api/purchase/history/' + id).then(function (res) {
                return res.data.data.orders;
            });
        },

        getOrderById: function (id) {
            return Order.get({id: id});
        },
        
        getTotal: function (items) {
            var total = 0;
            for (var key in items) {
                if (items.hasOwnProperty(key)) {
                    total += parseFloat(items[key]._price * items[key]._quantity) ;
                }
            }
            return total;
        },

        checkoutOrderById: function (id) {
            Order.update({id: id}, {status: 'PROCESSED'}, function (res) {
                console.log(res);
                return res;
            });
        }
    }
}