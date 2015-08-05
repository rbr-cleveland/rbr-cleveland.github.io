(function() {

  var rbrEnrollment;

  rbrEnrollment = angular.module('rbrEnrollment', ['ui.router', 'ngAnimate', 'anim-in-out', 'ui.bootstrap.showErrors', 'LocalStorageModule', 'ngMask']);

  rbrEnrollment.value('serverUrl', "https://rbr-backend.herokuapp.com/api/new-account/");

  rbrEnrollment.value('mapItems', {
    residential: '/geoms/residential.json',
    commercial: '/geoms/commercial.json'
  });

  rbrEnrollment.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('rbr-account')
      .setStorageType('sessionStorage')
      .setNotify(true, true)
  });

  rbrEnrollment.value('messageStrings', {
    {% for message in site.data.enrollment.messages %}
      {{message.key}} : "{{message.text}}",
    {% endfor %}
  });

  rbrEnrollment.value('subscriberTypes', {{site.data.enrollment.options | jsonify}})

  rbrEnrollment.factory('account', function(localStorageService) {

    var defaultAccount = {
      type: 'residential',
      eligible: false,
      inServiceArea: false,
      status: false,
      firstname: "",
      lastname: "",
      company: null,
      email: ""
    };

    return {
      set: function(val) {
        localStorageService.set('account', val);
      },
      get: function() {
        var account = localStorageService.get('account');
        if (!account){
          account = defaultAccount;
        }
        return account;
      },
      clear: function() {
        localStorageService.remove('account');
      }
    };
  });

  rbrEnrollment.config(['showErrorsConfigProvider', function(showErrorsConfigProvider) {
    showErrorsConfigProvider.showSuccess(true);
  }]);

  rbrEnrollment.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    // // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/");

    // $locationProvider.html5Mode(true);

    // Now set up the states
    $stateProvider

      .state('enrollmentType', {
        url: "/",
        templateUrl: "/partials/enrollment-type.html",
        controller: function($scope, account, $state, messageStrings, subscriberTypes, subscriberType) {
          $scope.account = account.get();
          $scope.typeOpts = [];
          angular.forEach(subscriberTypes, function(type, key){
            this.push({value: key, type: type.label})
          }, $scope.typeOpts)
          console.log($scope.typeOpts);

          $scope.messageStrings = messageStrings;

          $scope.typeSubmit = function(isValid) {
            if (isValid){
              account.set($scope.account);
              subscriberType.isEnabled($scope.account.type) ? $state.go('enrollmentAddress') : $state.go('enrollmentNotify', { reason: "enrollment-disabled" });
            }
          }
        }
      })
      .state('enrollmentAddress', {
        url: "/address",
        templateUrl: "/partials/enrollment-address.html",
        controller: function($scope, account, rbrServiceArea, $state, messageStrings, subscriberType) {
          $scope.account = account.get();
          $scope.messageStrings = messageStrings;
          $scope.$broadcast('show-errors-check-validity');
          if(!subscriberType.isEnabled($scope.account.type)) {
            $state.go('enrollmentNotify')
          }
          $scope.account.address = $scope.account.address || {
            street1: "",
            street2: "",
            city: "",
            state: "OH",
            zip: ""
          };
          $scope.subscriberInServiceArea = false;

          $scope.isInServiceArea = function isInServiceArea(isValid) {
            if (isValid){
              var detectServiceArea = rbrServiceArea.detect($scope.account.address, $scope.account.type);
              detectServiceArea.then(function(result) {
                $scope.account.inServiceArea = result;
                // Now
                if ($scope.account.inServiceArea) {
                  $scope.account.eligible = true;
                  account.set($scope.account);
                  $state.go('enrollmentSuccess')
                } else {
                  $state.go('enrollmentNotify', {
                    reason: "not-in-service-area"
                  });
                }
              })
            }
          };
        }
      })
      .state('enrollmentSuccess', {
        url: "/success",
        templateUrl: "/partials/enrollment-success.html",
        controller: function($scope, account, rbrCustomerData, messageStrings, $state) {
          $scope.account = account.get();
          $scope.messageStrings = messageStrings;
          $scope.isWaiting = false;
          $scope.submitAccount = function(){
            $scope.isWaiting = true;
            var submit = rbrCustomerData.submit($scope.account);

            submit.then(function(result){
              $scope.isWaiting = false;
              $scope.status = result;
              console.log(result);
              account.set($scope.account);
              $state.go('enrollmentFinished');
            }), function(reason){
              $scope.isWaiting = false;
              $scope.status = reason;
              console.log(reason);
            }
          }
        }
      })
      .state('enrollmentNotify', {
        url: "/notify/:reason",
        templateUrl: "/partials/enrollment-notify.html",
        controller: function($scope, account, messageStrings, $stateParams, rbrCustomerData, $state) {
          $scope.account = account.get();
          $scope.$broadcast('show-errors-check-validity');
          $scope.isWaiting = false;
          $scope.reason = $stateParams.reason;
          $scope.messageStrings = messageStrings;

          $scope.signUpForUpdates = function(){
            $scope.isWaiting = true;
            var submit = rbrCustomerData.submit($scope.account);

            submit.then(function(result){
              $scope.isWaiting = false;
              $scope.status = result;
              console.log(result);
              account.set($scope.account);
              $state.go('enrollmentFinished');
            }), function(reason){
              $scope.isWaiting = false;
              $scope.status = reason;
              console.log(reason);
            }
          }
          // This screen means that the user is not eligible to become a subcriber
          // So we have to figure out why and send them the message.

        }
      })
      .state('enrollmentFinished', {
        url: "/finished",
        templateUrl: "/partials/enrollment-finished.html",
        controller: function($scope, account, messageStrings) {
          $scope.account = account.get();
          $scope.messageStrings = messageStrings;
        }
      });
  }]).run(function($rootScope, $http, serverUrl){
    $rootScope.$on('$stateChangeSuccess', function() {
       document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
    $http.get("https://rbr-backend.herokuapp.com/api/awake");
  });

  rbrEnrollment.factory('rbrServiceArea', ['$http', '$q', 'mapItems', function($http, $q, mapItems) {

    var pointInPolygon = function pointInPolygon(point, polygon) {
      // ray-casting algorithm based on
      // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

      var x = point[0],
        y = point[1];

      var inside = false;
      for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        var xi = polygon[i][0],
          yi = polygon[i][1];
        var xj = polygon[j][0],
          yj = polygon[j][1];

        var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
      }

      return inside;
    };

    var geomCalc = function geomCalc(latLng, customerType) {

      return $q(function(resolve, reject) {

        geomUrl = customerType == 'residential' ? mapItems.residential : mapItems.commercial;

        // Load a GeoJSON from the same server as our demo.
        $http.get(geomUrl).then(function(res, err) {

          if (res.status == 200) {

            var point = [latLng['lat'], latLng['lng']];
            var polygon = res.data.features[0].geometry.coordinates[0];
            var isInPolygon = pointInPolygon(point, polygon);

            resolve(isInPolygon);
          } else {
            reject(err);
          }
        });
      });
    };

    var geocode = function geocode(addressString) {
      var geocoder = new google.maps.Geocoder();
      var result = {};
      return $q(function(resolve, reject) {
        geocoder.geocode({
          'address': addressString
        }, function geocodeAddress(results, status) {

          if (status == google.maps.GeocoderStatus.OK) {
            if (results) {
              result['lat'] = results[0].geometry.location.F;
              result['lng'] = results[0].geometry.location.A;
              var found = true;
              resolve(result);
            } else {
              console.log('Location not found');
              reject(results);
            }
          } else {
            console.log('Geocoder failed due to: ' + status);
            reject(status);
          }
        });
      });
    };

    var methods = {

      detect: function detect(addressObj, customerType) {
        return $q(function(resolve, reject) {
          var addressWithoutLine2 = angular.copy(addressObj);

          delete addressWithoutLine2.street2;

          var addressString = Object.keys(addressWithoutLine2).map(function(key) {
            return addressWithoutLine2[key]
          }).join(" ");

          var getLatLng = geocode(addressString);

          var subscriberInServiceArea = false;

          var latLngResult = {};

          getLatLng.then(function(result)   {
            if (result) {
              var isInPolygon = geomCalc(result, customerType);

              isInPolygon.then(function(result) {
                console.log(result);
                resolve(result);
              });
            }
          });
        });
      }
    }

    return methods;
  }]);

  rbrEnrollment.service('rbrCustomerData', ['$http', '$q', 'serverUrl', function($http, $q, serverUrl) {
    return {
      submit: function(account){
        return $q(function(resolve, reject){
          $http.post(serverUrl, account)

          .success(function(data, status, headers, config){
            resolve(data);
          })
          .error(function(data, status, headers, config){
            reject(data);
          })
        });


      }
    }

  }]);

  rbrEnrollment.service('subscriberType', ["subscriberTypes", function (subscriberTypes) {
    return {
      isEnabled: function isEnabled(type){
        return subscriberTypes[type].enabled;
      }
    }
  }])

   rbrEnrollment.directive('bindHtmlCompile', ['$compile', function ($compile) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch(function () {
                    return scope.$eval(attrs.bindHtmlCompile);
                }, function (value) {
                    element.html(value);
                    $compile(element.contents())(scope);
                });
            }
        };
    }]);

  return rbrEnrollment;

})();
