angular
    .module('app')
    .config(function ($routeProvider) {

        $routeProvider

            .when('/about', {
                templateUrl: './views/templates/header/about.html',
                controller: 'MainController'
            })

            .when('/delivery', {
                templateUrl: './views/templates/header/delivery.html',
                controller: 'MainController'
            })

            .when('/guarantee', {
                templateUrl: './views/templates/header/guarantee.html',
                controller: 'MainController'
            })

            .when('/contacts', {
                templateUrl: './views/templates/header/contacts.html',
                controller: 'MainController'
            })

            .when('/comments', {
                templateUrl: './views/templates/header/comments.html',
                controller: 'MainController'
            });
    });