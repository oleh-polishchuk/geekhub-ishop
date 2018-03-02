angular
    .module('app')
    .controller('MainController', ['$rootScope', 'ngCart', MainController]);

function MainController($rootScope, ngCart) {
    ngCart.setTaxRate(0);
    ngCart.setShipping(0.95);
}