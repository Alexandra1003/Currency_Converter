/* eslint-disable max-params */
(function() {
  window.app.component('currencyComponent', {
    bindings: { list1: '<' },
    templateUrl: 'js/components/currencyComponent/currency-component.html',
    controller: 'CurrencyController'
  });

  window.app.controller('CurrencyController',
    ['$scope', 'CommissionList', 'rateService', 'currencyList',
      function($scope, CommissionList, rateService, currencyList) {
        $scope.list = currencyList;
        $scope.fieldSell = $scope.list[1];
        $scope.fieldBuy = $scope.list[0];

        $scope.rateBuy = rateService.getRate($scope.fieldSell, $scope.fieldBuy);
        $scope.rateSell = rateService.getRate($scope.fieldBuy, $scope.fieldSell);

        $scope.fieldCommission = CommissionList[0];
        $scope.commissionList = CommissionList;

        $scope.$watchGroup(['fieldBuy', 'fieldSell'], function() {
          $scope.updateCurrValue();
        });

        $scope.$watch('fieldCommission', function() {
          $scope.changeBuyInput();
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
      }]);
})();
