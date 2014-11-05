define(['render/childProgress.render', 'model/childProgress.model'],
  function (render, model) {
  'use strict';

  /**
   * Get child progress data
   * 
   * @author Winfred.Ma
   */
  
  function _getProgressData( conditions ) {
    model.getChildProgress(conditions, function(response) {
      render.renderProgressPage(response);
    });
  }

  return {
    init: function() {
      render.init(this);
    },
    getProgressData: _getProgressData,
  };
});