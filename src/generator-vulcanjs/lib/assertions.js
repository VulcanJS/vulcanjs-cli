const store = require('./store');
const uiText = require('./ui-text');

const errors = {};

function assert (assertion, ...args) {
  function isVulcan () {
    if (!store.is('vulcan')) {
      errors.notVulcan = {
        message: uiText.errors.notVulcan,
      };
    }
  }

  function notVulcan () {
    if (store.is('vulcan')) {
      errors.isVulcan = {
        message: uiText.errors.isVulcan,
      };
    }
  }

  function isPackageExists (packageName) {
    if (!store.is('packageExists', packageName)) {
      errors.notPackageExists = {
        message: uiText.errors.notPackageExists(packageName),
      };
    }
  }

  function notPackageExists (packageName) {
    if (store.is('packageExists', packageName)) {
      errors.isPackageExists = {
        message: uiText.errors.isPackageExists(packageName),
      };
    }
  }

  function isModelExists (packageName, modelName) {
    if (!store.is('modelExists', packageName, modelName)) {
      errors.notModelExists = {
        message: uiText.errors.notModelExists(packageName, modelName),
      };
    }
  }

  function notModelExists (packageName, modelName) {
    if (store.is('modelExists', packageName, modelName)) {
      errors.isModelExists = {
        message: uiText.errors.isModelExists(packageName, modelName),
      };
    }
  }

  function hasNonZeroPackages () {
    if (!store.has('nonZeroPackages')) {
      errors.isZeroPackages = {
        message: uiText.errors.isZeroPackages,
      };
    }
  }

  function packageHasNonZeroModels (packageName) {
    this._assertIsPackageExists(packageName);
    if (!this._packageHasNonZeroModels(packageName)) {
      errors.hasZeroModels = {
        message: uiText.errors.hasZeroModels(packageName),
      };
    }
  }

  switch (assertion) {
    case 'isVulcan' : return isVulcan(...args);
    case 'notVulcan' : return notVulcan(...args);
    case 'isPackageExists' : return isPackageExists(...args);
    case 'notPackageExists' : return notPackageExists(...args);
    case 'isModelExists' : return isModelExists(...args);
    case 'notModelExists' : return notModelExists(...args);
    case 'hasNonZeroPackages' : return hasNonZeroPackages(...args);
    case 'packageHasNonZeroModels' : return packageHasNonZeroModels(...args);
    default : return undefined;
  }
}

module.exports = {
  assert,
  errors,
};
