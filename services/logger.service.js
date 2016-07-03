(function () {
    'use strict';

    weatherApp.factory('logger', logger);

    logger.$inject = ['$log', 'toastr'];
    // logger.$inject = ['$log'];

    function logger($log, toastr) {
        var service = {
            showToasts: true,
            showOnlyOne: true,

            error: error,
            info: info,
            success: success,
            warning: warning,

            // straight to console; bypass toastr
            log: $log.log
        };

        return service;
        /////////////////////

        function error(message, data, title) {
            preProcessToast();
            toastr.error(message, title);
            $log.error('Error: ' + message, data);
        }

        function info(message, data, title) {
            preProcessToast();
            toastr.info(message, title);
            $log.info('Info: ' + message, data);
        }

        function success(message, data, title) {
            preProcessToast();
            toastr.success(message, title);
            $log.info('Success: ' + message, data);
        }

        function warning(message, data, title) {
            preProcessToast();
            toastr.warning(message, title);
            $log.warn('Warning: ' + message, data);
        }

        function preProcessToast() {
            if (service.showOnlyOne) {
                toastr.clear();
            }
        }
    }
}());
