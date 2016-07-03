// CONTROLLERS
weatherApp.controller('homeController',
    [
        '$scope',
        'cityService',
        function ($scope, cityService) {

            $scope.city = cityService.city;

            $scope.$watch('city', function () {
                cityService.city = $scope.city;
            });

        }]);

weatherApp

    .controller('forecastController', [
        '$scope',
        '$resource',
        '$routeParams',
        'cityService',
        function ($scope, $resource, $routeParams, cityService) {

            $scope.city = cityService.city;

            $scope.days = $routeParams.days || '2';

            $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}});

            $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, cnt: $scope.days});

            $scope.convertToFahrenheit = function (degK) {

                return Math.round((1.8 * (degK - 273)) + 32);

            };

            $scope.convertToDate = function (dt) {

                return new Date(dt * 1000);

            };

        }])


    .controller('photosController', photosControllerFn);

photosControllerFn.$inject = ['dataservice', 'logger'];

function photosControllerFn(dataservice,
                            logger) {

    var vm = this;
    vm.photos = [];
    vm.getLinkToPhoto = getLinkToPhoto;
    vm.getPhotoPreview = getPhotoPreview;

    activate();

    function activate() {
        logger.info('Start reading photos...');
        /*return getPhotos().then(function () {
        });*/
        getPhotos();
    }

    function getPhotos() {
        return dataservice.getPublicPhotos()
            .then(function (data) {
                vm.photos = data.photos;
                return vm.photos;
            });
    }

    function getBasePhotoURL(photo) {
        var res = 'https://';
        res += 'farm' +
            photo.farm +
            '.staticflickr.com/' +
            photo.server +
            '/';
        return res;
    }

    function getLinkToPhoto(photo) {
        return getBasePhotoURL(photo) +
            photo.id + '_' + photo.secret +
            '_b.jpg';
    }

    function getPhotoPreview(photo) {
        return getBasePhotoURL(photo) +
            photo.id + '_' + photo.secret +
            '_t.jpg';
    }


}