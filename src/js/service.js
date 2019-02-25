/* global angular */

(function() {
  window.app.constant('CurrencyList', ['USD', 'EUR', 'RUR', 'BTC']);
  window.app.constant('CommissionList', [0, 1, 2, 5, 10]);

  window.app.service('rateService', ['apiService', function(apiService) {
    this.getRate = (from, to) => {
      const toUAH = apiService.listOfRates.find(el => el.ccy === from).buy;
      const fromUAH = apiService.listOfRates.find(el => el.ccy === to).sale;

      if (from === apiService.listOfRates[3].ccy) {
        const toUSD = apiService.listOfRates.find(el => el.ccy === apiService.listOfRates[3].ccy).buy;
        const toUAH = apiService.listOfRates.find(el => el.ccy === apiService.listOfRates[0].ccy).buy;

        return (toUSD * toUAH / fromUAH).toFixed(4);
      }

      if (to === apiService.listOfRates[3].ccy) {
        const toUSD = apiService.listOfRates.find(el => el.ccy === apiService.listOfRates[0].ccy).sale;
        const fromUSD = apiService.listOfRates.find(el => el.ccy === apiService.listOfRates[3].ccy).sale;

        return (toUAH / toUSD / fromUSD).toFixed(4);
      }

      return (toUAH / fromUAH).toFixed(4);
    };
  }]);

  window.app.service('apiService', ['$http', function($http) {
    this.listOfRates = null;
    this.getRateList = () => {
      return $http({
        method: 'GET',
        url: 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'
      }).then(({ data }) => {
        this.listOfRates = data;
        return this.listOfRates;
      });
    };
  }]);

  window.app.filter('filterCurrency', [function() {
    return function(array, expression) {
      return array.filter(function(item) {
        return !expression || !angular.equals(item, expression);
      });
    };
  }]);
})();