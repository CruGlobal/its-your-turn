import angular from 'angular';
import 'angular-mocks';
import module from './main.component';

describe('main', function() {
  beforeEach(angular.mock.module(module.name));
  var self = {};

  beforeEach(inject(function($rootScope, $componentController) {
    self.controller = $componentController(module.name);
  }));

  it('to be defined', function() {
    expect(self.controller).toBeDefined();
  });
});
