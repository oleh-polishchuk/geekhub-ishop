angular
    .module('app')
    .config(function ($routeProvider) {

        $routeProvider

            .when('/api/order/list', {
                templateUrl: './views/templates/order/list.html',
                controller: 'OrderController',
                resolve: {
                    orders: function ($route, OrderItemService) {
                        return OrderItemService.getOrderList()
                    }
                }
            })

            .when('/api/order/:id', {
                templateUrl: './views/templates/order/view.html',
                controller: 'OrderControllerView',
                resolve: {
                    order: function ($route, OrderItemService) {
                        return OrderItemService.getOrderById($route.current.params.id)
                    }
                }
            })

            .when('/api/order/history/:id', {
                templateUrl: './views/templates/order/history.html',
                controller: 'HistoryController',
                resolve: {
                    orders: function ($route, OrderItemService) {
                        return OrderItemService.getOrderListByUserId($route.current.params.id)
                    }
                }
            })
    });