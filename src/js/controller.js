/* eslint-disable max-params */

(function() {
  window.app.controller('CurrencyController',
    ['$scope', 'apiService', 'CommissionList', 'rateService',
      function($scope, apiService, CommissionList, rateService) {
        $scope.fieldCommission = CommissionList[0];
        $scope.commissionList = CommissionList;

        apiService.getRateList().then(data => {
          $scope.list = data;
          $scope.fieldSell = $scope.list[1];
          $scope.fieldBuy = $scope.list[0];

          $scope.rateBuy = rateService.getRate($scope.fieldSell, $scope.fieldBuy);
          $scope.rateSell = rateService.getRate($scope.fieldBuy, $scope.fieldSell);
        });

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
      }]);
})();
