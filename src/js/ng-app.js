/* eslint-disable no-console */
/* global angular */
const app = angular.module('myApp', []);

app.value('Friends', '["ivan", "petro", "nina"]');

app.controller('TestController', [function() {
  this.items = [{
    id: 1,
    label: 'aLabel',
    subItem: { name: 'aSubItem' }
  }, {
    id: 2,
    label: 'bLabel',
    subItem: { name: 'bSubItem' }
  }];
  this.selected = this.items[0];
}]);