"use strict";

angular.module("component").component("userAddUpdate", {
  templateUrl:
    "components/user-add-update-modal/user-add-update-modal.template.html",
  controller: [
    "$scope",
    "$location",
    "$routeParams",
    "$rootScope",
    // "RevenueService",
    // "DashboardService",
    "UserService",
    "Constant",
    function AgentAddUpdateController(
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
      ctrl.user = {};
      ctrl.isEditMode = false;

      ctrl.$onInit = function () {
        ctrl.user = {};
      };

      ctrl.$postLink = function () {
        ctrl.user = {};
      };

      $scope.$on("User:ShowAddModal", function () {
        $("#user-modal").modal("show");
      });

      $scope.$on("User:ShowUpdateModal", function (args, data) {
        ctrl.isEditMode = true;
        console.log(data);
        ctrl.find(data.id);
        $("#user-modal").modal("show");
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



      ctrl.createUser = function () {
        UserService.create(ctrl.user).then(
          function success(response) {
            console.log(response)
            $rootScope.$broadcast("Update::List::User");
            ctrl.closeModal();
          },
          function error(response) {
            ctrl.error = response.data.error;
          }
        );
      };

      ctrl.updateUser = function () {
        UserService.update(ctrl.user).then(
          function success(response) {
            if (response.status == 200) {
              $rootScope.$broadcast("Update::List::User");
              ctrl.closeModal();
            }
          },
          function error(response) { }
        );
      };

      ctrl.closeModal = function () {
        ctrl.user = {};
        $("#user-modal").modal("hide");
      };
    },
  ],
});
