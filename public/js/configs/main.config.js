angular
    .module('app')
    .config(function ($routeProvider) {

        $routeProvider

            .when('/', {
                templateUrl: './views/public/title.html',
                controller: 'MainController'
            })
    })

    .run(['$rootScope', '$http', function ($rootScope, $http) {
        $rootScope.isAuthenticated = false;
        $rootScope.isAdmin = false;
        $rootScope.keyword = 'iphone';

        if (!$rootScope.wishlistCount) {
            $rootScope.wishlistCount = 0;
        }

        $http.get('/info').then(function (res) {
            $rootScope.globalUser = {};

            if (res && res.data && res.data.data) {
                var user = res.data.data.user;

                if (res.data.success) {
                    $rootScope.isAuthenticated = true;
                    $rootScope.globalUser = user;

                    if (user.role == 'admin') {
                        $rootScope.isAdmin = true;
                    }
                }
            } else {
                $rootScope.isAuthenticated = false;
                $rootScope.isAdmin = false;
                $rootScope.globalUser.name = 'Wellcome';
            }
        },
        function (err) {
            console.error(err);
        });
    }]);