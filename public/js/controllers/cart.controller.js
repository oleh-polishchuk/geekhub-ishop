angular
    .module('app')
    .controller('BasketOrdersController', ['$scope', '$rootScope', 'BasketOrdersService', 'ngCart', BasketOrdersController]);

function BasketOrdersController($scope, $rootScope, BasketOrdersService, ngCart) {
    $scope.user = {};

    $scope.placeOrder = function () {
        var user = {};

        if ($rootScope.globalUser.id) {
            user.id = $rootScope.globalUser.id;
            user.deliveryAddress = $scope.user.deliveryAddress;
            user.telephone = $scope.user.telephone;
            user.comments = $scope.user.comments;
        } else {
            user = $scope.user;
        }

        var order = {
            user: user,
            items: ngCart.getItems()
        };

        BasketOrdersService.placeOrder(order);
        $scope.cleanUserInfo();
        ngCart.empty();
    };

    $scope.cleanUserInfo = function () {
        $scope.user = {};
    };
}