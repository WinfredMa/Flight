/*
 * @version 0.1
 * @author Winfred Ma
 * child progress render js file
 */
define(['jquery', 'bootstrap', 'chart', 'util'],
  function($, bootstrap, chart, util) {
  'use strict';

  var $view, el, controller;

  function _mapElements() {
    el = {
      $navMenu: $view.find('.js-nav-menu'),
      $playerSessions : $view.find('.js-player-sessions'),
      $playerPerformance: $view.find('.js-player-performance'),
      $partialGlowFactor: $view.find('.js-partial-glow-factor'),
      $allGlowFactor: $view.find('js-all-glow-factor')
    };
  }

  function _bindActions() {
    
  }

  function _renderProgressPage( response ) {
    var $child;

    if (!response || (typeof(response) === 'object')) {
      if (response.childProgressVo) {
        $child = response.childProgressVo;
        _renderSessionsSection($child);
        _renderPerformanceSection($child);
        _renderGlowFactorChart($child);

      }
    }
    //el.$partialGlowFactor.html();
  }

  function _childProgress() {
    if ($view.length >= 1) {
      controller.getProgressData();
    }
  }

  function _renderSessionsSection( $child ) {
    el.$playerSessions.find('.js-played-days').empty().html($child.playedDays);
    el.$playerSessions.find('.js-uncompleted-sessions').empty().html($child.remainSessions);
  }

  function _renderPerformanceSection( $child ) {
    el.$playerPerformance.find('.js-memory').empty().html($child.memoryScore);
    el.$playerPerformance.find('.js-focus').empty().html($child.focusScore);
    el.$playerPerformance.find('.js-regulation').empty().html($child.regulationScore);
    el.$playerPerformance.find('.js-effort').empty().html($child.effortScore);
  }
  
  function _renderGlowFactorChart( $child ) {
    var parasitifer, ctx, $opts;
    parasitifer = el.$partialGlowFactor[0];
    ctx = parasitifer.getContext("2d");
    $opts = {datasetFill : false, datasetStrokeWidth : 3, showTooltips : false, xLabelType : 1, pointDot : true, responsive : true, scaleShowLabels: false, scaleShowGridLines: false, dashedLine: false};
    util.drawLine(parasitifer, $child.thirtyDaysChartVo, $opts);
  }
  /**
   * remove form error message
   * @author Winfred.Ma
   *//*
  function _removeError($ele) {
    var $group = $ele.closest('.js-form-group');
    $group.removeClass(constants.HAS_ERROR);
    $group.find('.js-error-msg').empty();
  }
  
  *//**
   * add form error message
   * @author Winfred.Ma
   *//*
  function _addError($ele, errorMsg) {
    var $group = $ele.closest('.js-form-group');
    $group.addClass(constants.HAS_ERROR);
    $group.find('.js-error-msg').html(errorMsg);
  }*/
  
 /* function _updateList() {
  
    if ($view.length >= 1) {
      $view.handleList({
        updated: function(params) {
          if ('undefined' != typeof appkey) {
            params += ('&appkey=' + appkey);
          }
          controller.showGameList(params);
        }
      });
    }
  }
*/
  /**
   * Render game list 
   * @returns
   * @author Winfred.Ma
   */
  /*function _renderGameList(response) {
    el.$gameList.html(render.renderTemplate('gameList', response));
  }*/
  function _init(_controller) {
    controller = _controller;
    $view = $('.js-child-progress');
    _mapElements();
    _bindActions();
    _childProgress();
  }

  return {
    init: _init,
    renderProgressPage: _renderProgressPage
  };
});