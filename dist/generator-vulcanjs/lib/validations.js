'use strict';

var uiText = require('./ui-text');
var makeLister = require('./lister');

function combineValidators() {
  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function reducedValidator(input) {
    return fns.reduce(function (acc, curValidator) {
      if (typeof acc === 'string') return acc;
      return curValidator(input);
    }, true);
  };
}

function setup(generatorSetup) {
  var generator = generatorSetup;
  var lister = makeLister.setup(generator);

  var assertNonEmpty = function assertNonEmpty(input) {
    if (input) return true;
    return uiText.errors.isEmpty;
  };

  var assertNotPackageExists = function assertNotPackageExists(packageName) {
    if (!lister.packageExists(packageName)) return true;
    return uiText.errors.isPackageExists(packageName);
  };

  var assertNotModuleExists = function assertNotModuleExists(packageName, moduleName) {
    if (!lister.moduleExists(packageName, moduleName)) return true;
    return uiText.errors.isModuleExists(packageName, moduleName);
  };

  var generateNotModuleExists = function generateNotModuleExists(packageName) {
    return function (input) {
      return assertNotModuleExists(packageName, input);
    };
  };
  return {
    assertNonEmpty: assertNonEmpty,
    assertNotPackageExists: assertNotPackageExists,
    assertNotModuleExists: assertNotModuleExists,
    generateNotModuleExists: generateNotModuleExists
  };
}

module.exports = {
  combineValidators: combineValidators,
  setup: setup
};
