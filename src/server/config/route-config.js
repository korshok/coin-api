(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //

    const routes = require('../routes/routes');

    // *** register routes *** //

    app.use('/currency/', routes.currency);
    app.use('/auth/', routes.auth);

  };

})(module.exports);
