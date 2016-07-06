(function () {
    'use strict';

    flickerApp.controller('homeController', homeController);

    homeController.$inject = [
        '$location',
        '$scope',
        'cityService'
    ];

    function homeController($location,
                            $scope,
                            cityService) {
        $location.path("photos");
        /*$scope.city = cityService.city;
         $scope.$watch('city', function () {
         cityService.city = $scope.city;
         });*/

    }

})();