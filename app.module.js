'use strict';

// Define the `myApp` module
var appz = angular.module('myApp', [
  'ngSanitize',
  'ngRoute',
  'core',
  'auth',
  'navigation',
  'dashboard',
  
  'ui.select',
  'angularjs-dropdown-multiselect',
]);


appz.constant('APP_URL', config.APP_URL);
appz.constant('API_URL', config.API_URL);
appz.constant('ASSET_URL', config.ASSET_URL);
appz.constant('STORAGE_URL', config.STORAGE_URL);
appz.constant('NO_PHOTO', config.NO_PHOTO);

appz.constant('Constant', {
  ProductType: {
    PRODUCT: 1,
    PACKAGE: 2,
    QUOTATION: 3
  },
  OrderType: {
    DIRECT: 1,
    CUSTOM: 2
  },
  UserType: {
    SUPER_ADMIN: 1,
    SALES: 2,
    KITCHEN: 3,
    CUSTOMER: 4
  },
  DeliveryMethod: {
    PICK_UP: 1,
    DELIVERY: 2,
  },
  Order_Status: {
    ORDER_ALL: -1,
    ORDER_PENDING: 1,
    ORDER_INPROGRESS: 2,
    ORDER_DELIVERED: 3,
    ORDER_CANCELLED: 4,
    ORDER_REFUNDED: 5
  },
  Quotation_Status: {
    QUOTATION_ALL: -1,
    QUOTATION_PENDING: 1,
    QUOTATION_AT_SALES: 2,
    QUOTATION_AT_KITCHEN: 3,
    PAYMENT_PENDING: 4,
    COMPLETED: 5,
    CANCELLED: 6,
  },
  PaymentMethod: [
    { name: "Alfa Pay", value: "1" },
    { name: "Bank Transfer", value: "2" },
    { name: "Cash", value: "3" },
  ],
  BankNames: [
    { name: "Alfalah Bank", value: "1" },
    { name: "Askari Bank", value: "2" },
    { name: "UBL", value: "3" },
  ]
});

