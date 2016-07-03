(function () {
    'use strict';

    weatherApp.config(configFn);
    configFn.$inject = [
        '$routeProvider',
        'RestangularProvider',
        'toastr'];

    function configFn($routeProvider,
                      RestangularProvider,
                      toastr) {

        configurToast();
        configureRoutes();
        configureRestfullServices();

        function configurToast() {
            toastr.options.timeOut = 4000;
            toastr.options.positionClass = 'toast-bottom-right';
            toastr.options.closeButton = true;
        }

        function configureRoutes() {
            $routeProvider
                .when('/', {
                    templateUrl: 'pages/home.htm',
                    controller: 'homeController'
                })
                .when('/photos', {
                    templateUrl: 'pages/photos.htm',
                    controller: 'photosController',
                    controllerAs: 'vm'
                })

                .when('/forecast', {
                    templateUrl: 'pages/forecast.htm',
                    controller: 'forecastController'
                })

                .when('/forecast/:days', {
                    templateUrl: 'pages/forecast.htm',
                    controller: 'forecastController'
                });
        }

        function configureRestfullServices() {

            RestangularProvider.setBaseUrl('https://api.flickr.com/services');
            RestangularProvider.setDefaultRequestParams(
                {
                    api_key: 'a5e95177da353f58113fd60296e1d250',
                    user_id: '24662369@N07',
                    format: 'json',
                    nojsoncallback: 1
                }
            );
            RestangularProvider.setRestangularFields({
                id: '_id.$oid'
            });

            RestangularProvider.setRequestInterceptor(
                function (elem, operation, what) {

                    if (operation === 'put') {
                        elem._id = undefined;
                        return elem;
                    }
                    return elem;
                });
        }
    }

})();