'use strict';

angular.
  module('component').
  component('navigation', {
    templateUrl: 'components/navigation/navigation.template.html',
    controller: [
      '$scope',
      '$rootScope',
      'NotificationService',
      'UserService',
      'Constant',
      '$route',
      function NavigationController($scope,
        $rootScope,
        NotificationService, 
        UserService,
        Constant,
        $route) {
        var ctrl = this;
        ctrl.user = {"full_name" : "Admin"};
        ctrl.notifications = [];
        ctrl.isLogin;
        ctrl.Constant = Constant;
        ctrl.modalType = Constant.TransactionModalType;
        ctrl.otp = '';
        ctrl.route = $route;
        ctrl.isCurrentLanguage = true;
        ctrl.currentLanguage;
        $scope.$on('Route::change', function() {
          console.log("Route::change");
          ctrl.isLogin = UserService.authenticate();
        });
        // ctrl.isSuperAdmin = localStorage.getItem('user_type_id') == ctrl.Constant.UserType.SUPER_ADMIN ? true : false;
        ctrl.$onInit = function () {
          ctrl.changeLanguage();
          $rootScope.$broadcast("Language::Change")
          // setInterval(function(){
            ctrl.getNotification();
          // }, 1000);
        }

        

        ctrl.$postLink = function(){
          ctrl.isLogin = UserService.authenticate();
        }

        ctrl.getNotification = function(){
          NotificationService.getUserNotification().then(
            function success(response){
              console.log(response.data);
              ctrl.notifications = response.data.notification;
            },
            function error(response){

            }
          )
        }

        ctrl.changeLanguage = function (){
          console.log(ctrl.currentLanguage)
          if(ctrl.isCurrentLanguage == true){
            ctrl.currentLanguage = 'es';
            localStorage.setItem("currentLanguage", 'es')
            $rootScope.$broadcast("Language::Change")
          }else{
            ctrl.currentLanguage = 'en';
            localStorage.setItem("currentLanguage", 'en')
            $rootScope.$broadcast("Language::Change")
          }
        }

        ctrl.markAsRead = function(){
          NotificationService.markAsRead().then(
            function success(response){
              console.log(response.data);
              ctrl.getNotification();
            },
            function error(response){

            }
          )
        }
        
        ctrl.$onChanges = function () {
          ctrl.isLogin = UserService.authenticate();
        }
        
        ctrl.findTransactionUsingOtp = function (){
          $rootScope.$broadcast("Transaction:ShowCompleteModal", {otp: ctrl.otp, modalType: ctrl.modalType.TOBECOMPLETED});
        }

        $scope.$on('UserService:login', function(){
          // ctrl.isSuperAdmin = localStorage.getItem('user_type_id') == ctrl.Constant.UserType.SUPER_ADMIN ? true : false;
          ctrl.isLogin = UserService.authenticate();
          ctrl.user.full_name = localStorage.getItem('full_name');
        })
      }

      
    ]
  });