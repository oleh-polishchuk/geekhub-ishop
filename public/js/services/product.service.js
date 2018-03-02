angular
    .module('app')
    .factory('ProductService', ['$resource', ProductService]);

function ProductService($resource) {
    var Group = $resource('/api/group/:id', {groupId: '@id'});
    var Product = $resource('/api/product/:id', {userId: '@id'});

    return {
        getById: function (id) {
            return Product.get({id: id});
        },

        getProductList: function () {
            return Product.get({});
        },

        getProductGroupsList: function () {
            return Group.get({});
        }
    }
}