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

    function isModelExists(packageName, modelName) {
      if (!lister.moduleExists(packageName, modelName)) {
        errors.notModelExists = {
          message: uiText.errors.notModelExists(packageName, modelName)
        };
      }
    }

    function notModelExists(packageName, modelName) {
      if (lister.moduleExists(packageName, modelName)) {
        errors.isModelExists = {
          message: uiText.errors.isModelExists(packageName, modelName)
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

    function packageHasNonZeroModels(packageName) {
      this._assertIsPackageExists(packageName);
      if (!this._packageHasNonZeroModels(packageName)) {
        errors.hasZeroModels = {
          message: uiText.errors.hasZeroModels(packageName)
        };
      }
    }

    function isDelete(isDeleting) {
      if (!isDeleting) {
        errors.hasZeroModels = {
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
      case 'isModelExists':
        return isModelExists.apply(undefined, args);
      case 'notModelExists':
        return notModelExists.apply(undefined, args);
      case 'hasNonZeroPackages':
        return hasNonZeroPackages.apply(undefined, args);
      case 'packageHasNonZeroModels':
        return packageHasNonZeroModels.apply(undefined, args);
      default:
        return undefined;
    }
  }
  return { assert: assert, errors: errors };
}

module.exports = {
  setup: setup
};
