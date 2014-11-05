define(['global/url', 'http', 'underscore'], function(url, http, _) {
  'use strict';

  return {
    getChildSessions: function(conditions, callback) {
      http.getJSON(url.getChildSessionsURL(), conditions).done(function(response) {
        if (_.isFunction(callback)) {
          callback(response);
        }
      })
    }
  };
});