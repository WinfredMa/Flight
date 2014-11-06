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
          login: '/flight/dashboard/v3/user/login',
          changeChild: '/flight/dashboard/v3/${accessToken}/child/change',
          sessions: '/flight/dashboard/v3/${accessToken}/sessions/detail',
          detailSession: '/flight/dashboard/v3/${accessToken}/session/${gameSessionId}/detail',
          playedDays: '/flight/dashboard/v3/${accessToken}/session/record',
          cmsBaseUri: 'http://dev.flight.gamecloudstudios.com/cms/?q='
        },
        dev: {
          childProgress: 'js/app/json/childProgress.json',
          childSessions: 'js/app/json/childSessions.json',
          childPlayedDays: 'js/app/json/childPlayedDays.json',
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
    getChildPlayedDaysURL: function() {
      return _get('childPlayedDays');
    },
    getDetailSessionURL: function() {
      return _get('detailSession');
    }
  };
})