/* eslint-disable max-params */
/* global angular */

(function() {
  window.app.filter('excludeFrom', [function() {
    return function(array, expression, comparator) {
      return array.filter(function(item) {
        return !expression || !angular.equals(item, expression);
      });
    };
  }]);

  window.app.controller('TestController',
    ['$scope', 'apiService', 'CurrencyList', 'CommissionList',
      function($scope, apiService, CurrencyList, CommissionList) {
        $scope.fieldCommission = CommissionList[0];
        $scope.fieldSell = CurrencyList[4];
        $scope.fieldBuy = CurrencyList[0];

        $scope.currencyList = CurrencyList;
        $scope.commissionList = CommissionList;

        apiService.getExchangeRate().then(data => {
          $scope.list = data;
        });
      }]);
})();
