const store = require('./store');
const uiText = require('./ui-text');

function combineValidators(...fns) {
  return function reducedValidator(input) {
    return fns.reduce((acc, curValidator) => {
      if (typeof acc === 'string') return acc;
      return curValidator(input);
    }, true);
  };
}

const assertNonEmpty = input => {
  if (input) return true;
  return uiText.errors.isEmpty;
};

const assertNotPackageExists = packageName => {
  if (!store.is('packageExists', packageName)) return true;
  return uiText.errors.isPackageExists(packageName);
};

const assertNotModelExists = (packageName, modelName) => {
  if (!store.is('modelExists', packageName, modelName)) return true;
  return uiText.errors.isModelExists(packageName, modelName);
};

const generateNotModelExists = packageName => input => assertNotModelExists(packageName, input);

module.exports = {
  combineValidators: combineValidators,
  assertNonEmpty: assertNonEmpty,
  assertNotPackageExists: assertNotPackageExists,
  generateNotModelExists: generateNotModelExists
};
