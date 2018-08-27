const Redux = require('redux');
const logger = require('redux-node-logger');
const reducers = require('./reducers');
const filter = require('./filters').filter;
const common = require('./common');

let store = {};

function init (savedState) {
  if (process.env.VULCANJS_SEE_REDUX_LOGS) {
    store = Redux.createStore(
      reducers,
      savedState,
      Redux.applyMiddleware(logger())
    );
  } else {
    store = Redux.createStore(
      reducers,
      savedState
    );
  }
  return store;
}

function is (checkType, ...args) {
  function vulcan () {
    return !!store.getState().isVulcan;
  }

  function packageExists (packageName) {
    const filteredPackageName = filter('packageName', packageName);
    return !!store.getState().packages[filteredPackageName];
  }

  function moduleExists (packageName, moduleName) {
    const filteredModuleName = filter('moduleName', moduleName);
    return (packageExists(packageName)) &&
      !!store.getState().packages[packageName].modules[filteredModuleName];
  }

  switch (checkType) {
    case 'packageExists': return packageExists(...args);
    case 'moduleExists': return moduleExists(...args);
    case 'vulcan': return vulcan(...args);
    default: return undefined;
  }
}

function get (checkType, ...args) {
  function reactExtension () {
    return store.getState().reactExtension;
  }

  function packageNames () {
    const packages = store.getState().packages;
    const packageNamesToGet = Object.keys(packages);
    return packageNamesToGet.sort(common.alphabeticalSort);
  }

  function getPackage (packageName) {
    return store.getState().packages[packageName];
  }

  function moduleNames (packageName) {
    const thePackage = getPackage(packageName);
    const modules = is('packageExists', packageName) ?
      thePackage.modules :
      {};
    const moduleNamesToGet = Object.keys(modules);
    return moduleNamesToGet.sort(common.alphabeticalSort);
  }

  function packageNamesWithNumModules () {
    const packageNamesList = packageNames();
    const packageNamesWithModules = packageNamesList.map((packageName) => ({
      name: packageName,
      numModules: moduleNames(packageName).length,
    }));
    return packageNamesWithModules;
  }

  function routeNames (packageName) {
    const thePackage = getPackage(packageName);
    const theRoutes = thePackage.routes;
    const routeNamesToGet = Object.keys(theRoutes);
    return routeNamesToGet.sort(common.alphabeticalSort);
  }

  function getRoutes (packageName) {
    const thePackage = getPackage(packageName);
    const theRoutes = thePackage.routes;
    return routeNames(packageName).map((routeName) => ({
      name: routeName,
      content: theRoutes[routeName],
    }));
  }

  switch (checkType) {
    case 'reactExtension': return reactExtension(...args);
    case 'packageNames': return packageNames(...args);
    case 'moduleNames': return moduleNames(...args);
    case 'routeNames': return routeNames(...args);
    case 'package': return getPackage(...args);
    case 'routes': return getRoutes(...args);
    case 'packageNamesWithNumModules': return packageNamesWithNumModules(...args);
    default: return undefined;
  }
}

function num (checkType, ...args) {
  function routes (packageName) {
    const routeNames = get('routeNames', packageName);
    return routeNames.length;
  }

  function modules (packageName) {
    const moduleNames = get('moduleNames', packageName);
    return moduleNames.length;
  }

  switch (checkType) {
    case 'routes': return routes(...args);
    case 'modules': return modules(...args);
    default: return undefined;
  }
}

function has (checkType, ...args) {
  function nonZeroPackages () {
    const packageNames = get('packageNames');
    return Object.keys(packageNames).length > 0;
  }

  function nonZeroModulesInPackage (packageName) {
    if (!this._isPackageExists(packageName)) return false;
    const thePackage = this._getPackage(packageName);
    const moduleNames = Object.keys(thePackage.modules);
    return moduleNames.length > 0;
  }

  switch (checkType) {
    case 'nonZeroModulesInPackage': return nonZeroModulesInPackage(...args);
    case 'nonZeroPackages': return nonZeroPackages(...args);
    default: return undefined;
  }
}

module.exports = {
  init,
  is,
  has,
  get,
  num,
};
