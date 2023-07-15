'use strict';

function LookupDataService($rootScope, $http, API_URL) {
  return {
    get: function () {
      return $http({
        method: 'GET',
        url: API_URL + '/currency/get/all'
      });
    },

    
  };
}

angular.module('core').factory('LookupDataService', LookupDataService);