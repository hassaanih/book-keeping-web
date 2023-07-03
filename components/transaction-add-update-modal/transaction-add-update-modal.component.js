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
        $("#transaction-modal").modal("show");
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

      // findUsingOTP
      ctrl.findUsingOTP = function (otp) {
        TransactionService.findUsingOTP(otp).then(
          function success(response) {
            ctrl.transaction = response.data.transaction;
          },
          function error(response) {
            $("#transaction-modal").modal("hide");
            Swal.fire({
              icon: "error",
              title: "No transaction found.",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        );
      };

      ctrl.reject = function () {
        TransactionService.reject(ctrl.transaction).then(
          function success(response) {
            if (response.status == 200) {
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
              $rootScope.$broadcast("Update::List");
            }
          },
          function error(response) {}
        );
      };

      ctrl.createTransaction = function () {
        TransactionService.add(ctrl.transaction).then(
          function success(response) {
            if (response.status == 200) {
              $rootScope.$broadcast("Update::List");
            }
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
