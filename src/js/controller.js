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

        $scope.onClick = () => {
          [$scope.fieldSell, $scope.fieldBuy] = [$scope.fieldBuy, $scope.fieldSell];
        };

        $scope.changeBuyInput = () => {
          const rate1 = $scope.list.find(el => el.ccy === $scope.fieldSell).buy;
          const rate2 = $scope.list.find(el => el.ccy === $scope.fieldBuy).sale;
          $scope.inputBuy = $scope.inputSell * rate1 / rate2;
        };

        $scope.changeSellInput = () => {
          const rate = $scope.list.find(el => el.ccy === $scope.fieldBuy).sale;
          $scope.inputSell = $scope.inputBuy * rate;
        };

        apiService.getExchangeRate().then(data => {
          $scope.list = data;
          console.log($scope.list);
        });
      }]);
})();
