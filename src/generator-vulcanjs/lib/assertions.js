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

    function isModuleExists (packageName, moduleName) {
      if (!lister.moduleExists(packageName, moduleName)) {
        errors.notModuleExists = {
          message: uiText.errors.notModuleExists(packageName, moduleName),
        };
      }
    }

    function notModuleExists (packageName, moduleName) {
      if (lister.moduleExists(packageName, moduleName)) {
        errors.isModuleExists = {
          message: uiText.errors.isModuleExists(packageName, moduleName),
        };
      }
    }

    function hasNonZeroPackages () {
      const packageNames = lister.listPackages();
      if (!packageNames.length) {
        errors.isZeroPackages = {
          message: uiText.errors.isZeroPackages,
        };
      }
    }

    function packageHasNonZeroModules (packageName) {
      this._assertIsPackageExists(packageName);
      if (!this._packageHasNonZeroModules(packageName)) {
        errors.hasZeroModules = {
          message: uiText.errors.hasZeroModules(packageName),
        };
      }
    }

    function isDelete (isDeleting) {
      if (!isDeleting) {
        errors.hasZeroModules = {
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
      case 'isModuleExists': return isModuleExists(...args);
      case 'notModuleExists': return notModuleExists(...args);
      case 'hasNonZeroPackages': return hasNonZeroPackages(...args);
      case 'packageHasNonZeroModules': return packageHasNonZeroModules(...args);
      default: return undefined;
    }
  }
  return { assert, errors };
}

module.exports = {
  setup,
};
