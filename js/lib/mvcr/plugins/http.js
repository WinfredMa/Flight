/**
 * Enables common http request scenarios.
 * @module http
 * @requires jquery
 */
define(['jquery'], function($) {
  /**
   * @class HTTPModule
   * @static
   */
  return {
    /**
     * The name of the callback parameter to inject into jsonp requests by default.
     * @property {string} callbackParam
     * @default callback
     */
    callbackParam:'callback',
    /**
     * Makes an HTTP GET request.
     * @method get
     * @param {string} url The url to send the get request to.
     * @param {object} [query] An optional key/value object to transform into query string parameters.
     * @return {Promise} A promise of the get response data.
     */
    get:function(url, query) {
        return $.ajax(url, { data: query });
    },
    /**
     * Makes an HTTP GET request with JSON format.
     * @method get
     * @param {string} url The url to send the get request to.
     * @param {object} [query] An optional key/value object to transform into query string parameters.
     * @return {Promise} A promise of the get response data.
     */
    getJSON:function(url, query) {
        return $.getJSON(url, query);
    },
    /**
     * Makes an JSONP request.
     * @method jsonp
     * @param {string} url The url to send the get request to.
     * @param {object} [query] An optional key/value object to transform into query string parameters.
     * @param {string} [callbackParam] The name of the callback parameter the api expects (overrides the default callbackParam).
     * @return {Promise} A promise of the response data.
     */
    jsonp: function (url, query, callbackParam) {
      if (url.indexOf('=?') == -1) {
        callbackParam = callbackParam || this.callbackParam;

        if (url.indexOf('?') == -1) {
          url += '?';
        } else {
          url += '&';
        }

        url += callbackParam + '=?';
      }

      return $.ajax({
        url: url,
        dataType:'jsonp',
        data:query
      });
    },
    /**
     * Makes an HTTP POST request with raw data.
     * @method post
     * @param {string} url The url to send the post request to.
     * @param {object} data The data to post. It will be converted to JSON. If the data contains Knockout observables, they will be converted into normal properties before serialization.
     * @return {Promise} A promise of the response data.
     */
    post:function(url, data) {
      return $.ajax({
        url: url,
        data: data,
        type: 'POST',
        dataType: 'json'
      });
    },
    /**
     * Makes an HTTP POST request with JSON data format.
     * @method post
     * @param {string} url The url to send the post request to.
     * @param {object} data The data to post. It will be converted to JSON. If the data contains Knockout observables, they will be converted into normal properties before serialization.
     * @return {Promise} A promise of the response data.
     */
    postJSON:function(url, data) {
      return $.ajax({
        url: url,
        //TODO, need to support the IE7- by import JSON2
        data: JSON.stringify(data),
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json'
      });
    }
  };
});
