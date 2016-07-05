(function () {
    'use strict';

    flickerApp
        .controller('photosController', photosControllerFn);

    photosControllerFn.$inject = [
        '$routeParams',
        'dataservice',
        'logger'
    ];

    function photosControllerFn($routeParams,
                                dataservice,
                                logger) {

        var vm = this;
        var currentPage = $routeParams.page || '1';
        vm.photos = [];
        vm.getLinkToPhoto = getLinkToPhoto;
        vm.getPhotoPreview = getPhotoPreview;
        vm.getCountInfo = getCountInfo;

        activate();

        function activate() {
            logger.info('Start reading photos...');
            getPhotos();
        }

        function getPhotos() {
            return dataservice.getPublicPhotos(currentPage)
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

        function getCountInfo() {
            var res = '';
            res += 'Shown ';
            var photosLength = (vm.photos && vm.photos.photo && vm.photos.photo.length) || 0;
            var page = (vm.photos && vm.photos.page) || 1;
            var perpage = (vm.photos && vm.photos.perpage) || 0;
            res += photosLength;
            res += '( from ';
            res += (page - 1) * perpage + 1;
            res += ' to ';
            res += (page - 1) * perpage + photosLength;
            res += ')';
            return res;
        }

    }

})();