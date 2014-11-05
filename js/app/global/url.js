/*
 * All the AJAX URL defined here.
 *
 * Version: 1.0
 * Author: Winfred Ma
 * Email: 851936509@qq.com
 */
define([], function () {
  var mode = 'dev';
  modes = {
        prod: {
          cmsBaseUri: 'http://dev.flight.gamecloudstudios.com/cms/?q='
        },
        dev: {
          childProgress: 'js/app/json/childProgress.json',
          childSessions: 'js/app/json/childSessions.json' 
        }
      };

  var _get = function(key) {
    return modes[mode][key];
  };

  return {
    getChildProgressURL: function() {
      return _get('childProgress');
    },
    getChildSessionsURL: function() {
      return _get('childSessions');
    },
  };
})