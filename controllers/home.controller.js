(function () {
    'use strict';

    flickerApp.controller('homeController', homeController);

    homeController.$inject = [
        '$scope',
        'cityService'
    ];

    function homeController($scope,
                            cityService) {

        $scope.city = cityService.city;
        $scope.$watch('city', function () {
            cityService.city = $scope.city;
        });

    }

})();