"use strict";

// Define the `myApp` module
var appz = angular.module("myApp", [
  "ngSanitize",
  "ngRoute",
  "core",
  "component",
  "ui.select",
  "angularjs-dropdown-multiselect",
]);

appz.constant("APP_URL", config.APP_URL);
appz.constant("API_URL", config.API_URL);
appz.constant("ASSET_URL", config.ASSET_URL);
appz.constant("STORAGE_URL", config.STORAGE_URL);
appz.constant("NO_PHOTO", config.NO_PHOTO);

appz.constant("Constant", {
  TransactionModalType: {
    TOBEUPDATED: 1,
    TOBECREATED: 2,
    TOBECOMPLETED: 3,
    TOBEREJECTED: 4,
  },
  UserType: {
    MANAGER: "manager",
    AGENT: "agent",
  },
  TransactionStatus: {
    PENDING_FOR_APPROVAL: "Pending for Approval",
    APPROVED: "Approved",
    COMPLETED: "Completed",
    REJECTED: "Rejected",
  },
});

appz.filter("propsFilter", function () {
  return function (items, props) {
    var out = [];

    if (angular.isArray(items)) {
      var keys = Object.keys(props);

      items.forEach(function (item) {
        var itemMatches = false;

        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          console.log(item[prop]);
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

appz.filter("zpad", function () {
  return function (input, n) {
    if (input === undefined) input = "";
    if (input.length >= n) return input;
    var zeros = "0".repeat(n);
    return (zeros + input).slice(-1 * n);
  };
});

function getComponentScope(componentName) {
  return angular
    .element(document.getElementById("sharedComponents"))
    .find(componentName)
    .isolateScope().$ctrl;
}

function getScope(elemId) {
  return angular.element(document.getElementById(elemId)).scope().$ctrl;
}

function appAlert(message){
  return Snackbar.show({ 
    showAction: false, 
    text: message,
    pos: 'top-right',
    backgroundColor: 'red'
  });
}

appz.filter("assetURL", function (ASSET_URL) {
  return function (uri, settings) {
    if (settings.showNoPhoto == true) return uri ? ASSET_URL + uri : NO_PHOTO;
    else return uri ? ASSET_URL + uri : null;
  };
});

appz.directive("dateField", function ($filter) {
  return {
    require: "ngModel",
    link: function (scope, element, attrs, ngModelController) {
      ngModelController.$parsers.push(function (data) {
        //View -> Model
        console.log(data);
        var date = moment(data, "YYYY-MM-DD", true);

        ngModelController.$setValidity("date", date.isValid());
        return date.isValid() ? date.toDate() : undefined;
      });
      ngModelController.$formatters.push(function (data) {
        //Model -> View
        return $filter("date")(data, "yyyy-MM-dd");
      });
    },
  };
});

appz.directive("translateLanguage", function () {
  return {
    restrict: "A",
    scope: {
      key: "@translateLanguage",
    },
    link: function (scope, element, attrs) {
      var translations = {
        en: {
          "hello": "Hello",
          "welcome": "Welcome",
          "Current Balance in currencies": "Current Balance in currencies",
          "transaction": "Transaction",
          "Pending For Approval": "Pending For Approval",
          "Approved": "Approved",
          "Rejected": "Rejected",
          "Completed": "Completed",
          "Currency Id": "Currency Id",
          "Currency Name": "Currency Name",
          "Balance": "Balance",
          "Sign Out": "Sign Out",
          "Dashboard": "Dashboard",
          "Transaction": "Transaction",
          "Agents": "Agents",
          "User": "User",
          "Name": "Name",
          "User Type": "User Type",
          "Email": "Email",
          "Password": "Password",
          "Phone Number": "Phone Number",
          "Assigned Balance": "Assigned Balance",
          "Users": "Users",
          "Add User": "Add User",
          "Credit": "Credit",
          "Currency": "Currency",
          "Add credit": "Add credit",
          "Converted Amount": "Converted Amount",
          "Status": "Status",
          "Manager": "Manager",
          "Target Currency": "Target Currency",
          "Receiving Currency": "Receiving Currency",
          "OTP": "OTP",
          "Total Balance": "Total Balance",
          "Initiator Name": "Initiator Name",
          "All": "All",
          "Completed": "Completed",
          "Rejected": "Rejected",
          "Pending": "Pending",
          "Approved": "Approved",
          "Search Using OTP": "Search Using OTP",
          "New transaction": "New transaction",
          "Initiator Name": "Initiator Name",
          "Total Balance": "Total Balance",
          "Converted Amount": "Converted Amount",
          "Reason to Reject": "Reason to Reject"
        },
        es: {
          "hello": "Hola",
          "welcome": "Bienvenu",
          "Current Balance in currencies": "Solde courant en devises",
          "transaction": "transaction",
          "Pending For Approval": "En attente d'approbation",
          "Approved": "Approuvé",
          "Rejected": "Rejeté",
          "Completed": "Terminé",
          "Currency Id": "Identifiant de la devise",
          "Currency Name": "Nom de la devise",
          "Balance": "Solde",
          "Sign Out": "Déconnexion",
          "Dashboard": "Tableau de bord",
          "Transaction": "Transaction",
          "Agents": "Agents",
          "User": "Utilisateur",
          "Name": "Nom",
          "User Type": "Type d'utilisateur",
          "Email": "Email",
          "Password": "Mot de passe",
          "Phone Number": "Numéro de téléphone",
          "Assigned Balance": "Solde attribué",
          "Users": "Utilisateurs",
          "Add User": "Ajouter un utilisateur",
          "Credit": "Crédit",
          "Currency": "Devise",
          "Add credit": "Ajouter du crédit",
          "Converted Amount": "Montant converti",
          "Status": "Statut",
          "Manager": "Responsable",
          "Target Currency": "Devise cible",
          "Receiving Currency": "Devise de réception",
          "OTP": "OTP",
          "Total Balance": "Solde total",
          "Initiator Name": "Nom de l'initiateur",
          "All": "Tous",
          "Completed": "Terminé",
          "Rejected": "Rejeté",
          "Pending": "En attente",
          "Approved": "Approuvé",
          "Search Using OTP": "Rechercher en utilisant l'OTP",
          "New transaction": "Nouvelle transaction",
          "Initiator Name": "Nom de l'initiateur",
          "Total Balance": "Solde total",
          "Converted Amount": "Montant converti",
          "Reason to Reject": "Raison du rejet",
        },
        // Add more languages and translations here
      };
      let language = 'en';
      function translateText() {
        var translation = translations[language][scope.key];
        if (translation) {
          element.text(translation);
        } else {
          // Fallback to English if translation is missing for the selected language
          element.text(translations[language][scope.key]);
        }
      }

      // Watch for changes in the current language and update the translation accordingly
      scope.$on("Language::Change", function(){
        language = localStorage.getItem("currentLanguage");
        translateText();
      })

      // Initial translation
      translateText();
    },
  };
});

appz.filter("storageURL", function (STORAGE_URL) {
  return function (uri, settings) {
    console.log(STORAGE_URL);
    if (settings.showNoPhoto == true) return uri ? STORAGE_URL + uri : NO_PHOTO;
    else return uri ? STORAGE_URL + uri : null;
  };
});

appz.directive("fileModel", [
  "$parse",
  "$http",
  "API_URL",
  function ($parse, $http, API_URL) {
    return {
      restrict: "A",
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
        let $showCropper = attrs.showCropper == "true";

        element.bind("change", function () {
          if ($showCropper) {
            // initialize modal
            if (!$modal) {
              $modal = $("#modalCropper");

              /* $cropper.getCroppedCanvas({
              width: 160,
              height: 90,
              minWidth: 100,
              minHeight: 100,
              fillColor: '#fff',
              imageSmoothingEnabled: false,
              imageSmoothingQuality: 'high',
            }); */

              $modal.find("#btn-save").click(function () {
                $cropper.getCroppedCanvas().toBlob((blob) => {
                  uploadBlob(blob);
                });
              });

              $modal.find("#btn-skip").click(function () {
                $modal.modal("hide");
              });
            }

            // initialize cropper
            if (!$cropper) {
              let $image = $("#cropFramePhoto");
              // console.log($image);

              $image.cropper({
                aspectRatio: 1,
                ready() {
                  this.cropper.getCroppedCanvas().toBlob((blob) => {
                    console.log("cropper.ready() called.");
                  });
                },
              });

              $cropper = $image.data("cropper");
            }
          }

          if (element[0].files) {
            let file = element[0].files[0];

            let extension = ["png", "jpeg", "jpg"];

            if (
              $showCropper &&
              extension.indexOf(file.name.split(".").pop()) != -1
            ) {
              showCropperEditor(file);
            } else {
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
                  $modal.modal("show");

                  /* 
                console.log(objImage);
                
                // if low resoulation image, show modal window having cancel or continue upload button
                if (objImage.width < 1000 || objImage.height < 1000) {
                }
                */
                };
              };

              // called file reader
              reader.readAsDataURL(file);
            }

            function uploadBlob(blob) {
              let fd = new FormData();
              fd.append(name, blob);

              // uploadStatus.style.display = "flex";
              $modal.modal("hide");

              $http({
                method: "POST",
                url: API_URL + uploadUri,
                data: fd,
                headers: { "Content-Type": undefined },
                uploadEventHandlers: {
                  progress: function (e) {
                    if (e.lengthComputable) {
                      let uploadImagePercent = parseInt(
                        (e.loaded * 100) / e.total
                      );
                      // uploadStatus.innerHTML = uploadImagePercent + '%';
                    }
                  },
                },
              }).then(
                function success(response) {
                  $modal.modal("hide");
                  // uploadStatus.style.display = "none";
                  onUploadSuccessHandler(response);
                },
                function error(response) {
                  $modal.modal("hide");
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
                headers: { "Content-Type": undefined },
                uploadEventHandlers: {
                  progress: function (e) {
                    if (e.lengthComputable) {
                      let uploadImagePercent = parseInt(
                        (e.loaded * 100) / e.total
                      );
                      // uploadStatus.innerHTML = uploadImagePercent + '%';
                    }
                  },
                },
              }).then(
                function success(response) {
                  // uploadStatus.style.display = "none";
                  element[0].value = "";
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
      },
    };
  },
]);

appz.directive("fileVideoModel", [
  "$parse",
  "$http",
  "API_URL",
  function ($parse, $http, API_URL) {
    return {
      restrict: "A",
      link: function (scope, element, attrs) {
        let name = attrs.name;
        let uploadStatus = document.getElementById(attrs.uploadStatusElement);
        let uploadUri = attrs.uploadUri;
        let model = $parse(attrs.fileResumeModel);
        let modelSetter = model.assign;
        let onUploadSuccessHandler = scope.$eval(attrs.onUploadSuccess);
        let onUploadFailureHandler = scope.$eval(attrs.onUploadFailure);

        element.bind("change", function () {
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
                headers: { "Content-Type": undefined },
                uploadEventHandlers: {
                  progress: function (e) {
                    if (e.lengthComputable) {
                      let uploadImagePercent = parseInt(
                        (e.loaded * 100) / e.total
                      );
                      uploadStatus.innerHTML = uploadImagePercent + "%";
                    }
                  },
                },
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
      },
    };
  },
]);


