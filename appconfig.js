(function() {

  var rbrEnrollmentConfig;

  rbrEnrollmentConfig = angular.module('rbrEnrollmentConfig');

  rbrEnrollmentConfig.value('mapItems', {
    residential: '/geoms/residential.json',
    commercial: '/geoms/commercial.json'
  });

  rbrEnrollmentConfig.value('enrollmentEnabled', {
    residential: false,
    commercial: true
  });

  rbrEnrollmentConfig.value('messageStrings', {
    addressHeaderResidential: "I Live at:",
    addressHeaderCommercial: "My business is at:",
    thankYou: "Thank you for your interest in our services!",
    noNewResidentialCustomers: "Unfortuantely, due to high demand we are no longer accepting new residential customers.",
    notInOurServiceRegionCommericial: "Unfortunately, your business is not in our service area.",
    notInOurServiceRegionResidential: "Unfortunetly, your home is not currently in our service area.",
    signUpBelow: "Please sign up below and we will notify you once we can provide our service to you!",

  });

  return rbrEnrollmentConfig;
})();
