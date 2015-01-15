(function() {
    'use strict';

    var browserSync = require('browser-sync');
    var instance = null,
        port,
        host;

    function loadInstance(proxy) {
        instance = browserSync({
            'open': false,
            'log': 'debug',
            'proxy': proxy
        }, reloadBrowser);
    }

    function reloadBrowser(unexpected, bs) {

        // Setting port and host
        host = bs.options.host;
        port = bs.options.port;

        setTimeout(function() {
            instance.doBrowserReload();
        }, 2000);
    }

    function changeProxy(target) {
        instance.cleanup(function () {
            instance.doBrowserReload();
            loadInstance(target);
        });
    }

    module.exports = function(request, response) {

        if(instance) {
            changeProxy(request.params.proxy);
        } else {
            loadInstance(request.params.proxy);
        }

        return response.send({
            'host': host,
            'path': request.params.proxy,
            'port': port
        });
    };
})();
