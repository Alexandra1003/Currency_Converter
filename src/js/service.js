/* eslint-disable no-return-assign */
/* eslint-disable camelcase */
(function() {
  window.app.constant('CommissionList', [0, 1, 2, 5, 10]);
  window.app.constant('UAHconstant', { ccy: 'UAH', base_ccy: 'UAH', buy: 1, sale: 1 });

  window.app.provider('rateService', function() {
    let URL = '';

    return {
      listOfRates: [],
      setURL: apiUrl => URL = apiUrl,

      $get: ['$http', 'UAHconstant', function($http, UAHconstant) {
        return {
          getRateList: () => {
            return $http.get(URL)
              .then(({ data }) => {
                this.listOfRates = data;
                this.listOfRates.push(UAHconstant);
                return this.listOfRates;
              });
          },

          getRate: (from, to) => {
            if (this.listOfRates.length === 0) {
              return;
            }

            const toUAH = from.buy;
            const fromUAH = to.sale;

            if (from === this.listOfRates[3]) {
              const toUSD = this.listOfRates[3].buy;
              const toUAH = this.listOfRates[0].buy;

              return (toUSD * toUAH / fromUAH).toFixed(4);
            }

            if (to === this.listOfRates[3]) {
              const toUSD = this.listOfRates[0].sale;
              const fromUSD = this.listOfRates[3].sale;

              return (toUAH / toUSD / fromUSD).toFixed(4);
            }

            return (toUAH / fromUAH).toFixed(4);
          },

          getResultCur: (inCurr = 0, rate, commission) => {
            const commissionSum = inCurr * rate * commission / 100;

            return (inCurr * rate - commissionSum).toFixed(5);
          }
        };
      }]
    };
  });
})();