const pascalCase = require('pascal-case');
const camelCase = require('camelcase');
const filter = require('./filters').filter;
const store = require('./store');
const flatten = require('lodash/flatten');

const arrayToEjsString = (arr) => {
  const quotedList = arr.map((elem) => `'${elem}'`);
  const quotedAndCsv = quotedList.join(',');
  return `[${quotedAndCsv}]`;
};

function setup (generatorSetup) {
  const generator = generatorSetup;

  function finalize (propName, ...args) {
    function getRaw (keyBeforeRaw, answers = {}) {
      return (
        generator.options[keyBeforeRaw] ||
        generator.props[keyBeforeRaw] ||
        answers[keyBeforeRaw]
      );
    }

    function permissionTo (permissionType, answers) {
      const permissionsArr = answers[permissionType];
      return arrayToEjsString(permissionsArr);
    }

    function appName (answers) {
      const appNameRaw = getRaw.bind(this)('appName', answers);
      return filter('appName', appNameRaw);
    }

    function packageName (answers) {
      const packageNameRaw = getRaw('packageName', answers);
      return filter('packageName', packageNameRaw);
    }

    function modelName (answers) {
      const modelNameRaw = getRaw('modelName', answers);
      return filter('modelName', modelNameRaw);
    }

    function componentName (answers) {
      const componentNameRaw = getRaw('componentName', answers);
      return filter('componentName', componentNameRaw);
    }

    function componentFileName (answers) {
      const filteredComponentName = filter('componentName', answers.componentName);
      return `${filteredComponentName}.${store.get('reactExtension')}`;
    }

    function componentPath (answers) {
      return generator._getPath(
        { isAbsolute: false },
        'components',
        componentFileName(answers)
      );
    }

    function pascalModelName (answers) {
      const modelNameRaw = getRaw('modelName', answers);
      return pascalCase(modelNameRaw);
    }

    function camelModelName (answers) {
      const modelNameRaw = getRaw('modelName', answers);
      return camelCase(modelNameRaw);
    }

    function modelParts (answers) {
      return Object.keys(answers.modelParts);
    }

    function collectionName (answers) {
      return pascalModelName(answers);
    }

    function mutationName (mutationType, answers) {
      const modelNamePart = camelModelName(answers);
      return `${modelNamePart}${mutationType}`;
    }

    function permissionName (permission, answers) {
      const camelModelNamePart = camelModelName(answers);
      const permissionAppendage = permission.join('.');
      return `${camelModelNamePart}.${permissionAppendage}`;
    }

    function vulcanDependencies (answers) {
      const rawDependencies = getRaw('vulcanDependencies', answers);
      return rawDependencies.map((dep) => (`'${dep}'`));
    }

    function resolverName (resolverType, answers) {
      const resolverNamePart = camelModelName(answers);
      return `${resolverNamePart}${resolverType}`;
    }

    function hasResolver (resolverType, answers) {
      const defaultResolvers = getRaw('defaultResolvers', answers);
      return defaultResolvers[resolverType];
    }

    function addRouteStatement (answers) {
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

    function prettyPackage (inputPackageName, id) {
      const packageNameRaw = getRaw('packageName', { packageName: inputPackageName });
      return {
        no: id,
        name: packageNameRaw,
        models: store.num('models', packageNameRaw),
        routes: store.num('routes', packageNameRaw),
      };
    }

    function prettyPackages (packageNames) {
      return packageNames.map(prettyPackage);
    }

    function addNo (arr) {
      return arr.map((obj, index) => ({ no: index, ...obj }));
    }

    function getPrettyRoutesWithoutNumbers (inputPackageName) {
      const theRoutes = store.get('routes', inputPackageName);
      const prettyRoutes = theRoutes.map((theRoute) => ({
        package: inputPackageName,
        name: theRoute.name,
        path: theRoute.content.routePath,
      }));
      return prettyRoutes;
    }

    function prettyRoutesForPackage (inputPackageName) {
      const prettyRoutesWithoutNumbers = getPrettyRoutesWithoutNumbers(inputPackageName);
      return addNo(prettyRoutesWithoutNumbers);
    }

    function allPrettyRoutes () {
      const allPackageNames = store.get('packageNames');
      const prettyRoutes = allPackageNames.map(getPrettyRoutesWithoutNumbers);
      const flattenedRoutes = flatten(prettyRoutes);
      return addNo(flattenedRoutes);
    }

    switch (propName) {
      case 'appName' : return appName(...args);
      case 'packageName' : return packageName(...args);
      case 'modelName' : return modelName(...args);
      case 'modelParts': return modelParts(...args);
      case 'componentName' : return componentName(...args);
      case 'componentFileName' : return componentFileName(...args);
      case 'componentPath' : return componentPath(...args);
      case 'pascalModelName' : return pascalModelName(...args);
      case 'camelModelName' : return camelModelName(...args);
      case 'collectionName' : return collectionName(...args);
      case 'mutationName' : return mutationName(...args);
      case 'permissionName' : return permissionName(...args);
      case 'vulcanDependencies' : return vulcanDependencies(...args);
      case 'resolverName' : return resolverName(...args);
      case 'hasResolver' : return hasResolver(...args);
      case 'addRouteStatement' : return addRouteStatement(...args);
      case 'permissionTo': return permissionTo(...args);
      case 'prettyPackages': return prettyPackages(...args);
      case 'prettyRoutesForPackage': return prettyRoutesForPackage(...args);
      case 'allPrettyRoutes': return allPrettyRoutes(...args);
      case 'raw' : return getRaw(...args);
      default: return undefined;
    }
  }

  return finalize;
}

module.exports = {
  setup,
};
