angular
    .module('app')
    .config(function ($routeProvider) {

        $routeProvider

            .when('/api/product/new', {
                templateUrl: './views/admin/product/new.html',
                controller: 'ProductController',
                resolve: {
                    groups: function (ProductService) {
                        return ProductService.getProductGroupsList();
                    }
                }
            })

            .when('/api/product/list', {
                templateUrl: './views/admin/product/list.html',
                controller: 'ProductControllerList',
                resolve: {
                    products: function ($route, ProductService) {
                        return ProductService.getProductList()
                    }
                }
            })

            .when('/api/product/import', {
                templateUrl: './views/admin/product/import.html',
                controller: 'ImportExportController'
            })

            .when('/api/product/:id', {
                templateUrl: './views/admin/product/view.html',
                controller: 'ProductControllerView',
                resolve: {
                    product: function ($route, ProductService) {
                        return ProductService.getById($route.current.params.id)
                    }
                }
            });
    });