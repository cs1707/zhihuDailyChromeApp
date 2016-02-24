#ng-dependencies

> Analyze javascript code using [esprima](https://github.com/ariya/esprima) and return a list of objects representing the module dependencies in the code.

This is based on [gulp-angular-filesort](https://github.com/klei/gulp-angular-filesort). I extracted the module dependency code because I need to find a way to dynamically generate a root angular module that depends on a list of angular modules as Bower packages.

### Usage
```js
var fs = require('fs');
var ngDeps = require('ng-dependencies');

var deps = ngDeps(fs.readFileSync('./someNgModule.js'));

console.log(deps);
```

If the content of `./someNgModle.js` is as following:
```js
angular.module('test', ['one']).run(function () {
  // run some logic
});
angular.module('another', []);
angular.module('another').Controller('Ctrl', ['$scope', function ($scope) {
  // some controller logic
}]);
angular.module('useThis').run(function () {
  // ...
});
```

This will output:
```js
{
  dependencies: ['one', 'useThis'],
  modules: {
    'test': ['one'],
    'another': []
  }
}
```

### Special Cases
If multiple declarations of the same module is encountered, (according to [Angular Doc](https://docs.angularjs.org/guide/module)), the later declaration will overwrite any existing module that is declared with the same module name.

For example, the following content:
```js
angular.module('test', ['one']);
angular.module('test', ['another']);
```

will output:
```js
  {
    dependencies: ['another'],
    modules: {
      'test': ['another']
    }
  }
```

### Change log

0.1.1 - fixing repo url in `package.json` and removing unnecessary dependency.

0.1.0 - simplified output format; added detection for angular.js itself.
