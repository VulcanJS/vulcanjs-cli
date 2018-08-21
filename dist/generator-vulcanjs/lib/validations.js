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

  var assertNotModelExists = function assertNotModelExists(packageName, modelName) {
    if (!lister.moduleExists(packageName, modelName)) return true;
    return uiText.errors.isModelExists(packageName, modelName);
  };

  var generateNotModelExists = function generateNotModelExists(packageName) {
    return function (input) {
      return assertNotModelExists(packageName, input);
    };
  };
  return {
    assertNonEmpty: assertNonEmpty,
    assertNotPackageExists: assertNotPackageExists,
    assertNotModelExists: assertNotModelExists,
    generateNotModelExists: generateNotModelExists
  };
}

module.exports = {
  combineValidators: combineValidators,
  setup: setup
};
