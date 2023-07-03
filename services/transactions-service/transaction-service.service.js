"use strict";

function TransactionService($http, API_URL) {
  return {
    find: function (id) {
      return $http.get(API_URL + "/transaction/find/" + id);
    },

    findUsingOTP: function (otp) {
      return $http.get(API_URL + "/transaction/find/otp/" + otp);
    },

    add: function (data) {
      return $http({
        method: "POST",
        url: API_URL + "/transaction/create",
        data: data,
      });
    },

    update: function (data) {
      return $http({
        method: "POST",
        url: API_URL + "/transaction/update",
        data: data,
      });
    },

    reject: function (data) {
      return $http({
        method: "POST",
        url: API_URL + "/transaction/reject",
        data: data,
      });
    },

    approve: function (id) {
      return $http.get(API_URL + "/transaction/approve/" + id);
    },

    complete: function (id) {
      return $http.get(API_URL + "/transaction/complete/" + id);
    },

    list: function(){
      return $http.get(API_URL + "/transaction/list");
    }
  };
}

angular.module("core").factory("TransactionService", TransactionService);
