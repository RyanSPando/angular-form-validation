(function () {
  'use strict';

  var app = angular.module('validateForm', []); //jshint ignore:line

  app.controller('validater', function($scope) {
    this.username = null;
    this.email = null;
    this.password = null;
    this.zip = null;
    this.users = [];

    this.submit = () => {
      const user = {
        name: this.username,
        password: this.password,
        email: this.email,
        zip: this.zip
      };
      this.users.push(user);
      this.username = null;
      this.email = null;
      this.password = null;
      this.zip = null;
      $scope.formie.$setPristine();
    };
  });

  app.directive('ensureUnique', function() {
  return {
    require: 'ngModel',
    link: function(scope, ele, attrs, ngModel) {
      scope.$watch(attrs.ngModel, function() {
        const userNames = scope.validate.users.map(user => user.name);

        ngModel.$parsers.unshift(function(value) {
          const valid = userNames.indexOf(value) === -1;
          ngModel.$setValidity('ensureUnique', valid);
          return valid ? value : undefined;
       });

        ngModel.$formatters.unshift(function(value) {
          ngModel.$setValidity('ensureUnique', userNames.indexOf(value) === -1);
          return value;
        });
      });
    }
  };
});
})();
