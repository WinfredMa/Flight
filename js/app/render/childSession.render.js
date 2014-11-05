/*
 * @version 0.1
 * @author Winfred Ma
 * child progress render js file
 */
define(['jquery','chart', 'util'],
  function($, chart, util) {
  'use strict';

  var $view, el, controller;

  function _mapElements() {
    el = {
      $latestChildMemory: $view.find('.js-latest-child-memory')[0],
      $latestChildFocus: $view.find('.js-latest-child-focus')[0],
      $latestChildRegulation: $view.find('.js-latest-child-regulation')[0],
      $latestChildEffort: $view.find('.js-latest-child-effort')[0],
      $latestChildGlow: $view.find('.js-latest-child-glow')[0],
      $brainChart: $view.find('.js-brain-sensing-chart')[0],
      $expandBtn: $view.find('.js-expand-btn'),
      $sessionTimeLineDate: $view.find('.js-session-timeline-date'),
      $collapsedSessionContainer: $view.find('.js-collapsed-detail-container'),
      $sessionInfoCantainer: $view.find('.js-session-detail-container')
    };
  }

  function _bindActions() {
    el.$expandBtn.on('click', _expandSessionContainer);
  }

  function _expandSessionContainer () {
    var $collapsedCantainer, $expandedCantainer;
    el.$collapsedSessionContainer.removeClass('hidden');
    $collapsedCantainer = $(this).closest(".session-detail-collapsed");
    $collapsedCantainer.addClass('hidden');
    el.$sessionTimeLineDate.addClass('session-date-collapsed');
    $collapsedCantainer.prev().toggleClass('session-date-collapsed');
    el.$sessionInfoCantainer.addClass('hidden');
    $collapsedCantainer.next().toggleClass('hidden');

  }

  function _renderSessionPage( response ) {
    var $child;

    if (!response || (typeof(response) === 'object')) {
      if (response.sessionInfoVos) {
        $child = response.sessionInfoVos[0];
        util.drawDoughnut(el.$latestChildMemory, $child.memoryChartVo.data);
        util.drawDoughnut(el.$latestChildFocus, $child.focusChartVo.data);
        util.drawDoughnut(el.$latestChildRegulation, $child.regulationChartVo.data);
        util.drawDoughnut(el.$latestChildEffort, $child.effortChartVo.data);
        util.drawDoughnut(el.$latestChildGlow, $child.glowChartVo.data);
        util.drawLine(el.$brainChart, $child.sessionChartVo);
      }
    }

    var $calendar = new util.Calendar();
    $calendar.display();
  }

  function _childSession() {
    if ($view.length >= 1) {
      controller.getSessionsData();
    }
  }

  function _init(_controller) {
    controller = _controller;
    $view = $('.js-child-sessions');
    _mapElements();
    _bindActions();
    _childSession();
  }

  return {
    init: _init,
    renderSessionPage: _renderSessionPage
  };
});