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

  function _getChildPlayedDays( conditions ) {
    model.getChildPlayedDays(conditions, function(response) {
      render.renderCalendar(response);
    });
  }

  function _getDetailSession( conditions ) {
    model.getDetailSession(conditions, function(response) {
      render.renderSession(response);
    });
  }

  return {
    init: function() {
      render.init(this);
    },
    getSessionsData: _getSessionsData,
    getChildPlayedDays: _getChildPlayedDays,
    getDetailSession: _getDetailSession
  };
});