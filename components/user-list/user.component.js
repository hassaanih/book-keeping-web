"use strict";

angular.module("component").component("user", {
  templateUrl: "components/user-list/user.template.html",
  controller: [
    "$scope",
    "$location",
    "$routeParams",
    "$rootScope",
    // "RevenueService",
    // "DashboardService",
    "UserService",
    "Constant",
    function UserController(
      $scope,
      $location,
      $routeParams,
      $rootScope,
      // RevenueService,
      // DashboardService,
      UserService,
      Constant
    ) {
      var ctrl = this;
      ctrl.dashboard = {};
      ctrl.user = { full_name: "", user_type_id: "", user_type_name: "" };
      ctrl.Constant = Constant;
      ctrl.userList = [];
      ctrl.userTypes = Constant.UserType;
      ctrl.activeUserType = localStorage.getItem("user_type_id");

      ctrl.$onInit = function () {
        $rootScope.$broadcast("Language::Change")
        ctrl.list();
      };

      $scope.$on("Update::List::User", function(){
        ctrl.list();
      })

      ctrl.list = function(){
        UserService.list().then(
          function success(response){
            ctrl.userList = response.data.data;
            console.log(ctrl.userList);
          },
          function error(response){
            console.log(response)
          }
        )
      }

      ctrl.showAddModal = function (){
        $rootScope.$broadcast("User:ShowAddModal");
      }

      ctrl.showUpdateModal = function (id){
        $rootScope.$broadcast("User:ShowUpdateModal", {id: id});
      }

      ctrl.showCreditUpdateModal = function (agentId){
        $rootScope.$broadcast("User:ShowCreditModal", {id: agentId});
      }
    },
  ],
});
