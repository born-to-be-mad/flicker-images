(function () {
    'use strict';

    weatherApp.service('dataservice', dataserviceFn);

    dataserviceFn.$inject = ['Restangular', 'logger'];

    function dataserviceFn(Restangular,
                           logger) {

        var service = {
            getPublicPhotos: getPublicPhotos
        };
        return service;

        function getPublicPhotos() {
            return Restangular.one('rest?method=flickr.people.getPublicPhotos').get()
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