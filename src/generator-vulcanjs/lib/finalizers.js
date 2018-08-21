const pascalCase = require('pascal-case');
const camelCase = require('camelcase');
const filter = require('./filters').filter;
const store = require('./store');
const flatten = require('lodash/flatten');
const pluralize = require('pluralize');
const makeLister = require('./lister');

const arrayToEjsString = (arr) => {
  const quotedList = arr.map((elem) => `'${elem}'`);
  const quotedAndCsv = quotedList.join(',');
  return `[${quotedAndCsv}]`;
};

function setup(generatorSetup) {
  const generator = generatorSetup;
  const lister = makeLister.setup(generator);

  function finalize(propName, ...args) {
    function getRaw(keyBeforeRaw, answers = {}) {
      return (
        generator.options[keyBeforeRaw] ||
        generator.props[keyBeforeRaw] ||
        answers[keyBeforeRaw]
      );
    }

    function pluralPascalModuleName(answers) {
      const moduleNameRaw = getRaw('moduleName', answers);
      const pluralModuleName = pluralize.plural(moduleNameRaw);
      return pascalCase(pluralModuleName);
    }

    function singularPascalModuleName(answers) {
      const moduleNameRaw = getRaw('moduleName', answers);
      const pluralModuleName = pluralize.singular(moduleNameRaw);
      return pascalCase(pluralModuleName);
    }

    function permissionTo(permissionType, answers) {
      const permissionsArr = answers[permissionType].map((s) => s.toLowerCase());
      return arrayToEjsString(permissionsArr);
    }

    function appName(answers) {
      const appNameRaw = getRaw.bind(this)('appName', answers);
      return filter('appName', appNameRaw);
    }

    function packageName(answers) {
      const packageNameRaw = getRaw('packageName', answers);
      return filter('packageName', packageNameRaw);
    }

    function moduleName(answers) {
      const moduleNameRaw = getRaw('moduleName', answers);
      return filter('moduleName', moduleNameRaw);
    }

    function componentName(answers) {
      const componentNameRaw = getRaw('componentName', answers);
      return filter('componentName', componentNameRaw);
    }

    function componentFileName(answers) {
      const filteredComponentName = filter('componentName', answers.componentName);
      return `${filteredComponentName}.${store.get('reactExtension')}`;
    }

    function componentPath(answers) {
      return generator._getPath(
        { isAbsolute: false },
        'components',
        componentFileName(answers)
      );
    }

    function pascalModuleName(answers) {
      const moduleNameRaw = getRaw('moduleName', answers);
      return pascalCase(moduleNameRaw);
    }

    function typeName(answers) {
      return singularPascalModuleName(answers);
    }

    function collectionName(answers) {
      return pluralPascalModuleName(answers);
    }

    function camelModuleName(answers) {
      const moduleNameRaw = getRaw('moduleName', answers);
      return camelCase(moduleNameRaw);
    }

    function moduleParts(answers) {
      return Object.keys(answers.moduleParts);
    }

    function mutationName(mutationType, answers) {
      const moduleNamePart = pluralPascalModuleName(answers);
      const mutationTypePart = pascalCase(mutationType);
      return `${moduleNamePart}${mutationTypePart}`;
    }

    function permissionName(permission, answers) {
      const moduleNamePart = pluralPascalModuleName(answers);
      const permissionAppendage = permission.join('.');
      return `${moduleNamePart}.${permissionAppendage}`;
    }

    function vulcanDependencies(answers) {
      const rawDependencies = getRaw('vulcanDependencies', answers);
      return rawDependencies.map((dep) => (`'${dep}'`));
    }

    function resolverName(resolverType, answers) {
      const moduleNamePart = pluralPascalModuleName(answers);
      return `${moduleNamePart}${resolverType}`;
    }

    function hasResolver(resolverType, answers) {
      const defaultResolvers = getRaw('defaultResolvers', answers);
      return defaultResolvers[resolverType];
    }

    function addRouteStatement(answers) {
      const routeName = getRaw('routeName', answers);
      const routePath = getRaw('routePath', answers);
      const layoutName = getRaw('layoutName', answers);
      const routeComponentName = componentName(answers);
      const layoutNameKeyValuePair = layoutName ? `layoutName: '${layoutName}',` : '';
      return `addRoute({
        name: '${routeName}',
        path: '${routePath}',
        componentName: '${routeComponentName}',
        ${layoutNameKeyValuePair}
      });`;
    }

    function prettyPackage(inputPackageName, id) {
      const packageNameRaw = getRaw('packageName', { packageName: inputPackageName });
      return {
        no: id,
        name: packageNameRaw,
        modules: lister.countModules(packageNameRaw),
        routes: lister.countRoutes(packageNameRaw),
      };
    }

    function prettyPackages(packageNames) {
      return packageNames.map(prettyPackage);
    }

    function addNo(arr) {
      return arr.map((obj, index) => ({ no: index, ...obj }));
    }


    switch (propName) {
      case 'appName': return appName(...args);
      case 'packageName': return packageName(...args);
      case 'moduleName': return moduleName(...args);
      case 'moduleParts': return moduleParts(...args);
      case 'componentName': return componentName(...args);
      case 'componentFileName': return componentFileName(...args);
      case 'componentPath': return componentPath(...args);
      case 'typeName': return typeName(...args);
      case 'pascalModuleName': return pascalModuleName(...args);
      case 'camelModuleName': return camelModuleName(...args);
      case 'collectionName': return collectionName(...args);
      case 'mutationName': return mutationName(...args);
      case 'permissionName': return permissionName(...args);
      case 'vulcanDependencies': return vulcanDependencies(...args);
      case 'resolverName': return resolverName(...args);
      case 'hasResolver': return hasResolver(...args);
      case 'addRouteStatement': return addRouteStatement(...args);
      case 'permissionTo': return permissionTo(...args);
      case 'prettyPackages': return prettyPackages(...args);
      case 'raw': return getRaw(...args);
      default: return undefined;
    }
  }

  return finalize;
}

module.exports = {
  setup,
};
