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

    authenticate: function(){
      return localStorage.getItem('auth_token') ? true : false;
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
    },

    list: function (){
      return $http({
        method: "GET",
        url: API_URL + '/user/list'
      })
    },
    create: function (data){
      return $http({
        method: "POST",
        url: API_URL + '/user/create',
        data: data
      })
    },
    update: function (data){
      return $http({
        method: "POST",
        url: API_URL + '/user/update',
        data: data
      })
    },
    find: function (id){
      return $http({
        method: "GET",
        url: API_URL + '/user/find/' + id
      })
    },
    addCredit: function (data){
      return $http({
        method: "POST",
        url: API_URL + '/user/add/credit',
        data: data
      }) 
    }
  };
}

angular.module('core').factory('UserService', UserService);