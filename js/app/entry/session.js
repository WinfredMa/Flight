/*
 * The main session js file
 * 
 * Version: 1.0
 * Author: Winfred Ma
 * Email: 851936509@qq.com 
 */
(function () {
  commonRequire();
  require(['jquery', 'global/header', 'controller/childSession.controller'], function($, header, childSessionController) {
    $(function() {
      header.init();
      childSessionController.init();
    });
  });
})();