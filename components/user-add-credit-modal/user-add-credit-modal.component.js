"use strict";

angular.module("component").component("userAddCreditModal", {
  templateUrl:
    "components/user-add-credit-modal/user-add-credit-modal.template.html",
  controller: [
    "$scope",
    "$location",
    "$routeParams",
    "$rootScope",
    // "RevenueService",
    // "DashboardService",
    "LookupDataService",
    "UserService",
    "Constant",
    function AgentAddUpdateController(
      $scope,
      $location,
      $routeParams,
      $rootScope,
      // RevenueService,
      // DashboardService,
      LookupDataService,
      UserService,
      Constant
    ) {
      var ctrl = this;
      ctrl.user = {};
      ctrl.isEditMode = false;
      ctrl.lookupCurrency = [];
      ctrl.error;

      ctrl.$onInit = function () {
        $rootScope.$broadcast("Language::Change")
        ctrl.user = {};
        ctrl.getLookupCurrency();
      };

      ctrl.$postLink = function () {
        ctrl.user = {};
      };

      $scope.$on("User:ShowCreditModal", function (args, data) {
        console.log(data);
        ctrl.find(data.id);
        $("#credit-modal").modal("show");
      });

      ctrl.find = function (id) {
        UserService.find(id).then(
          function success(response) {
            ctrl.user = response.data.user;
          },
          function error(response) {
            console.log(response);
          }
        );
      };

      ctrl.getLookupCurrency = function(){
        LookupDataService.get().then(
          function success(response){
            ctrl.lookupCurrency = response.data.lookupCurrency;
            console.log(ctrl.transactionList);
          },
          function error(response){
            console.log(response)
          }
        )
      }

      ctrl.updateUser = function () {
        UserService.addCredit(ctrl.user).then(
          function success(response) {
            if (response.status == 200) {
              $rootScope.$broadcast("Update::List::User");
              ctrl.closeModal();
            }
          },
          function error(response) {
            console.log(response);
            if(response.status == 400){
              ctrl.error = response.data.error;
            }else{
              appAlert('Something went wrong. Please contact admin');
            }
          }
        );
      };

      ctrl.closeModal = function () {
        ctrl.user = {};
        $("#credit-modal").modal("hide");
      };
    },
  ],
});
