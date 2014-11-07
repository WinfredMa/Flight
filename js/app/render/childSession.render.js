/*
 * @version 0.1
 * @author Winfred Ma
 * child progress render js file
 */
define(['jquery','chart', 'util', 'global/constants'],
  function($, chart, util, constants) {
  'use strict';

  var $view, el, controller, $calendar, $currentSessionContainer;

  function _mapElements() {
    el = {
      $sessionInfoContainers: $view.find('.js-session-container'),
      $expandBtns: $view.find('.js-expand-btn'),
      $sessionTimeLineDates: $view.find('.js-session-timeline-date'),
      $collapsedSessionContainers: $view.find('.js-collapsed-detail-container'),
      $calendarContainer: $view.find('.js-calendar-container'),
      $showCalendarBtn: $view.find('.js-show-calendar'),
      $sessionDetailCantainers: $view.find('.js-session-detail-container')
    };
  }

  function _bindActions() {
    el.$expandBtns.on('click', _expandSessionContainer);
    el.$calendarContainer.on('click', '.js-calendar-next-month', _getPlayedDays);
    el.$calendarContainer.on('click', '.js-calendar-prev-month', _getPlayedDays);
    el.$showCalendarBtn.on('click', _toggleShowCalendar);
  }

  function _toggleShowCalendar() {
    el.$calendarContainer.toggleClass('hidden');
  }

  function _expandSessionContainer () {
    var $collapsedCantainer, $expandedCantainer, $self;

    $self = $(this);
    //Show all of collaped session container
    el.$collapsedSessionContainers.removeClass('hidden');

    //Hide the clicked collaped session container
    $collapsedCantainer = $self.closest(".session-detail-collapsed");
    $collapsedCantainer.addClass('hidden');

    el.$sessionTimeLineDates.addClass('session-date-collapsed');
    $collapsedCantainer.prev().toggleClass('session-date-collapsed');

    //Hide session detail container
    el.$sessionDetailCantainers.addClass('hidden');
    $currentSessionContainer = $self.closest(".session-container");
    controller.getDetailSession({'sessionId': $currentSessionContainer.data('id'), 'childId': 111});

    $collapsedCantainer.next().toggleClass('hidden');

  }

  function _getPlayedDays() {
    var currentYear, currentMonth, dateFilter;

    currentYear = el.$calendarContainer.find('.js-current-year').data('year');
    currentMonth = el.$calendarContainer.find('.js-current-month').data('month');
    dateFilter = currentYear + '-' + currentMonth + '-01';

    if ($(this).hasClass('js-calendar-prev-month')) {
      $calendar.prevMonth(currentYear, currentMonth);
    } else {
      $calendar.nextMonth(currentYear, currentMonth);
    }
    
    controller.getChildPlayedDays({'childId': 111, 'dateFilter': dateFilter});
  }

  function _renderSessionPage( response ) {
    var sessionInfoVos, sessionCount;

    if (!response || (typeof(response) === 'object')) {
      if (response.statusCode == constants.responseCode.SUCCESS) {
        sessionInfoVos = response.response.sessionInfoVos;
        sessionCount = sessionInfoVos.length;
        if (sessionCount) {
          for(var i = 0; i < sessionCount; i++) {
            $(el.$sessionInfoContainers[i]).data('id', sessionInfoVos[i].gameSessionId).show();
          }
          $currentSessionContainer = $(el.$sessionInfoContainers[0]);
          _rendSessionInfo($currentSessionContainer, response.response.sessionScoreVo);
        }
      }
    }

    $calendar = new util.Calendar({}, response.response.playedDates);
    el.$calendarContainer.html($calendar.display());
  }

  function _rendSessionInfo( $sessionContainer, $sessionInfo) {
    util.drawDoughnut($sessionContainer.find('.js-latest-child-memory')[0], $sessionInfo.memoryChartVo.data);
    util.drawDoughnut($sessionContainer.find('.js-latest-child-focus')[0], $sessionInfo.focusChartVo.data);
    util.drawDoughnut($sessionContainer.find('.js-latest-child-regulation')[0], $sessionInfo.regulationChartVo.data);
    util.drawDoughnut($sessionContainer.find('.js-latest-child-effort')[0], $sessionInfo.effortChartVo.data);
    util.drawDoughnut($sessionContainer.find('.js-latest-child-glow')[0], $sessionInfo.glowChartVo.data);
    util.drawLine($sessionContainer.find('.js-brain-sensing-chart')[0], $sessionInfo.sessionChartVo);
  }

  function _renderSession( response ) {
    var $sessionInfoVo;

    if (!response || (typeof(response) === 'object')) {
      if (response.statusCode == constants.responseCode.SUCCESS) {
        $sessionInfoVo = response.response;

        _rendSessionInfo($currentSessionContainer, $sessionInfoVo);
      }
    }
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

  function _renderCalendar( response ) {
    var playedDays;

    if (!response || (typeof(response) === 'object')) {
      if (response.statusCode == constants.responseCode.SUCCESS) {
        playedDays = response.response.days;
        $calendar.setPlayedDays(playedDays);
        el.$calendarContainer.html($calendar.display());
      }
    }
  }

  return {
    init: _init,
    renderSessionPage: _renderSessionPage,
    renderCalendar: _renderCalendar,
    renderSession: _renderSession
  };
});