appz.filter('propsFilter', function () {
  return function (items, props) {
    var out = [];

    if (angular.isArray(items)) {
      var keys = Object.keys(props);

      items.forEach(function (item) {
        var itemMatches = false;

        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          console.log(item[prop])
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  };
});

appz.filter('zpad', function () {
  return function (input, n) {
    if (input === undefined)
      input = ""
    if (input.length >= n)
      return input
    var zeros = "0".repeat(n);
    return (zeros + input).slice(-1 * n)
  };
});


function getComponentScope(componentName) {
  return angular.element(document.getElementById('sharedComponents')).find(componentName).isolateScope().$ctrl;
}

function getScope(elemId) {
  return angular.element(document.getElementById(elemId)).scope().$ctrl;
}

appz.filter('assetURL', function (ASSET_URL) {
  return function (uri, settings) {
    if (settings.showNoPhoto == true)
      return uri ? ASSET_URL + uri : NO_PHOTO;
    else
      return uri ? ASSET_URL + uri : null;
  };
});

appz.directive('dateField', function ($filter) {
  return {
    require: 'ngModel',
    link: function (scope, element, attrs, ngModelController) {
      ngModelController.$parsers.push(function (data) {
        //View -> Model
        console.log(data);
        var date = moment(data, 'YYYY-MM-DD', true);

        ngModelController.$setValidity('date', date.isValid());
        return date.isValid() ? date.toDate() : undefined;
      });
      ngModelController.$formatters.push(function (data) {
        //Model -> View
        return $filter('date')(data, "yyyy-MM-dd");
      });
    }
  }
});

appz.filter('storageURL', function (STORAGE_URL) {
  return function (uri, settings) {
    console.log(STORAGE_URL);
    if (settings.showNoPhoto == true)
      return uri ? STORAGE_URL + uri : NO_PHOTO;
    else
      return uri ? STORAGE_URL + uri : null;
  };
});



appz.directive('fileModel', ['$parse', '$http', 'API_URL', function ($parse, $http, API_URL) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      let name = attrs.name;
      // let uploadStatus = document.getElementById(attrs.uploadStatusElement);
      let uploadUri = attrs.uploadUri;
      let model = $parse(attrs.fileModel);
      console.log(model);
      let modelSetter = model.assign;
      let onUploadSuccessHandler = scope.$eval(attrs.onUploadSuccess);
      let onUploadFailureHandler = scope.$eval(attrs.onUploadFailure);
      let $cropper = undefined;
      let $modal = undefined;
      let $showCropper = attrs.showCropper == 'true';


      element.bind('change', function () {
        if ($showCropper) {
          // initialize modal 
          if (!$modal) {
            $modal = $('#modalCropper');

            /* $cropper.getCroppedCanvas({
              width: 160,
              height: 90,
              minWidth: 100,
              minHeight: 100,
              fillColor: '#fff',
              imageSmoothingEnabled: false,
              imageSmoothingQuality: 'high',
            }); */

            $modal.find('#btn-save').click(function () {
              $cropper.getCroppedCanvas().toBlob((blob) => {
                uploadBlob(blob);
              });
            });

            $modal.find('#btn-skip').click(function () {
              $modal.modal('hide');
            });
          }

          // initialize cropper
          if (!$cropper) {
            let $image = $('#cropFramePhoto');
            // console.log($image);

            $image.cropper({
              aspectRatio: 1,
              ready() {
                this.cropper.getCroppedCanvas().toBlob((blob) => {
                  console.log('cropper.ready() called.');
                });
              }
            });

            $cropper = $image.data('cropper');
          }
        }

        if (element[0].files) {
          let file = element[0].files[0];

          let extension = ["png", "jpeg", "jpg"];

          if ($showCropper && extension.indexOf(file.name.split('.').pop()) != -1) {
            showCropperEditor(file);
          }
          else {
            uploadFile(file);
          }

          function showCropperEditor(file) {

            // define file reader
            let reader = new FileReader();
            reader.onload = function (e) {
              // low resulatin image alert
              let objImage = new Image();
              objImage.src = e.target.result;
              objImage.onload = function () {
                $cropper.replace(e.target.result);
                $modal.modal('show');

                /* 
                console.log(objImage);
                
                // if low resoulation image, show modal window having cancel or continue upload button
                if (objImage.width < 1000 || objImage.height < 1000) {
                }
                */
              };
            }

            // called file reader
            reader.readAsDataURL(file);
          }

          function uploadBlob(blob) {

            let fd = new FormData();
            fd.append(name, blob);

            // uploadStatus.style.display = "flex";
            $modal.modal('hide');

            $http({
              method: "POST",
              url: API_URL + uploadUri,
              data: fd,
              headers: { 'Content-Type': undefined },
              uploadEventHandlers: {
                progress: function (e) {
                  if (e.lengthComputable) {
                    let uploadImagePercent = parseInt((e.loaded * 100) / e.total);
                    // uploadStatus.innerHTML = uploadImagePercent + '%';
                  }
                }
              }
            }).then(
              function success(response) {
                $modal.modal('hide');
                // uploadStatus.style.display = "none";
                onUploadSuccessHandler(response);
              },
              function error(response) {
                $modal.modal('hide');
                // uploadStatus.style.display = "none";
                onUploadFailureHandler(response);
              }
            );
          }

          function uploadFile() {

            let fd = new FormData();

            angular.forEach(element[0].files, function (file) {
              fd.append(name, file);
            });

            // uploadStatus.style.display = "flex";

            $http({
              method: "POST",
              url: API_URL + uploadUri,
              data: fd,
              headers: { 'Content-Type': undefined },
              uploadEventHandlers: {
                progress: function (e) {
                  if (e.lengthComputable) {
                    let uploadImagePercent = parseInt((e.loaded * 100) / e.total);
                    // uploadStatus.innerHTML = uploadImagePercent + '%';
                  }
                }
              }
            }).then(
              function success(response) {
                // uploadStatus.style.display = "none";
                element[0].value = '';
                onUploadSuccessHandler(response);
              },
              function error(response) {
                // uploadStatus.style.display = "none";
                onUploadFailureHandler(response);
              }
            );
          }
        }
      });
    }
  };
}]);

appz.directive('fileVideoModel', ['$parse', '$http', 'API_URL', function ($parse, $http, API_URL) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      let name = attrs.name;
      let uploadStatus = document.getElementById(attrs.uploadStatusElement);
      let uploadUri = attrs.uploadUri;
      let model = $parse(attrs.fileResumeModel);
      let modelSetter = model.assign;
      let onUploadSuccessHandler = scope.$eval(attrs.onUploadSuccess);
      let onUploadFailureHandler = scope.$eval(attrs.onUploadFailure);

      element.bind('change', function () {

        if (element[0].files) {
          let file = element[0].files[0];

          uploadFile(file);

          function uploadFile(file) {
            let fd = new FormData();
            // fd.append(name, file);
            angular.forEach(element[0].files, function (file) {
              fd.append(name, file);
            });

            uploadStatus.style.display = "flex";

            $http({
              method: "POST",
              url: API_URL + uploadUri,
              data: fd,
              headers: { 'Content-Type': undefined },
              uploadEventHandlers: {
                progress: function (e) {
                  if (e.lengthComputable) {
                    let uploadImagePercent = parseInt((e.loaded * 100) / e.total);
                    uploadStatus.innerHTML = uploadImagePercent + '%';
                  }
                }
              }
            }).then(
              function success(response) {
                uploadStatus.style.display = "none";
                onUploadSuccessHandler(response);
              },
              function error(response) {
                uploadStatus.style.display = "none";
                onUploadFailureHandler(response);
              }
            );
          }
        }
      });
    }
  };
}]);
