/*
 * @version 0.1
 * @author Winfred Ma
 * child progress render js file
 */
define(['jquery', 'chart'],
  function($, chart) {
  'use strict';

  function _drawDoughnut( $parasitifer, $charData, $options ) {
    
    var ctx, $opts = {animateScale: true, showTooltips:false, percentageInnerCutout : 85};

    ctx = $parasitifer.getContext("2d");
    $opts = $.extend({}, $opts, $options);  
    window.myDoughnut = new Chart(ctx).Doughnut($charData, $opts);
  }

  function _drawLine( $parasitifer, $charData, $options ) {
    var ctx, $opts = {datasetFill : false, datasetStrokeWidth : 3, showTooltips : false, xLabelType : 3, pointDot : true, responsive : true, scaleShowLabels: false, scaleShowGridLines: false, dashedLine: true};
    ctx = $parasitifer.getContext("2d");
    $opts = $.extend({}, $opts, $options); 
    window.myLine = new Chart(ctx).Line($charData, $opts);
  }

  /**
   * Define the calendar object
   *
   */
  function Calendar( options, playedDays ) {
    var date = new Date();

    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    $.extend(this, options);
    this.playedDays = playedDays ? playedDays : [];
    this.weeks =  ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    this.monthTable = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    
    Calendar.prototype.setPlayedDays = function( playedDays ) {
      this.playedDays = playedDays;
    }

    Calendar.prototype.display = function() { 
      var html = this.showChangeDate ();
      html += '<table class="session-calendar-table">';
      html += this.showWeeks ();
      html += this.showDays(this.year, this.month);
      html += '</table>';

      return html;
    };

    Calendar.prototype.showWeeks = function() {
      var html = '<thead><tr class="session-calendar-weeks">';

      for (var title in this.weeks) {
        html += '<th>' + this.weeks[title] + '</th>'
      }
      html += '</tr></thead>';
    
      return html;
    }
  
    Calendar.prototype.showDays = function( year, month ) {
      var firstDay, starDay, days, html, flag = false;

      firstDay = new Date(year, month, 1, 0, 0, 0);
      starDay = firstDay.getDay()
      days = new Date(year, month, 0).getDate();
      html = '<tr>';

      for (var i = 0; i < starDay; i++) {
        html += '<td>&nbsp;</td>';
      }
      
      for (var j = 1; j <= days; j++) {
        i++;

        for (var index = 0; index < this.playedDays.length; index++) {
          if (j == this.playedDays[index]) {
            html += '<td class="played-day">' + j + '</td>';
            flag = true;
            break;
          } 
        }
        
        if (!flag) {
          html += '<td>' + j + '</td>';
        } else {
          flag = false;
        }
        
        if (i % 7 == 0) {
          html += '</tr><tr>';
        }
      }
    
      html += '</tr>';
      
      return html;
    }
  
    Calendar.prototype.showChangeDate = function() {

      var html, prevMonthIndex, crrentIndex, nextMonthIndex;
      prevMonthIndex = (this.month + 10) % 12;
      crrentIndex = (this.month - 1) % 12;
      nextMonthIndex = this.month % 12;

      html = '<div class="overflow-hidden"><a class="js-calendar-prev-month change-date-btn prev-month-btn pull-left">' + this.monthTable[prevMonthIndex].substr(0, 3) + '</a>';
      html += '<div class="js-current-month current-month pull-left" data-month="' + this.month +'"><span class="js-current-year" data-year="' + this.year + '"></span>' + this.monthTable[crrentIndex] + '</div>';
      html += '<a class="js-calendar-next-month change-date-btn pull-right next-month-btn">' + this.monthTable[nextMonthIndex].substr(0, 3) + '</a>';
      html += '</div>';

      return html;
    }

    Calendar.prototype.prevMonth = function( year, month ) {
      if (month == 1) {
        month = 12;
        year = (year <= 1970) ? 1970 : year - 1;
      } else {
        month --;
      }
    
      this.year = year;
      this.month = month;
    }
  
    Calendar.prototype.nextMonth = function( year, month ) {
      if (month == 12) {
        month = 1;
        year = (year >= 2038) ? 2038 : parseInt(year) + 1;
      } else {
        month ++;
      }

      this.year = year;
      this.month = month;
    }
  }

  function WeekTable() {
    if ( WeekTable.instance === 'object' ) {
      return WeekTable.instance
    }
    this.weeks = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    
    WeekTable.prototype.getWeekDay = function( index, opts ) {
      return this.weeks[index];
    }

    WeekTable.instance = this;
  }

  return {
    drawDoughnut: _drawDoughnut,
    drawLine: _drawLine,
    Calendar: Calendar,
    WeekTable: WeekTable
  }
});