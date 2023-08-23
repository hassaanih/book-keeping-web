"use strict";

angular.module("myApp").config([
  "$routeProvider",
  "$httpProvider",
  "$windowProvider",
  function ($routeProvider, $httpProvider, $windowProvider) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      iconColor: 'white',
      customClass: {
        popup: 'colored-toast'
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
    })

    // set router
    $routeProvider
      .when("/auth/:action", { template: "<auth></auth>" , active: 'login'})
      .when("/pages", { template: "<page-list></page-list>" })
      .when("/dashboard", { template: "<dashboard></dashboard>", active: 'dashboard' })
      .when("/transaction", { template: "<transaction></transaction>", active: 'transaction' })
      .when("/user", { template: "<user></user>", active: 'agent' })
      // .when("/lookupcountrylist", { template: "<lookup-country-list></lookup-country-list>" })
      // .when("/lookupstatelist", { template: "<lookup-state-list></lookup-state-list>" })
      // .when("/lookupcitylist", { template: "<lookup-city-list></lookup-city-list>" })
      // .when("/configurationlist", { template: "<configuration-list></configuration-list>" })
      // .when("/user/customer", { template: "<user-customer></user-customer>" })
      // .when("/user/kitchen", { template: "<user-kitchen></user-kitchen>" })
      // .when("/user/sales", { template: "<user-sales></user-sales>" })
      // .when("/product", { template: "<product></product>" })
      // .when("/productcategory/list", { template: "<product-category></product-category>" })
      // .when("/productpackagecategory/list", { template: "<product-package-category></product-package-category>" })
      // .when("/productquotationcategory/list", { template: "<product-quotation-category></product-quotation-category>" })
      // .when("/package/list", { template: "<package></package>" })
      // .when("/coupon", { template: "<coupon></coupon>" })
      // .when("/quotation", { template: "<quotation></quotation>" })
      // .when("/order", { template: "<order></order>" })
      // .when("/faqs", { template: "<faq-list></faq-list>" })
      // .when("/settinglist", { template: "<setting-list></setting-list>" })
      .otherwise("/auth/signin");

    // request interceptor
    var $window = $windowProvider.$get();
    $httpProvider.interceptors.push(function ($q) {
      return {
        request: function (config) {
          // add authorize header
          if (localStorage.getItem("auth_token")) {
            config.headers.Authorization = 'Bearer ' +
              localStorage.getItem("auth_token");
          }
          return config;
        },
        requestError: function (config) {
          //console.log(config.headers);
          return config;
        },
        response: function (response) {
          //console.log(response);
          return response;
        },
        responseError: function (response) {
          //console.log(response);
          if (response.status == 401) {
            localStorage.removeItem("auth_token");
            $window.location.href = "#!/auth/signin";
          }

          if (response.status == 403) {
            //appAlert('', 'You are not allow to access this resource. contact adminitrator.', 'error');
          }

          if(response.status == -1){
            Toast.fire({
              icon: 'warning',
              title: 'No Internet Connection'
            });
          }
          return $q.reject(response);
        },
      };
    });
  },
]).run(function ($rootScope, $window, APP_URL) {
  $rootScope.$on("$routeChangeStart", function (event, next, current) {
    $rootScope.$broadcast("Route::change");
  });
})
