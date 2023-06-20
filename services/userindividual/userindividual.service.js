"use strict";

function UserIndividual($http, API_URL) {
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
    },
    findAllUserTypeSales: function (){
      return $http({
        method: 'GET',
        url: API_URL + 'user/dtfindall/usertype/sales'
      })
    },
    findAllUserTypeKitchen: function (){
      return $http({
        method: 'GET',
        url: API_URL + 'user/dtfindall/usertype/kitchen'
      })
    },
    findAllUserTypeCustomer: function (){
      return $http({
        method: 'GET',
        url: API_URL + 'user/dtfindall/usertype/customer'
      })
    },

  };
}

angular.module("core").factory("UserIndividualService", UserIndividual);
