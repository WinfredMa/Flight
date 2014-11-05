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

  function Calendar( options, value ) {
    var date = new Date();

    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    $.extend(this, options);
    this.val = value;

    Calendar.prototype.display = function() { 
      var value = '<table class="calendar">';
      value += this.showChangeDate ();
      value += this.showWeeks ();
      value += this.showDays (this.year, this.month);
      value += '</table>';

      return value;
    }; 

  }

  return {
    drawDoughnut: _drawDoughnut,
    drawLine: _drawLine,
    Calendar: Calendar
  }
});