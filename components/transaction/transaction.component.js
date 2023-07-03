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
      ctrl.modalType = Constant.TransactionModalType

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

      ctrl.approve = function(id){
        TransactionService.approve(id).then(
          function success(response){
            if(response.status == 200){
              ctrl.list();
            }
          },
          function error(response){

          }
        )
      }

      

      ctrl.showAddModal = function (){
        $rootScope.$broadcast("Transaction:ShowAddModal");
      }

      ctrl.showUpdateModal = function(id, modalType){
        $rootScope.$broadcast("Transaction:ShowUpdateModal", {id: id, modalType: modalType});
      }
    },
  ],
});
