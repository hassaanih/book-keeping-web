"use strict";

function UserSalesService($http, API_URL) {
  return {
    find: function (id) {
      return $http.get(API_URL + "/user/find/" + id);
    },

    add: function (user) {
      return $http({
        method: "POST",
        url: API_URL + "/user/create",
        data: user,
      });
    },

    update: function (user) {
      return $http({
        method: "POST",
        url: API_URL + "/user/update",
        data: user,
      });
    },
    delete: function (id) {
      return $http.get(API_URL + "/user/delete/" + id);
    }
  };
}

angular.module("core").factory("UserSalesService", UserSalesService);
