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
    "LookupDataService",
    "TransactionService",
    "Constant",
    function TransactionController(
      $scope,
      $location,
      $routeParams,
      $rootScope,
      // RevenueService,
      // DashboardService,
      LookupDataService,
      TransactionService,
      Constant
    ) {
      var ctrl = this;
      ctrl.dashboard = {};
      ctrl.user = { full_name: "", user_type_id: "", user_type_name: "" };
      ctrl.Constant = Constant;
      ctrl.transactionList = [];
      ctrl.modalType = Constant.TransactionModalType;
      ctrl.userTypes = Constant.UserType;
      ctrl.activeUserType = localStorage.getItem("user_type_id");
      ctrl.lookupCurrencies = [];
      ctrl.filteredList = [];
      ctrl.transactionType = Constant.TransactionStatus;
      ctrl.activeTransactionType = 'all';

      ctrl.$onInit = function () {
        ctrl.user.full_name = localStorage.getItem("full_name");
        $rootScope.$broadcast("Language::Change")
        ctrl.list();
      };

      $scope.$on("Update::List", function(){
        ctrl.list();
      })

      ctrl.list = function(){
        TransactionService.list().then(
          function success(response){
            ctrl.transactionList = response.data.data;
            ctrl.filteredList = response.data.data;
            console.log(ctrl.transactionList);
          },
          function error(response){
            console.log(response)
          }
        )
      }

      ctrl.filterList = function(status){
        console.log(status);
        switch(status){
          case ctrl.transactionType.PENDING_FOR_APPROVAL:
            ctrl.filteredList = ctrl.transactionList.filter(item => {
              return item.transaction_status == status;
            })
            ctrl.activeTransactionType = status;
            break;
          case ctrl.transactionType.APPROVED:
            ctrl.filteredList = ctrl.transactionList.filter(item => {
              return item.transaction_status == status;
            })
            ctrl.activeTransactionType = status;
            break;
          case ctrl.transactionType.COMPLETED:
            ctrl.filteredList = ctrl.transactionList.filter(item => {
              return item.transaction_status == status;
            })
            ctrl.activeTransactionType = status;
            break;
          case ctrl.transactionType.REJECTED:
            ctrl.filteredList = ctrl.transactionList.filter(item => {
              return item.transaction_status == status;
            })
            ctrl.activeTransactionType = status;
            break;
          default: 
            ctrl.filteredList = ctrl.transactionList;
            ctrl.activeTransactionType = status;
            break;
        }
      }

      ctrl.approve = function(id){
        TransactionService.approve(id).then(
          function success(response){
            if(response.status == 200){
              Swal.fire({
                icon: "success",
                title: "Transaction Approved.",
                showConfirmButton: false,
                timer: 1500,
              });
              ctrl.list();
            }
          },
          function error(response){
            Swal.fire({
              icon: "error",
              title: "Transaction not approved.",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        )
      }

      

      ctrl.showAddModal = function (){
        $rootScope.$broadcast("Transaction:ShowAddModal");
      }

      ctrl.showUpdateModal = function(id, modalType){
        $rootScope.$broadcast("Transaction:ShowUpdateModal", {id: id, modalType: modalType});
      }

      ctrl.showRejectModal = function(id, modalType){
        $rootScope.$broadcast("Transaction:ShowRejectModal", {id: id, modalType: modalType});
      }

      ctrl.searchUsingOtp = function (){
        let inputValue;
        Swal.fire({
          title: 'Enter Transaction OTP',
          input: 'number',
          inputLabel: 'OTP',
          inputValue: inputValue,
          showCancelButton: true,
          inputValidator: (value) => {
            if (!value) {
              return 'You need to write something!'
            }else{
              inputValue = value;
              console.log(inputValue)
              $rootScope.$broadcast("Transaction:ShowCompleteModal", {otp: inputValue, modalType: ctrl.modalType.TOBECOMPLETED});
            }
          }
        })
      }
    },
  ],
});
