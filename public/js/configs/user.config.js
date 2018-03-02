angular
    .module('app')
    .config(function ($routeProvider) {

        $routeProvider

            .when('/api/user/register', {
                templateUrl: './views/admin/user/register.html',
                controller: 'UserController'
            })

            .when('/api/user/list', {
                templateUrl: './views/admin/user/list.html',
                controller: 'UserListController',
                resolve: {
                    user: function ($route, UserListService) {
                        return UserListService.getUserList()
                    }
                }
            })

            .when('/api/user/:id', {
                templateUrl: './views/admin/user/view.html',
                controller: 'UserControllerView',
                resolve: {
                    user: function ($route, UserListService) {
                        return UserListService.getUserById($route.current.params.id);
                    }
                }
            })

            .when('/api/user/changePassword', {
                templateUrl: './views/admin/user/changePassword.html',
                controller: 'UserController'
            })
    });