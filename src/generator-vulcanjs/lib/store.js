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

  function modelExists (packageName, modelName) {
    const filteredModelName = filter('modelName', modelName);
    return (packageExists(packageName)) &&
    !!store.getState().packages[packageName].models[filteredModelName];
  }

  switch (checkType) {
    case 'packageExists' : return packageExists(...args);
    case 'modelExists' : return modelExists(...args);
    case 'vulcan' : return vulcan(...args);
    default : return undefined;
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

  function modelNames (packageName) {
    const thePackage = getPackage(packageName);
    const models = is('packageExists', packageName) ?
      thePackage.models :
      {};
    const modelNamesToGet = Object.keys(models);
    return modelNamesToGet.sort(common.alphabeticalSort);
  }

  function packageNamesWithNumModels () {
    const packageNamesList = packageNames();
    const packageNamesWithModels = packageNamesList.map((packageName) => ({
      name: packageName,
      numModels: modelNames(packageName).length,
    }));
    return packageNamesWithModels;
  }

  function storyBookSetupStatus () {
    return store.getState().storyBook.setupStatus;
  }

  function routeNames (packageName) {
    const thePackage = getPackage(packageName);
    const routes = thePackage.routes;
    const routeNamesToGet = Object.keys(routes);
    return routeNamesToGet.sort(common.alphabeticalSort);
  }

  switch (checkType) {
    case 'reactExtension' : return reactExtension(...args);
    case 'packageNames' : return packageNames(...args);
    case 'modelNames' : return modelNames(...args);
    case 'routeNames' : return routeNames(...args);
    case 'package' : return getPackage(...args);
    case 'storyBookSetupStatus' : return storyBookSetupStatus(...args);
    case 'packageNamesWithNumModels' : return packageNamesWithNumModels(...args);
    default : return undefined;
  }
}

function num (checkType, ...args) {
  function routes (packageName) {
    const routeNames = get('routeNames', packageName);
    return routeNames.length;
  }

  function models (packageName) {
    const modelNames = get('modelNames', packageName);
    return modelNames.length;
  }

  switch (checkType) {
    case 'routes': return routes(...args);
    case 'models': return models(...args);
    default: return undefined;
  }
}

function has (checkType, ...args) {
  function nonZeroPackages () {
    const packageNames = get('packageNames');
    return Object.keys(packageNames).length > 0;
  }

  function nonZeroModelsInPackage (packageName) {
    if (!this._isPackageExists(packageName)) return false;
    const thePackage = this._getPackage(packageName);
    const modelNames = Object.keys(thePackage.models);
    return modelNames.length > 0;
  }

  switch (checkType) {
    case 'nonZeroModelsInPackage': return nonZeroModelsInPackage(...args);
    case 'nonZeroPackages': return nonZeroPackages(...args);
    default : return undefined;
  }
}

module.exports = {
  init,
  is,
  has,
  get,
  num,
};
