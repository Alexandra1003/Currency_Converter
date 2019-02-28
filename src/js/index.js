/* global angular */
(function() {
  window.app = angular.module('myApp', ['ui.router'])
    .config(['rateServiceProvider', '$stateProvider', function(rateServiceProvider, $stateProvider) {
      rateServiceProvider.setURL('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');

      $stateProvider
        .state({
          name: 'home',
          url: '/',
          template: '<h3>Welcome to this app!</h3>'
        })
        .state({
          name: 'about',
          url: '/about',
          template: '<h3>This page is about us</h3>'
        })
        .state({
          name: 'currConverterState',
          url: '/currencyConverter',
          templateUrl: 'js/components/currencyComponent/currency-component.html',
          controller: 'CurrencyController',
          resolve: {
            currencyList: rateService => {
              return rateService.getRateList();
            }
          }
        });
    }])

    .run(['$rootScope', '$window', function($rootScope, $window) {
      $rootScope.connectionStatus = navigator.onLine;

      $window.addEventListener('offline', function() {
        $rootScope.$applyAsync(function() {
          $rootScope.connectionStatus = false;
        });
      });

      $window.addEventListener('online', function() {
        $rootScope.$applyAsync(function() {
          $rootScope.connectionStatus = true;
        });
      });
    }]);
})();