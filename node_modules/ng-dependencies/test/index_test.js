var lookup = require('../');

describe('lookup', function () {
  it('should return empty dependency list and empty module map for non-angular files', function () {
    var source = 'var jquery = {};';
    var deps = {
      dependencies: [],
      modules: {}
    };
    lookup(source).should.eql(deps);
  });

  it('should capture simple module declaration', function () {
    var source = 'angular.module("test", []);';
    var deps = {
      dependencies: ['ng'],
      modules: {
        'test': []
      }
    };
    lookup(source).should.eql(deps);
  });

  it('should capture the module dependencies', function () {
    var source = 'angular.module("test", ["one"]);';
    var deps = {
      dependencies: ['ng', 'one'],
      modules: {
        'test': ['one']
      }
    };
    lookup(source).should.eql(deps);
  });

  it('should capture module dependencies at root level', function () {
    var source = 'angular.module("test");\nangular.module("another").controller("Ctrl", ["$scope", function ($scope) {}]);';
    var deps = {
      dependencies: ['ng', 'test', 'another'],
      modules: {}
    };
    lookup(source).should.eql(deps);
  });

  it('should capture multiple module declarations', function () {
    var source = 'angular.module("test", []);\nangular.module("another", ["that"]);';
    var deps = {
      dependencies: ['ng', 'that'],
      modules: {
        'test': [],
        'another': ['that']
      }
    };
    lookup(source).should.eql(deps);
  });

  it('should not include locally declared modules in `dependencies` list', function () {
    var source = 'angular.module("test", []);\nangular.module("another", ["that", "test"]);';
    var deps = {
      dependencies: ['ng', 'that'],
      modules: {
        'test': [],
        'another': ['that', 'test']
      }
    };
    lookup(source).should.eql(deps);
  });

  it('should capture only one copy of duplicated module declaration', function () {
    var source = 'angular.module("test", ["one"]);\nangular.module("test", ["another"]);';
    var deps = {
      dependencies: ['ng', 'another'],
      modules: {
        'test': ['another']
      }
    };
    lookup(source).should.eql(deps);
  });

  it('should detect \'ng\' module declaration within angular itself', function () {
    var source = 'function angularModule(){}; function modules(){angularModule(\'ng\')};';
    var deps = {
      dependencies: [],
      modules: {
        'ng': []
      }
    };
    lookup(source).should.eql(deps);
  });
});
