(function() {
  window.app.constant('CurrencyList', ['USD', 'EUR', 'RUR', 'BTC']);
  window.app.constant('CommissionList', [0, 1, 2, 5, 10]);

  window.app.service('rateService', ['apiService', function(apiService) {
    this.getRate = (from, to) => {
      const toUAH = from.buy;
      const fromUAH = to.sale;

      if (from === apiService.listOfRates[3]) {
        const toUSD = apiService.listOfRates[3].buy;
        const toUAH = apiService.listOfRates[0].buy;

        return (toUSD * toUAH / fromUAH).toFixed(4);
      }

      if (to === apiService.listOfRates[3]) {
        const toUSD = apiService.listOfRates[0].sale;
        const fromUSD = apiService.listOfRates[3].sale;

        return (toUAH / toUSD / fromUSD).toFixed(4);
      }

      return (toUAH / fromUAH).toFixed(4);
    };

    this.getResultCur = (inCurr = 0, rate, commission) => {
      const commissionSum = inCurr * rate * commission / 100;

      return (inCurr * rate - commissionSum).toFixed(5);
    };
  }]);

  window.app.service('apiService', ['$http', function($http) {
    this.listOfRates = [];
    this.getRateList = () => {
      return $http.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
        .then(({ data }) => {
          this.listOfRates = data;
          return this.listOfRates;
        });
    };
  }]);
})();