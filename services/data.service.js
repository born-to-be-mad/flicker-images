(function () {
    'use strict';

    flickerApp.service('dataservice', dataserviceFn);

    dataserviceFn.$inject = ['Restangular', 'logger'];

    function dataserviceFn(Restangular,
                           logger) {

        var service = {
            getPublicPhotos: getPublicPhotos
        };
        return service;

        function getPublicPhotos(page) {
            var params = {
                page: page || 0
            };
            return Restangular.one('rest?method=flickr.people.getPublicPhotos').get(params)
                .then(getPublicPhotosComplete)
                .catch(getPublicPhotosFailed);

            function getPublicPhotosComplete(response) {
                logger.success('Reading photos complete.');
                return response;
            }

            function getPublicPhotosFailed(error) {
                logger.error('Reading photos failed.' + error.data);
            }
        }
    }

})();