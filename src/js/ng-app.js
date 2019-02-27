/* global angular */
(function() {
  window.app = angular.module('myApp', [])
    .config(['rateServiceProvider', function(rateServiceProvider) {
      rateServiceProvider.setURL('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
    }])
    .run(['$rootScope', function($rootScope) {
      $rootScope.connectionStatus = navigator.onLine;
    }]);
})();