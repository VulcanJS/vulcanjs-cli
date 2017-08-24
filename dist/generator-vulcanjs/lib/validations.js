'use strict';

var store = require('./store');
var uiText = require('./ui-text');

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

var assertNonEmpty = function assertNonEmpty(input) {
  if (input) return true;
  return uiText.errors.isEmpty;
};

var assertNotPackageExists = function assertNotPackageExists(packageName) {
  if (!store.is('packageExists', packageName)) return true;
  return uiText.errors.isPackageExists(packageName);
};

var assertNotModelExists = function assertNotModelExists(packageName, modelName) {
  if (!store.is('modelExists', packageName, modelName)) return true;
  return uiText.errors.isModelExists(packageName, modelName);
};

var generateNotModelExists = function generateNotModelExists(packageName) {
  return function (input) {
    return assertNotModelExists(packageName, input);
  };
};

module.exports = {
  combineValidators: combineValidators,
  assertNonEmpty: assertNonEmpty,
  assertNotPackageExists: assertNotPackageExists,
  generateNotModelExists: generateNotModelExists
};
