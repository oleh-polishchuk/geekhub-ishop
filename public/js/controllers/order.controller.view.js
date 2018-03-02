angular
    .module('app')
    .controller('OrderControllerView', ['$scope', '$location', 'order', 'OrderItemService', 'UserListService', OrderControllerView]);

function OrderControllerView($scope, $location, order, OrderItemService, UserListService) {
    $scope.checkoutOrder = function (id) {
        OrderItemService.checkoutOrderById(id);
        $location.path('/api/order/list');
    };

    order.$promise.then(function (res) {
        console.log(res);
        $scope.order = res.data.order;
        $scope.order.total = OrderItemService.getTotal(res.data.order.items);
        $scope.editMode = false;

        UserListService.getUserById(res.data.order.user[0]).$promise.then(function (res) {
            console.log(res);
            $scope.user = res.data.user;
        });
    });
}