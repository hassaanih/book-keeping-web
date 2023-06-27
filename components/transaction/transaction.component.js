"use strict";

angular.module("component").component("transaction", {
  templateUrl: "components/transaction/transaction.template.html",
  controller: [
    "$scope",
    "$location",
    "$routeParams",
    "$rootScope",
    // "RevenueService",
    // "DashboardService",
    "TransactionService",
    "Constant",
    function TransactionController(
      $scope,
      $location,
      $routeParams,
      $rootScope,
      // RevenueService,
      // DashboardService,
      TransactionService,
      Constant
    ) {
      var ctrl = this;
      ctrl.dashboard = {};
      ctrl.user = { full_name: "", user_type_id: "", user_type_name: "" };
      ctrl.Constant = Constant;
      ctrl.transactionList = [];

      ctrl.$onInit = function () {
        ctrl.user.full_name = localStorage.getItem("full_name");
        ctrl.list();
      };

      ctrl.list = function(){
        TransactionService.list().then(
          function success(response){
            ctrl.transactionList = response.data.data;
            console.log(ctrl.transactionList);
          },
          function error(response){
            console.log(response)
          }
        )
      }

      ctrl.showAddModal = function (){
        $rootScope.$broadcast("Transaction:ShowAddModal");
      }

      ctrl.showUpdateModal = function(id){
        $rootScope.$broadcast("Transaction:ShowUpdateModal", {id: id});
      }
    },
  ],
});
