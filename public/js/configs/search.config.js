angular
    .module('app')
    .config(function ($routeProvider) {

        $routeProvider
            .when('/api/search', {
                templateUrl: './views/admin/search/list.html',
                controller: 'SearchController',
                resolve: {
                    products: function ($route, SearchService) {
                        return SearchService.getByQuery($route.current.params)
                    }
                }
            });
    });