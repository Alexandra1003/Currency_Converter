(function() {
  window.app.directive('noConnection', function() {
    return {
      template: '<div class="connection-message" ng-if="!connectionStatus">No connection ...</div>',
      restrict: 'E',
      controller: 'CurrencyController'
    };
  });
})();