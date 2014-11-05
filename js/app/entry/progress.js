/*
 * The main progress js file
 * 
 * Version: 1.0
 * Author: Winfred Ma
 * Email: 851936509@qq.com 
 */
(function () {
  commonRequire();
  require(['jquery','global/header', 'controller/childProgress.controller'], function($, header, childProgressController) {
    $(function() {
      header.init();
      childProgressController.init();
    });
  });
})();