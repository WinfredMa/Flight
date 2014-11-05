define(['global/url', 'http', 'underscore'], function(url, http, _) {
  'use strict';

  return {
    getChildProgress: function(conditions, callback) {
      http.getJSON(url.getChildProgressURL(), conditions).done(function(response) {
        if (_.isFunction(callback)) {
          callback(response);
        }
      })
    },
    getGameList: function(conditions, callback) {
      http.getJSON(url.getGameListURL(), conditions).done(function(response) {
        if (_.isFunction(callback)) {
          callback(response);
        }
      });
    }
  };
});