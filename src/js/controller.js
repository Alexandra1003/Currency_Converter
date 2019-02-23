/* eslint-disable no-console */
/* eslint-disable max-params */
/* global angular */

(function() {
  window.app.filter('filterCurrency', [function() {
    return function(array, expression) {
      return array.filter(function(item) {
        return !expression || !angular.equals(item, expression);
      });
    };
  }]);

  window.app.controller('TestController',
    ['$scope', 'apiService', 'CurrencyList', 'CommissionList',
      function($scope, apiService, CurrencyList, CommissionList) {
        $scope.fieldCommission = CommissionList[0];
        $scope.fieldSell = CurrencyList[3];
        $scope.fieldBuy = CurrencyList[0];

        $scope.currencyList = CurrencyList;
        $scope.commissionList = CommissionList;

        $scope.getRate = () => {
          const toUAH = $scope.list.find(el => el.ccy === $scope.fieldSell).buy;
          const fromUAH = $scope.list.find(el => el.ccy === $scope.fieldBuy).sale;

          return toUAH / fromUAH;
        };

        $scope.onClick = () => {
          [$scope.fieldSell, $scope.fieldBuy] = [$scope.fieldBuy, $scope.fieldSell];
          $scope.rate = $scope.getRate();
        };

        $scope.changeBuyInput = () => {
          $scope.inputBuy = $scope.inputSell * $scope.getRate();
        };

        $scope.changeSellInput = () => {
          $scope.inputSell = $scope.inputBuy * $scope.getRate();
        };

        $scope.update = () => {
          $scope.rate = $scope.getRate();
        }

        apiService.getExchangeRate().then(data => {
          $scope.list = data;
          console.log($scope.list);
          $scope.rate = $scope.getRate();
        });
      }]);
})();
