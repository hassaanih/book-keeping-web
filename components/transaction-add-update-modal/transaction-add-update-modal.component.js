"use strict";

angular.module("component").component("transactionAddUpdate", {
  templateUrl: "components/transaction-add-update-modal/transaction-add-update-modal.template.html",
  controller: [
    "$scope",
    "$location",
    "$routeParams",
    // "RevenueService",
    // "DashboardService",
    "TransactionService",
    "Constant",
    function TransactionAddUpdateController(
      $scope,
      $location,
      $routeParams,
      // RevenueService,
      // DashboardService,
      TransactionService,
      Constant
    ) {
      var ctrl = this;
      ctrl.transaction = {};
      

      ctrl.$onInit = function () {
        
      };

      $scope.$on("Transaction:ShowAddModal", function(){
        $("#transaction-modal").modal("show")
      })
      
      $scope.$on("Transaction:ShowUpdateModal", function(data){
        $("#transaction-modal").modal("show")
      })

      ctrl.find = function(){
        TransactionService.find(id).then(
          function success(response){
            ctrl.transaction = response.data.transaction;
          },
          function error(response){
            console.log(response);
          }
        )
      }

      ctrl.closeModal = function(){
        $("#transaction-modal").modal("hide");
      }
    },
  ],
});