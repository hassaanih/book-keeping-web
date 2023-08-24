"use strict";

angular.module("component").component("auth", {
  templateUrl: "components/auth/auth.template.html",
  controller: [
    "$rootScope",
    "UserService",
    "$location",
    "$routeParams",

    function AuthController(
      $rootScope, 
      UserService, 
      $location, 
      $routeParams) {
      var ctrl = this;
      ctrl.user = {};
      ctrl.errors = {};

      ctrl.$onInit = function () {
        if ($routeParams.action == "logout") ctrl.logout();
      };

      ctrl.init = function (settings) {
        ctrl.settings = settings;
      };

      ctrl.logout = function () {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("full_name");
        localStorage.removeItem("user_type_id");
        localStorage.removeItem("user_type_name");
        UserService.logout().then(
          function successCallback(response) {
            $location.path("/auth/signin");
          },
          function errorCallback(response) {}
        );
      };

      ctrl.login = function () {
        ctrl.errors = {};
        UserService.login(ctrl.user).then(
          function successCallback(response) {
            console.log(response);
              localStorage.setItem("auth_token", response.data.user.access_token);
              localStorage.setItem("full_name", response.data.user.name);
              localStorage.setItem("user_type_id", response.data.user.user_type_id);
              localStorage.setItem("user_id", response.data.user.id);
              localStorage.setItem("currentLanguage", "es");
              // localStorage.setItem("user_type_name", response.data.user.user_type_name);
              $rootScope.$broadcast('UserService:login');
              console.log('$rootScope.$broadcast(UserService:login)');

              window.location.href = config.APP_URL + '#!/dashboard';
          },
          function errorCallback(response) {
            if (response.status == 400) {
              ctrl.errors = response.data.error;
              console.log(ctrl.errors);
            }
            //appAlert('', 'An unexpected error has occured. Please contact site administrator.', 'error');
          }
        );
      };
    },
  ],
});
