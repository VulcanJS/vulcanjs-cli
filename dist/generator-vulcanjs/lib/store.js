const Redux = require('redux');
const logger = require('redux-node-logger');
const reducers = require('./reducers');
const filter = require('./filters').filter;
const common = require('./common');

let store = {};

function init(savedState) {
  if (process.env.VULCANJS_SEE_REDUX_LOGS) {
    store = Redux.createStore(reducers, savedState, Redux.applyMiddleware(logger()));
  } else {
    store = Redux.createStore(reducers, savedState);
  }
  return store;
}

function is(checkType, ...args) {
  function vulcan() {
    return !!store.getState().isVulcan;
  }

  function packageExists(packageName) {
    const filteredPackageName = filter('packageName', packageName);
    return !!store.getState().packages[filteredPackageName];
  }

  function modelExists(packageName, modelName) {
    const filteredModelName = filter('modelName', modelName);
    return packageExists(packageName) && !!store.getState().packages[packageName].models[filteredModelName];
  }

  switch (checkType) {
    case 'packageExists':
      return packageExists(...args);
    case 'modelExists':
      return modelExists(...args);
    case 'vulcan':
      return vulcan(...args);
    default:
      return undefined;
  }
}

function get(checkType, ...args) {
  function reactExtension() {
    return store.getState().reactExtension;
  }

  function packageNames() {
    const packages = store.getState().packages;
    const packageNamesToGet = Object.keys(packages);
    return packageNamesToGet.sort(common.alphabeticalSort);
  }

  function getPackage(packageName) {
    return store.getState().packages[packageName];
  }

  function getAllPackages() {
    const allPackageNames = packageNames();
    return allPackageNames.map(packageName => ({
      name: packageName,
      packageContents: getPackage(packageName)
    }));
  }

  function modelNames(packageName) {
    const thePackage = getPackage(packageName);
    const models = is('packageExists', packageName) ? thePackage.models : {};
    const modelNamesToGet = Object.keys(models);
    return modelNamesToGet.sort(common.alphabeticalSort);
  }

  function packageNamesWithNumModels() {
    const packageNamesList = packageNames();
    const packageNamesWithModels = packageNamesList.map(packageName => ({
      name: packageName,
      numModels: modelNames(packageName).length
    }));
    return packageNamesWithModels;
  }

  function storyBookSetupStatus() {
    return store.getState().storyBook.setupStatus;
  }

  function routeNames(packageName) {
    const thePackage = getPackage(packageName);
    const routes = thePackage.routes;
    return Object.keys(routes);
  }

  switch (checkType) {
    case 'reactExtension':
      return reactExtension(...args);
    case 'packageNames':
      return packageNames(...args);
    case 'modelNames':
      return modelNames(...args);
    case 'routeNames':
      return routeNames(...args);
    case 'package':
      return getPackage(...args);
    case 'allPackages':
      return getAllPackages(...args);
    case 'storyBookSetupStatus':
      return storyBookSetupStatus(...args);
    case 'packageNamesWithNumModels':
      return packageNamesWithNumModels(...args);
    default:
      return undefined;
  }
}

function has(checkType, ...args) {
  function nonZeroPackages() {
    const packageNames = get('packageNames');
    return Object.keys(packageNames).length > 0;
  }

  function nonZeroModelsInPackage(packageName) {
    if (!this._isPackageExists(packageName)) return false;
    const thePackage = this._getPackage(packageName);
    const modelNames = Object.keys(thePackage.models);
    return modelNames.length > 0;
  }

  switch (checkType) {
    case 'nonZeroModelsInPackage':
      return nonZeroModelsInPackage(...args);
    case 'nonZeroPackages':
      return nonZeroPackages(...args);
    default:
      return undefined;
  }
}

function set() {}

module.exports = {
  init: init,
  is: is,
  has: has,
  get: get,
  set: set
};
