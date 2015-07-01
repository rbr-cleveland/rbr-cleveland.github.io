(function() {

  var rbrEnrollment;

  rbrEnrollment = angular.module('rbrEnrollment', ['ui.router']);


  rbrEnrollment.factory('account', function() {
    return {
      type: 'residential'
    };
  });

  rbrEnrollment.value('mapItem', {
    residential: 'geoms/residential.json',
    commercial: 'geoms/commercial.json'
  });

  rbrEnrollment.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/type");

    // Now set up the states
    $stateProvider
    // .state('enrollment', {
    //   url: "/enrollment",
    //   template: "<div ui-view></div>",
    //   abstract: true,
    //   contoller: function($rootScope) {
    //     $rootScope.account = {};
    //     $rootScope.account = $rootScope.account || {};
    //     $state.go("enrollment.type");
    //   }
    // })
      .state('enrollmentType', {
        url: "/type",
        templateUrl: "partials/enrollment-type.html",
        controller: function($scope, account) {
          $scope.account = account;
          $scope.account.type = 'residential';
        }
      })
      .state('enrollmentAddress', {
        url: "/address",
        templateUrl: "partials/enrollment-address.html",
        controller: function($scope, account, rbrServiceArea, $state) {
          $scope.account = account;
          $scope.account.address = $scope.account.address || {
            street1: "",
            street2: "",
            city: "",
            state: "OH",
            zip: ""
          };

          var inServiceArea = false;

          $scope.isInServiceArea = function isInServiceArea() {
            inServiceArea = rbrServiceArea.detect($scope.account.address, $scope.account.type);
            console.log(inServiceArea);
            if (inServiceArea) {
              $state.go('enrollmentSuccess');
            } else {
              $state.go('enrollmentNotify');
            }
          }

        }
      })
      .state('enrollmentSuccess', {
        url: "/success",
        templateUrl: "partials/enrollment-success.html",
        controller: function($scope, account) {
          $scope.account = account;

        }
      })
      .state('enrollmentNotify', {
        url: "/notify",
        templateUrl: "partials/enrollment-notify.html",
        controller: function($scope, account) {
          $scope.account = account;

        }
      })
      .state('enrollmentFinished', {
        url: "/finished",
        templateUrl: "partials/enrollment-finished.html",
        controller: function($scope, account) {
          $scope.account = account;

        }
      });
  }]);

  rbrEnrollment.factory('rbrServiceArea', ['$http', '$q', function($http, $q) {
    var self = this;

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

    var methods = {
      geocode: function geocode(addressString) {
        var geocoder = new google.maps.Geocoder();
        var latLngResult = {};

        geocoder.geocode({
          'address': addressString
        }, function geocodeAddress(results, status) {

          if (status == google.maps.GeocoderStatus.OK) {
            if (results) {
              result['lat'] = results[0].geometry.location.F;
              result['lng'] = results[0].geometry.location.A;

              var found = true;
              latLngResult = result;
            } else {
              console.log('Location not found');
            }
          } else {
            console.log('Geocoder failed due to: ' + status);
          }
        });
        return latLngResult;
      },




      geomCalc: function geomCalc(latLng) {

        return $q(function(resolve, reject) {

          // Load a GeoJSON from the same server as our demo.
          $http.get('http://127.0.0.1:4000/geoms/commercial.json').then(function(res, err) {

            if (res.status == 200) {


              var point = [latLng['lat'], latLng['lng']];
              var polygon = res.data.features[0].geometry.coordinates[0];
              var isInPolygon = pointInPolygon(point, polygon);
              console.log(isInPolygon);

              resolve(isInPolygon);
            } else {
              reject(err);
            }
          });
        });
      },


      detect: function detect(addressObj, customerType) {

        var addressWithoutLine2 = angular.copy(addressObj);

        delete addressWithoutLine2.street2;

        var addressString = Object.keys(addressWithoutLine2).map(function(key) {
          return addressWithoutLine2[key]
        }).join(" ");

        var latLngResult = this.geocode(addressString);
        var isInPolygon = this.geomCalc(latLngResult);
        var subscriberInServiceArea = false;

        isInPolygon.then(function(result, err) {
          if (result){
            subscriberInServiceArea = result;
          }
          else {
            console.log('fail!');
          }

        });

        return subscriberInServiceArea;
      }
    }

    return methods;
  }]);

  // rbrEnrollment.service('rbrCustomerData', [function(){

  // }]);

  return rbrEnrollment;

})();
