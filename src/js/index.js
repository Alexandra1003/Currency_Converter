/* eslint-disable */
/* global angular */
(function() {
  window.app = angular.module('myApp', [])
    .config(['rateServiceProvider', function(rateServiceProvider) {
      rateServiceProvider.setURL('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
    }])
    .run(['$rootScope', '$window', function($rootScope, $window) {
      $rootScope.connectionStatus = navigator.onLine;

      $window.addEventListener('offline', function() {
        $rootScope.$apply(function() {
          $rootScope.connectionStatus = false;
        });
      });

      $window.addEventListener('online', function() {
        $rootScope.$apply(function() {
          $rootScope.connectionStatus = true;
        });
      });
    }]);
})();