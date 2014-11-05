define(['render/childSession.render', 'model/childSession.model'],
  function (render, model) {
  'use strict';

  /**
   * Get child session data
   * 
   * @author Winfred.Ma
   */

    
  function _getSessionsData( conditions ) {
    model.getChildSessions(conditions, function(response) {
      render.renderSessionPage(response);
    });
  }

  return {
    init: function() {
      render.init(this);
    },
    getSessionsData: _getSessionsData,
  };
});