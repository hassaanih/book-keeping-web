'use strict';

function DashboardService($rootScope, $http, API_URL) {
  return {
    get: function () {
      return $http({
        method: 'GET',
        url: API_URL + '/dashboard/get'
      });
    },

    
  };
}

angular.module('core').factory('DashboardService', DashboardService);