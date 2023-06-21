'use strict';

angular.
  module('component').
  component('navigation', {
    templateUrl: 'components/navigation/navigation.template.html',
    controller: [
      '$scope',
      // 'NotificationService',
      'Constant',
      function NavigationController($scope,
        // NotificationService, 
        Constant) {
        var ctrl = this;
        ctrl.user = {"full_name" : "Admin"};
        ctrl.notifications = [];
        ctrl.Constant = Constant;
        ctrl.isSuperAdmin = localStorage.getItem('user_type_id') == ctrl.Constant.UserType.SUPER_ADMIN ? true : false;
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
        
        ctrl.$onChanges = function () {
          ctrl.user.full_name = localStorage.getItem('full_name');
        }
        
        ctrl.isLogin = function (settings) {
          return localStorage.getItem('auth_token')!=undefined;
        }

        $scope.$on('UserService:login', function(){
          ctrl.isSuperAdmin = localStorage.getItem('user_type_id') == ctrl.Constant.UserType.SUPER_ADMIN ? true : false;
          ctrl.user.full_name = localStorage.getItem('full_name');
        })
      }

      
    ]
  });