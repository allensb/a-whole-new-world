(function () {
    'use strict';
    var _ = require('lodash'),
        express = require('express'),
        bodyParser = require('body-parser'),
        logger = require('../utils/logger.js');


    function ApiServer(options) {
        var apiServer = this;
        _.merge(this, {
            protocol: options.protocol || 'http',
            host: options.host || 'localhost',
            port: options.port || '8080',
            app: express()
        });

        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());

        this.server = this.app.listen(this.port, this.host, function () {
            logger.info('API Ready and Listening on ' + apiServer.protocol + '://' + apiServer.host + ':' + apiServer.port);
        });

    }

    ApiServer.prototype = {
        answerGet: function (endpoint, processor) {
            var apiServer = this;

            logger.info('Adding GET Path: ' + endpoint);

            apiServer.app.get(endpoint, processor);
        },
        answerPost: function (endpoint, processor) {
            var apiServer = this;

            logger.info('Adding POST Path: ' + endpoint);

            apiServer.app.post(endpoint, processor);
        }
    };

    module.exports = ApiServer;

}());
