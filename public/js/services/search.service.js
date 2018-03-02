angular
    .module('app')
    .factory('SearchService', ['$resource', SearchService]);

function SearchService($resource) {
    var Product;

    return {
        getByQuery: function (params) {
            var query = {};

            if (params && params.name && params.name.length > 0) {
                Product = $resource('/api/search/product/:name', {name: '@name'});
                query.name = params.name;
            }

            if (params && params.group && params.group.length > 0) {
                Product = $resource('/api/search/group/:name', {name: '@name'});
                query.name = params.group;
            }

            return Product.get(query);
        }
    }
}