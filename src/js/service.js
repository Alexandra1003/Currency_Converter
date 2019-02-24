/* global angular */

(function() {
  window.app.constant('CurrencyList', ['USD', 'EUR', 'RUR', 'BTC']);
  window.app.constant('CommissionList', [0, 1, 2, 5, 10]);

  window.app.service('apiService', ['$http', function($http) {
    this.exchangeRate = null;
    this.getExchangeRate = () => {
      return $http({
        method: 'GET',
        url: 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'
      }).then(({ data }) => {
        this.exchangeRate = data;
        return this.exchangeRate;
      });
    };
  }]);
})();