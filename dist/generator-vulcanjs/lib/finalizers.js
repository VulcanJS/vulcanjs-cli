'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var pascalCase = require('pascal-case');
var camelCase = require('camelcase');
var filter = require('./filters').filter;
var store = require('./store');
var flatten = require('lodash/flatten');
var pluralize = require('pluralize');
var makeLister = require('./lister');

var arrayToEjsString = function arrayToEjsString(arr) {
  var quotedList = arr.map(function (elem) {
    return '\'' + elem + '\'';
  });
  var quotedAndCsv = quotedList.join(',');
  return '[' + quotedAndCsv + ']';
};

function setup(generatorSetup) {
  var generator = generatorSetup;
  var lister = makeLister.setup(generator);

  function finalize(propName) {
    function getRaw(keyBeforeRaw) {
      var answers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return generator.options[keyBeforeRaw] || generator.props[keyBeforeRaw] || answers[keyBeforeRaw];
    }

    function pluralPascalModuleName(answers) {
      var moduleNameRaw = getRaw('moduleName', answers);
      var pluralModuleName = pluralize.plural(moduleNameRaw);
      return pascalCase(pluralModuleName);
    }

    function singularPascalModuleName(answers) {
      var moduleNameRaw = getRaw('moduleName', answers);
      var pluralModuleName = pluralize.singular(moduleNameRaw);
      return pascalCase(pluralModuleName);
    }

    function permissionTo(permissionType, answers) {
      var permissionsArr = answers[permissionType].map(function (s) {
        return s.toLowerCase();
      });
      return arrayToEjsString(permissionsArr);
    }

    function appName(answers) {
      var appNameRaw = getRaw.bind(this)('appName', answers);
      return filter('appName', appNameRaw);
    }

    function packageName(answers) {
      var packageNameRaw = getRaw('packageName', answers);
      return filter('packageName', packageNameRaw);
    }

    function moduleName(answers) {
      var moduleNameRaw = getRaw('moduleName', answers);
      return filter('moduleName', moduleNameRaw);
    }

    function componentName(answers) {
      var componentNameRaw = getRaw('componentName', answers);
      return filter('componentName', componentNameRaw);
    }

    function componentFileName(answers) {
      var finalizedComponentName = componentName(answers);
      return finalizedComponentName + '.' + store.get('reactExtension');
    }

    function componentPath(answers) {
      return generator._getPath({ isAbsolute: false }, 'components', componentFileName(answers));
    }

    function pascalModuleName(answers) {
      var moduleNameRaw = getRaw('moduleName', answers);
      return pascalCase(moduleNameRaw);
    }

    function typeName(answers) {
      return singularPascalModuleName(answers);
    }

    function collectionName(answers) {
      return pluralPascalModuleName(answers);
    }

    function camelModuleName(answers) {
      var moduleNameRaw = getRaw('moduleName', answers);
      return camelCase(moduleNameRaw);
    }

    function moduleParts(answers) {
      return Object.keys(answers.moduleParts);
    }

    function mutationName(mutationType, answers) {
      var moduleNamePart = pluralPascalModuleName(answers);
      var mutationTypePart = pascalCase(mutationType);
      return '' + moduleNamePart + mutationTypePart;
    }

    function permissionName(permission, answers) {
      var moduleNamePart = camelModuleName(answers);
      var permissionAppendage = permission.join('.');
      return moduleNamePart + '.' + permissionAppendage;
    }

    function vulcanDependencies(answers) {
      var rawDependencies = getRaw('vulcanDependencies', answers);
      return rawDependencies.map(function (dep) {
        return '\'' + dep + '\'';
      });
    }

    function resolverName(resolverType, answers) {
      var moduleNamePart = pluralPascalModuleName(answers);
      return '' + moduleNamePart + resolverType;
    }

    function hasResolver(resolverType, answers) {
      var defaultResolvers = getRaw('defaultResolvers', answers);
      return defaultResolvers[resolverType];
    }

    function addRouteStatement(answers) {
      var routeName = getRaw('routeName', answers);
      var routePath = getRaw('routePath', answers);
      var layoutName = getRaw('layoutName', answers);
      var routeComponentName = componentName(answers);
      var layoutNameKeyValuePair = layoutName ? 'layoutName: \'' + layoutName + '\',' : '';
      return 'addRoute({\n        name: \'' + routeName + '\',\n        path: \'' + routePath + '\',\n        componentName: \'' + routeComponentName + '\',\n        ' + layoutNameKeyValuePair + '\n      });';
    }

    function prettyPackage(inputPackageName, id) {
      var packageNameRaw = getRaw('packageName', {
        packageName: inputPackageName
      });
      return {
        no: id,
        name: packageNameRaw,
        modules: lister.countModules(packageNameRaw),
        routes: lister.countRoutes(packageNameRaw)
      };
    }

    function prettyPackages(packageNames) {
      return packageNames.map(prettyPackage);
    }

    function addNo(arr) {
      return arr.map(function (obj, index) {
        return _extends({ no: index }, obj);
      });
    }

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    switch (propName) {
      case 'appName':
        return appName.apply(undefined, args);
      case 'packageName':
        return packageName.apply(undefined, args);
      case 'moduleName':
        return moduleName.apply(undefined, args);
      case 'moduleParts':
        return moduleParts.apply(undefined, args);
      case 'componentName':
        return componentName.apply(undefined, args);
      case 'componentFileName':
        return componentFileName.apply(undefined, args);
      case 'componentPath':
        return componentPath.apply(undefined, args);
      case 'typeName':
        return typeName.apply(undefined, args);
      case 'pascalModuleName':
        return pascalModuleName.apply(undefined, args);
      case 'camelModuleName':
        return camelModuleName.apply(undefined, args);
      case 'collectionName':
        return collectionName.apply(undefined, args);
      case 'mutationName':
        return mutationName.apply(undefined, args);
      case 'permissionName':
        return permissionName.apply(undefined, args);
      case 'vulcanDependencies':
        return vulcanDependencies.apply(undefined, args);
      case 'resolverName':
        return resolverName.apply(undefined, args);
      case 'hasResolver':
        return hasResolver.apply(undefined, args);
      case 'addRouteStatement':
        return addRouteStatement.apply(undefined, args);
      case 'permissionTo':
        return permissionTo.apply(undefined, args);
      case 'prettyPackages':
        return prettyPackages.apply(undefined, args);
      case 'raw':
        return getRaw.apply(undefined, args);
      default:
        return undefined;
    }
  }

  return finalize;
}

module.exports = {
  setup: setup
};
