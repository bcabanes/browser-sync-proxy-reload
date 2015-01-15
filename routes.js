(function () {
    'use strict';

    module.exports = function (server) {
        server.get('/', require('./controllers/index/getIndex'));
        server.get('/path/:proxy', require('./controllers/path/getIndex'));

        server.on('NotFound', function (request, response) {
            return response.send(404, { 'error': 'Page Not Found' });
        });

        server.on('MethodNotAllowed', function (request, response) {
            return response.send(404, { 'error': 'Page Not Found' });
        });

        server.on('uncaughtException', function (request, response, route, error) {
            return response.send(500, { 'error': 'Internal Server Error' });
        });
    };
})();
