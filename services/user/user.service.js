'use strict';

function UserService($http, API_URL) {
  return {
    login: function (auth) {
      return $http({
        method: 'POST',
        url: API_URL+'/user/signin',
        data: auth
      });
    },

    logout: function () {
      return $http({
        method: 'GET',
        url: API_URL+'/user/signout'
      });
    },

    activateAccount: function (id) {
      return $http.get(API_URL + "/user/activateaccount/" + id);
    },

    inactivateAccount: function (id) {
      return $http.get(API_URL + "/user/inactivateaccount/" + id);
    }
  };
}

angular.module('core').factory('UserService', UserService);