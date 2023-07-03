"use strict";

angular.module("component").component("transactionAddUpdate", {
  templateUrl: "components/transaction-add-update-modal/transaction-add-update-modal.template.html",
  controller: [
    "$scope",
    "$location",
    "$routeParams",
    "$rootScope",
    // "RevenueService",
    // "DashboardService",
    "TransactionService",
    "Constant",
    function TransactionAddUpdateController(
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
      ctrl.transaction = {};
      ctrl.modalType = Constant.TransactionModalType;
      ctrl.activeModalType = 0
      

      ctrl.$onInit = function () {
        
      };

      $scope.$on("Transaction:ShowAddModal", function(){
        $("#transaction-modal").modal("show")
      })
      
      $scope.$on("Transaction:ShowUpdateModal", function(args,data){
        console.log(data);
        ctrl.find(data.id);
        ctrl.activeModalType = data.modalType
        $("#transaction-modal").modal("show")
      })

      ctrl.find = function(id){
        TransactionService.find(id).then(
          function success(response){
            ctrl.transaction = response.data.transaction;
          },
          function error(response){
            console.log(response);
          }
        )
      }

      ctrl.reject = function(){
        TransactionService.reject(ctrl.transaction).then(
          function success(response){
            if(response.status == 200){
              $rootScope.$broadcast("Update::List");
            }
          },
          function error(response){
            
          }
        )
      }

      ctrl.complete = function(){
        TransactionService.complete(ctrl.transaction.id).then(
          function success(response){
            if(response.status == 200){
              $rootScope.$broadcast("Update::List");
            }
          },
          function error(response){
            
          }
        )
      }

      ctrl.createTransaction = function(){
        TransactionService.create(ctrl.transaction).then(
          function success(response){
            if(response.status == 200){
              $rootScope.$broadcast("Update::List");
            }
          },
          function error(response){
            ctrl.error = response.data.error;

          }
        )
      }

      ctrl.updateTransaction = function(){
        TransactionService.update(ctrl.transaction).then(
          function success(response){
            if(response.status == 200){
              $rootScope.$broadcast("Update::List");
            }
          },
          function error(response){

          }
        )
      }

      ctrl.closeModal = function(){
        $("#transaction-modal").modal("hide");
      }
    },
  ],
});
