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

        $scope.getRate = (to, from) => {
          const toUAH = $scope.list.find(el => el.ccy === to).buy;
          const fromUAH = $scope.list.find(el => el.ccy === from).sale;

          return (toUAH / fromUAH).toFixed(3);
        };

        $scope.getResultCur = (inCurr, rate, commission) => {
          const commissionSum = inCurr * rate * commission / 100;

          return inCurr * rate - commissionSum;
        };

        $scope.onClick = () => {
          [$scope.fieldSell, $scope.fieldBuy] = [$scope.fieldBuy, $scope.fieldSell];
          $scope.rateBuy = $scope.getRate($scope.fieldSell, $scope.fieldBuy);
          $scope.rateSell = $scope.getRate($scope.fieldBuy, $scope.fieldSell);
          $scope.changeBuyInput();
        };

        $scope.changeBuyInput = () => {
          $scope.inputBuy = $scope.getResultCur($scope.inputSell,
            $scope.getRate($scope.fieldSell, $scope.fieldBuy), $scope.fieldCommission);
        };

        $scope.changeSellInput = () => {
          $scope.inputSell = $scope.getResultCur($scope.inputBuy,
            $scope.getRate($scope.fieldBuy, $scope.fieldSell), $scope.fieldCommission);
        };

        $scope.updateCurrValue = () => {
          $scope.rateBuy = $scope.getRate($scope.fieldSell, $scope.fieldBuy);
          $scope.rateSell = $scope.getRate($scope.fieldBuy, $scope.fieldSell);
          $scope.changeBuyInput();
        };

        $scope.updateCommissionValue = () => {
          $scope.changeBuyInput();
        };

        apiService.getExchangeRate().then(data => {
          $scope.list = data;
          console.log($scope.list);
          $scope.rateBuy = $scope.getRate($scope.fieldSell, $scope.fieldBuy);
          $scope.rateSell = $scope.getRate($scope.fieldBuy, $scope.fieldSell);
        });
      }]);
})();
