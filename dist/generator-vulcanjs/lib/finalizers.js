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

    function pluralPascalModelName(answers) {
      var modelNameRaw = getRaw('modelName', answers);
      var pluralModelName = pluralize.plural(modelNameRaw);
      return pascalCase(pluralModelName);
    }

    function singularPascalModelName(answers) {
      var modelNameRaw = getRaw('modelName', answers);
      var pluralModelName = pluralize.singular(modelNameRaw);
      return pascalCase(pluralModelName);
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

    function modelName(answers) {
      var modelNameRaw = getRaw('modelName', answers);
      return filter('modelName', modelNameRaw);
    }

    function componentName(answers) {
      var componentNameRaw = getRaw('componentName', answers);
      return filter('componentName', componentNameRaw);
    }

    function componentFileName(answers) {
      var filteredComponentName = filter('componentName', answers.componentName);
      return filteredComponentName + '.' + store.get('reactExtension');
    }

    function componentPath(answers) {
      return generator._getPath({ isAbsolute: false }, 'components', componentFileName(answers));
    }

    function pascalModelName(answers) {
      var modelNameRaw = getRaw('modelName', answers);
      return pascalCase(modelNameRaw);
    }

    function typeName(answers) {
      return singularPascalModelName(answers);
    }

    function collectionName(answers) {
      return pluralPascalModelName(answers);
    }

    function camelModelName(answers) {
      var modelNameRaw = getRaw('modelName', answers);
      return camelCase(modelNameRaw);
    }

    function modelParts(answers) {
      return Object.keys(answers.modelParts);
    }

    function mutationName(mutationType, answers) {
      var modelNamePart = pluralPascalModelName(answers);
      var mutationTypePart = pascalCase(mutationType);
      return '' + modelNamePart + mutationTypePart;
    }

    function permissionName(permission, answers) {
      var modelNamePart = pluralPascalModelName(answers);
      var permissionAppendage = permission.join('.');
      return modelNamePart + '.' + permissionAppendage;
    }

    function vulcanDependencies(answers) {
      var rawDependencies = getRaw('vulcanDependencies', answers);
      return rawDependencies.map(function (dep) {
        return '\'' + dep + '\'';
      });
    }

    function resolverName(resolverType, answers) {
      var modelNamePart = pluralPascalModelName(answers);
      return '' + modelNamePart + resolverType;
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
      var packageNameRaw = getRaw('packageName', { packageName: inputPackageName });
      return {
        no: id,
        name: packageNameRaw,
        models: lister.countModules(packageNameRaw),
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

    function getPrettyRoutesWithoutNumbers(inputPackageName) {
      var theRoutes = store.get('routes', inputPackageName);
      var prettyRoutes = theRoutes.map(function (theRoute) {
        return {
          package: inputPackageName,
          name: theRoute.name,
          path: theRoute.content.routePath
        };
      });
      return prettyRoutes;
    }

    function prettyRoutesForPackage(inputPackageName) {
      var prettyRoutesWithoutNumbers = getPrettyRoutesWithoutNumbers(inputPackageName);
      return addNo(prettyRoutesWithoutNumbers);
    }

    function allPrettyRoutes() {
      var allPackageNames = store.get('packageNames');
      var prettyRoutes = allPackageNames.map(getPrettyRoutesWithoutNumbers);
      var flattenedRoutes = flatten(prettyRoutes);
      return addNo(flattenedRoutes);
    }

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    switch (propName) {
      case 'appName':
        return appName.apply(undefined, args);
      case 'packageName':
        return packageName.apply(undefined, args);
      case 'modelName':
        return modelName.apply(undefined, args);
      case 'modelParts':
        return modelParts.apply(undefined, args);
      case 'componentName':
        return componentName.apply(undefined, args);
      case 'componentFileName':
        return componentFileName.apply(undefined, args);
      case 'componentPath':
        return componentPath.apply(undefined, args);
      case 'typeName':
        return typeName.apply(undefined, args);
      case 'pascalModelName':
        return pascalModelName.apply(undefined, args);
      case 'camelModelName':
        return camelModelName.apply(undefined, args);
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
      case 'prettyRoutesForPackage':
        return prettyRoutesForPackage.apply(undefined, args);
      case 'allPrettyRoutes':
        return allPrettyRoutes.apply(undefined, args);
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
