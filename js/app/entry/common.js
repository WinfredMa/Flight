/*
 * The requirejs configuration.
 *
 * Version: 1.0
 * Author: Winfred Ma
 * Email: 851936509@qq.com
 */
function commonRequire() {
  return requirejs.config({
    baseUrl: 'js',
    paths: {
      jquery: 'lib/jquery.min',
      plugin: 'lib/plugin',
      http: 'lib/mvcr/plugins/http',
      underscore: 'lib/underscore-min',
      render: 'app/render',
      global: 'app/global',
      model: 'app/model',
      controller: 'app/controller',
      bootstrap: 'lib/bootstrap.min',
      chart: 'lib/Chart.min',
      util: 'util/util'
    },
    shim: {
      bootstrap: {
        deps: ['jquery']
      },
      chart: {
        deps: ['jquery']
      },
      underscore: {
        exports: '_'
      },
      util: {
        deps: ['chart']
      }
    },
  });
};