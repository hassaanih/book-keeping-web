'use strict';

function NotificationService($rootScope, $http, API_URL) {
  return {
    getUserNotification: function () {
      return $http({
        method: 'GET',
        url: API_URL + '/notification/get'
      });
    },
    markAsRead : function () {
      return $http({
        method: 'GET',
        url: API_URL + '/notification/read'
      })
    }
    
  };
}

angular.module('core').factory('NotificationService', NotificationService);