(function() {

  var rbrEnrollment;

  rbrEnrollment = angular.module('rbrEnrollment', ['ui.router']);


  rbrEnrollment.factory('account', function(){
        return {};
  });

  rbrEnrollment.value('mapUrl', 'https://www.google.com/maps/d/kml?mid=zpUmN-ASXBHg.kXl1slH5PnU8&nl=1&lid=zpUmN-ASXBHg.kRRbaQBcOYqI&cid=mp&cv=dRW0ciSPPmc.en.');

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
        controller: function($scope, account, rbrServiceArea) {
            $scope.account = account;
            $scope.account.address = $scope.account.address || {};
            $scope.account.address.state = "OH";

            var isInServiceArea = false;

            $scope.isInServiceArea = function isInServiceArea(){
              isInServiceArea = rbrServiceArea.detect($scope.account.address, $scope.account.type);
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
      })
      ;
    }]);

  rbrEnrollment.factory('rbrServiceArea', ['mapUrl', function (mapUrl) {

    return {

      detect: function(addressObj, customerType){
        console.log(mapUrl);
        console.log(addressObj);
        console.log(customerType);

        var chicago = new google.maps.LatLng(41.875696,-87.624207);

        var mapOptions = {
          zoom: 11,
          center: chicago
        }

        var map = new google.maps.Map(document.getElementById('map-canvas', mapOptions));



        var layer = new google.maps.KmlLayer('http://127.0.0.1:4000/geoms/commercial.kml');
        layer.setMap(map);

        console.log(map.data.getFeatureById());

        google.maps.event.addDomListener(window, "load", map);

        var addressString = Object.keys(addressObj).map(function (key) {return addressObj[key]}).join(" ");

        var geocoder = new google.maps.Geocoder();

        var result = [];

        geocoder.geocode({'address': addressString}, function geocodeAddress(results, status){
          if (status == google.maps.GeocoderStatus.OK) {
              if (results) {
                  console.log(results);
                  result['lat'] = results[0].geometry.location.A;
                  result['lng'] = results[0].geometry.location.F;
                  var latLng = new google.maps.LatLng(result['lat'], result['lng']);
                  console.log(latLng);
                  console.log('win', google.maps.geometry.poly.containsLocation(latLng, map));
              } else {
                  console.log('Location not found');
              }
          } else {
              console.log('Geocoder failed due to: ' + status);
          }
        });
        //
        return false;
      }
    }
  }]);

  rbrEnrollment.service('rbrCustomerData', ['', function(){

  }]);

  return rbrEnrollment;

})();
