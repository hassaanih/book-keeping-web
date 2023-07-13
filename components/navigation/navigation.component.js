'use strict';

angular.
  module('component').
  component('navigation', {
    templateUrl: 'components/navigation/navigation.template.html',
    controller: [
      '$scope',
      '$rootScope',
      // 'NotificationService',
      'UserService',
      'Constant',
      function NavigationController($scope,
        $rootScope,
        // NotificationService, 
        UserService,
        Constant) {
        var ctrl = this;
        ctrl.user = {"full_name" : "Admin"};
        ctrl.notifications = [];
        ctrl.isLogin = UserService.authenticate();
        ctrl.Constant = Constant;
        ctrl.modalType = Constant.TransactionModalType;
        ctrl.otp = '';
        $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
          ctrl.isLogin = UserService.authenticate();
        });
        // ctrl.isSuperAdmin = localStorage.getItem('user_type_id') == ctrl.Constant.UserType.SUPER_ADMIN ? true : false;
        ctrl.$onInit = function () {
          // setInterval(function(){
          //   NotificationService.getNotifications().then(
          //     function success(response){
          //       ctrl.notifications = response.data.notification;
          //       console.log(ctrl.notifications)
          //       //BUG:: Audio will not work unless any action is done on browser.
          //       var audioEle = document.createElement("AUDIO")
          //       document.body.appendChild(audioEle);
          //       audioEle.src = 'assets/theme/global/notification-audio/notification.wav';
          //       audioEle.load();
          //       audioEle.play();
          //     },
          //     function error(response){
          //     }
          //     )
          //   }, 5000);
          
                
        }

        ctrl.$postLink = function(){
          ctrl.isLogin = UserService.authenticate();
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