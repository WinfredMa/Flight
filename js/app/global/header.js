/*
 * @version 0.1
 * @author Winfred Ma
 * child progress render js file
 */
define(['jquery'],
  function($) {
  'use strict';

  var $view, el;

  function _mapElements() {
    el = {
      $navMenu: $view.find('.js-nav-menu'),
    };
  }

  function _bindActions() {
    el.$navMenu.on('click', _activateNavMenu);
  }
  
  function _activateNavMenu() {
    el.$navMenu.removeClass('active');
    $(this).addClass('active');
  }

  function _init() {
    $view = $('.js-header');
    _mapElements();
    _bindActions();
  }

  return {
    init: _init
  };
});