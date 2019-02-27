/* global angular */
(function() {
  window.app = angular.module('myApp', [])
    .config(['rateServiceProvider', function(rateServiceProvider) {
      rateServiceProvider.setURL('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
    }]);
  // .run(function(injectables) { // services & constants
  //   // do initialization
  // });
})();