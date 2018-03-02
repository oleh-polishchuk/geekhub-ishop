angular
    .module('app')
    .config(function ($routeProvider) {

        $routeProvider

            .when('/sitemap', {
                templateUrl: './views/templates/footer/sitemap.html',
                controller: 'MainController'
            });
    });