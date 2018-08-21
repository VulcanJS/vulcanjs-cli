const uiText = require('./ui-text');
const makeLister = require('./lister');

const errors = {};

function setup (generatorSetup) {
  const generator = generatorSetup;
  const lister = makeLister.setup(generator);

  function assert (assertion, ...args) {
    function isVulcan () {
      // TODO: not imlemented yet
      // Idea: check for a package.json file?
      // if (!store.is('vulcan')) {
      //  errors.notVulcan = {
      //    message: uiText.errors.notVulcan,
      //  };
      // }
    }

    function notVulcan () {
      // if (store.is('vulcan')) {
      //  errors.isVulcan = {
      //    message: uiText.errors.isVulcan,
      //  };
      // }
    }

    function isPackageExists (packageName) {
      if (!lister.packageExists(packageName)) {
        errors.notPackageExists = {
          message: uiText.errors.notPackageExists(packageName),
        };
      }
    }

    function notPackageExists (packageName) {
      if (lister.packageExists(packageName)) {
        errors.isPackageExists = {
          message: uiText.errors.isPackageExists(packageName),
        };
      }
    }

    function isModelExists (packageName, modelName) {
      if (!lister.moduleExists(packageName, modelName)) {
        errors.notModelExists = {
          message: uiText.errors.notModelExists(packageName, modelName),
        };
      }
    }

    function notModelExists (packageName, modelName) {
      if (lister.moduleExists(packageName, modelName)) {
        errors.isModelExists = {
          message: uiText.errors.isModelExists(packageName, modelName),
        };
      }
    }

    function hasNonZeroPackages () {
      const packageNames = lister.listPackages();
      if (packageNames.length) {
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

    function isDelete (isDeleting) {
      if (!isDeleting) {
        errors.hasZeroModels = {
          message: uiText.errors.isDelete,
        };
      }
    }

    switch (assertion) {
      case 'isVulcan': return isVulcan(...args);
      case 'isDelete': return isDelete(...args);
      case 'notVulcan': return notVulcan(...args);
      case 'isPackageExists': return isPackageExists(...args);
      case 'notPackageExists': return notPackageExists(...args);
      case 'isModelExists': return isModelExists(...args);
      case 'notModelExists': return notModelExists(...args);
      case 'hasNonZeroPackages': return hasNonZeroPackages(...args);
      case 'packageHasNonZeroModels': return packageHasNonZeroModels(...args);
      default: return undefined;
    }
  }
  return { assert, errors };
}

module.exports = {
  setup,
};
