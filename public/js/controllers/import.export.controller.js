angular
    .module('app')
    .controller('ImportExportController', ['$scope', '$http', ImportExportController]);

function ImportExportController($scope, $http) {
    $scope.import = function () {
        var formData = new FormData();
        formData.append('data', $scope.data);

        var params = {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        };

        $http.post('/api/product/import', formData, params).success(function (res) {
            console.log(res);
        });
    };
}
