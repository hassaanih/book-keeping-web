"use strict";

angular.module("component").component("transactionAddUpdate", {
  templateUrl:
    "components/transaction-add-update-modal/transaction-add-update-modal.template.html",
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
      ctrl.activeModalType = 0;
      ctrl.disableCommision = true;
      ctrl.TransactionStatus = Constant.TransactionStatus;

      ctrl.$onInit = function () {
        ctrl.transaction = {};
        ctrl.activeModalType = 0;
      };

      ctrl.$postLink = function () {
        ctrl.transaction = {};
        ctrl.activeModalType = 0;
      };

      $scope.$on("Transaction:ShowAddModal", function () {
        ctrl.activeModalType = ctrl.modalType.TOBECREATED;
        $("#transaction-modal").modal("show");
      });

      $scope.$on("Transaction:ShowUpdateModal", function (args, data) {
        console.log(data);
        ctrl.find(data.id);
        ctrl.activeModalType = data.modalType;
        $("#transaction-modal").modal("show");
      });

      $scope.$on("Transaction:ShowRejectModal", function (args, data) {
        console.log(data);
        ctrl.find(data.id);
        ctrl.activeModalType = data.modalType;
        $("#transaction-modal").modal("show");
      });

      // Transaction:ShowCompleteModal
      $scope.$on("Transaction:ShowCompleteModal", function (args, data) {
        console.log(data);
        ctrl.findUsingOTP(data.otp);
        ctrl.activeModalType = data.modalType;
      });

      ctrl.find = function (id) {
        TransactionService.find(id).then(
          function success(response) {
            ctrl.transaction = response.data.transaction;
          },
          function error(response) {
            console.log(response);
          }
        );
      };

      $scope.$watchGroup(['$ctrl.transaction.recieving_currency', '$ctrl.transaction.target_currency'], function(newValues, oldValues) {
        let dropdown1Value = newValues[0];
        let dropdown2Value = newValues[1];
    
        if (dropdown1Value === dropdown2Value) {
          // Perform action when values are the same
          console.log('Performing action...');
          ctrl.disableCommision = true;
          // Add your action code here
        }else{
          ctrl.disableCommision = false;
        }
      });

      // findUsingOTP
      ctrl.findUsingOTP = function (otp) {
        TransactionService.findUsingOTP(otp).then(
          function success(response) {
            ctrl.transaction = response.data.transaction;
            console.log(ctrl.transaction);
            if(ctrl.transaction.transaction_status == ctrl.TransactionStatus.APPROVED){
              $("#transaction-modal").modal("show");
            }else{
              Swal.fire({
                icon: "warning",
                title: "Cannot view transaction.",
                text: "The required transaction is in " + ctrl.transaction.transaction_status + " status. " + (ctrl.transaction.manager_id ? 'Please contact '+ ctrl.transaction.manager.name + ' to further process your transaction.' : ' No action has been taken regarding your transaction.'),
                showConfirmButton: false,
                timer: 5000,
              });
            }
          },
          function error(response) {
            Swal.fire({
              icon: "error",
              title: "No transaction found.",
              showConfirmButton: false,
              timer: 1500,
            });
            // $("#transaction-modal").modal("hide");
          }
        );
      };

      ctrl.reject = function () {
        TransactionService.reject(ctrl.transaction).then(
          function success(response) {
            if (response.status == 200) {
              ctrl.closeModal();
              $rootScope.$broadcast("Update::List");
            }
          },
          function error(response) {}
        );
      };

      ctrl.complete = function () {
        TransactionService.complete(ctrl.transaction.id).then(
          function success(response) {
            if (response.status == 200) {
              ctrl.closeModal();
              $rootScope.$broadcast("Update::List");
            }
          },
          function error(response) {}
        );
      };

      ctrl.createTransaction = function () {
        TransactionService.add(ctrl.transaction).then(
          function success(response) {
            console.log(response)
            Swal.fire({
              icon: "success",
              title: "Your Transaction Otp is " + response.data.transaction.otp_for_transaction,
              showConfirmButton: false,
            });
            $rootScope.$broadcast("Update::List");
            $("#transaction-modal").modal("hide");
          },
          function error(response) {
            ctrl.error = response.data.error;
          }
        );
      };

      ctrl.updateTransaction = function () {
        TransactionService.update(ctrl.transaction).then(
          function success(response) {
            if (response.status == 200) {
              $rootScope.$broadcast("Update::List");
              ctrl.closeModal();
            }
          },
          function error(response) {}
        );
      };

      ctrl.closeModal = function () {
        ctrl.transaction = {};
        ctrl.activeModalType = 0;
        $("#transaction-modal").modal("hide");
      };
    },
  ],
});
