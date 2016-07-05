(function () {
    'use strict';

    flickerApp
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

})();