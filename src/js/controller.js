/* eslint-disable max-params */
/* global angular */

(function() {
  window.app.controller('CurrencyController',
    ['$scope', 'apiService', 'CurrencyList', 'CommissionList', 'rateService',
      function($scope, apiService, CurrencyList, CommissionList, rateService) {
        $scope.fieldCommission = CommissionList[0];
        $scope.fieldSell = CurrencyList[1];
        $scope.fieldBuy = CurrencyList[0];

        $scope.currencyList = CurrencyList;
        $scope.commissionList = CommissionList;

        $scope.onClick = () => {
          [$scope.fieldSell, $scope.fieldBuy] = [$scope.fieldBuy, $scope.fieldSell];
          [$scope.rateBuy, $scope.rateSell] = [$scope.rateSell, $scope.rateBuy];
          $scope.changeBuyInput();
        };

        $scope.changeBuyInput = () => {
          $scope.inputBuy = rateService.getResultCur($scope.inputSell,
            $scope.rateBuy, $scope.fieldCommission);
        };

        $scope.changeSellInput = () => {
          $scope.inputSell = rateService.getResultCur($scope.inputBuy,
            $scope.rateSell, $scope.fieldCommission);
        };

        $scope.updateCurrValue = () => {
          $scope.rateBuy = rateService.getRate($scope.fieldSell, $scope.fieldBuy);
          $scope.rateSell = rateService.getRate($scope.fieldBuy, $scope.fieldSell);
          $scope.changeBuyInput();
        };

        $scope.updateCommissionValue = () => {
          $scope.changeBuyInput();
        };

        apiService.getRateList().then(data => {
          $scope.list = data;
          $scope.rateBuy = rateService.getRate($scope.fieldSell, $scope.fieldBuy);
          $scope.rateSell = rateService.getRate($scope.fieldBuy, $scope.fieldSell);
        });
      }]);
})();
