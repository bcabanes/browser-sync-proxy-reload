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

    /**
     * [replaceAll description]
     * @param {string} find
     * @param {string} replace
     * @param {string} str
     */
    function replaceAll(find, replace, str) {
        return str.replace(new RegExp(find, 'g'), replace);
    }

    module.exports = function(request, response) {
        var path = request.params.protocol + '://' + request.params.url;
        path = replaceAll('-x1x-', '/', path);

        if(instance) {
            changeProxy(path);
        } else {
            loadInstance(path);
        }

        return response.send({
            'host': host,
            'path': path,
            'port': port
        });
    };
})();
