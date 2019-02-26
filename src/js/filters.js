(function() {
  window.app.filter('filterCurrency', function() {
    return function(array, comp) {
      if (!array) {
        return;
      }
      return array.filter(item => item.ccy !== comp.ccy);
    };
  });
})();