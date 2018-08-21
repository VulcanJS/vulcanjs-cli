'use strict';

var uiText = require('./ui-text');
var makeLister = require('./lister');

var errors = {};

function setup(generatorSetup) {
  var generator = generatorSetup;
  var lister = makeLister.setup(generator);

  function assert(assertion) {
    function isVulcan() {
      // TODO: not imlemented yet
      // Idea: check for a package.json file?
      // if (!store.is('vulcan')) {
      //  errors.notVulcan = {
      //    message: uiText.errors.notVulcan,
      //  };
      // }
    }

    function notVulcan() {
      // if (store.is('vulcan')) {
      //  errors.isVulcan = {
      //    message: uiText.errors.isVulcan,
      //  };
      // }
    }

    function isPackageExists(packageName) {
      if (!lister.packageExists(packageName)) {
        errors.notPackageExists = {
          message: uiText.errors.notPackageExists(packageName)
        };
      }
    }

    function notPackageExists(packageName) {
      if (lister.packageExists(packageName)) {
        errors.isPackageExists = {
          message: uiText.errors.isPackageExists(packageName)
        };
      }
    }

    function isModuleExists(packageName, moduleName) {
      if (!lister.moduleExists(packageName, moduleName)) {
        errors.notModuleExists = {
          message: uiText.errors.notModuleExists(packageName, moduleName)
        };
      }
    }

    function notModuleExists(packageName, moduleName) {
      if (lister.moduleExists(packageName, moduleName)) {
        errors.isModuleExists = {
          message: uiText.errors.isModuleExists(packageName, moduleName)
        };
      }
    }

    function hasNonZeroPackages() {
      var packageNames = lister.listPackages();
      if (packageNames.length) {
        errors.isZeroPackages = {
          message: uiText.errors.isZeroPackages
        };
      }
    }

    function packageHasNonZeroModules(packageName) {
      this._assertIsPackageExists(packageName);
      if (!this._packageHasNonZeroModules(packageName)) {
        errors.hasZeroModules = {
          message: uiText.errors.hasZeroModules(packageName)
        };
      }
    }

    function isDelete(isDeleting) {
      if (!isDeleting) {
        errors.hasZeroModules = {
          message: uiText.errors.isDelete
        };
      }
    }

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    switch (assertion) {
      case 'isVulcan':
        return isVulcan.apply(undefined, args);
      case 'isDelete':
        return isDelete.apply(undefined, args);
      case 'notVulcan':
        return notVulcan.apply(undefined, args);
      case 'isPackageExists':
        return isPackageExists.apply(undefined, args);
      case 'notPackageExists':
        return notPackageExists.apply(undefined, args);
      case 'isModuleExists':
        return isModuleExists.apply(undefined, args);
      case 'notModuleExists':
        return notModuleExists.apply(undefined, args);
      case 'hasNonZeroPackages':
        return hasNonZeroPackages.apply(undefined, args);
      case 'packageHasNonZeroModules':
        return packageHasNonZeroModules.apply(undefined, args);
      default:
        return undefined;
    }
  }
  return { assert: assert, errors: errors };
}

module.exports = {
  setup: setup
};
