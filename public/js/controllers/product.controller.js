angular
    .module('app')
    .controller('ProductController', ['$scope', '$resource', '$http', '$location', 'groups', ProductController]);

function ProductController($scope, $resource, $http, $location, groups) {
    var Product = $resource('/api/product/:id', {userId: '@id'});

    $scope.api = {
        product: {
            save: function () {
                $scope.model.product.url = $scope.model.image.data.url;

                Product.save($scope.model.product, function (res) {
                    console.log('res: ', res);
                    $scope.api.setDefaultValues();
                    $location.path('/api/product/list')
                });
            }
        },

        upload: {
            image: function () {
                var formData = new FormData();
                formData.append('image', $scope.model.image.data);

                var params = {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                };

                $http.post('/api/upload/image', formData, params).success(function (res) {
                    $scope.model.image.data.url = res.data[0].url;
                    $scope.imageUrl = res.data[0].url;
                    console.log('res: ', res);
                });
            }
        },

        setDefaultValues: function () {
            $scope.model.product = {};
            $scope.model.image = {
                data: {},
                url: ''
            };
        }
    };

    groups.$promise.then(function (res) {
        console.log(res);
        $scope.groups = res.data.groups;
    })
}