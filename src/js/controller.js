(function() {
  window.app.component('myComponent', {
    templateUrl: 'form-component.html',
    controller: 'CurrencyController'
  });

  window.app.controller('CurrencyController',
    ['$scope', 'CommissionList', 'rateService',
      function($scope, CommissionList, rateService) {
        $scope.fieldCommission = CommissionList[0];
        $scope.commissionList = CommissionList;

        rateService.getRateList().then(data => {
          $scope.list = data;
          $scope.fieldSell = $scope.list[1];
          $scope.fieldBuy = $scope.list[0];

          $scope.rateBuy = rateService.getRate($scope.fieldSell, $scope.fieldBuy);
          $scope.rateSell = rateService.getRate($scope.fieldBuy, $scope.fieldSell);
        });

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
