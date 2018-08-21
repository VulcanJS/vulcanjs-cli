'use strict';

var alphabeticalSort = function alphabeticalSort(a, b) {
  var aLower = a.toLowerCase();
  var bLower = b.toLowerCase();
  if (aLower < bLower) return -1;
  if (aLower > bLower) return 1;
  return 0;
};

var numModulesSort = function numModulesSort(a, b) {
  var aHasNonZero = a.numModules > 0;
  var bHasNonZero = b.numModules > 0;
  if (aHasNonZero && bHasNonZero) return 0;
  if (!aHasNonZero && !bHasNonZero) return 0;
  if (!aHasNonZero && bHasNonZero) return 1;
  /* if (aHasNonZero && !bHasNonZero) */return -1;
};

var getSetFromArr = function getSetFromArr(arr) {
  var set = {};
  arr.forEach(function (elem) {
    set[elem] = true;
  });
  return set;
};

var reactExtensions = ['jsx', 'js'];

var cloningOptions = ['fast', 'complete'];

var packageManagers = ['yarn', 'npm'];

var visitorTypes = ['Guests', 'Members', 'Admins'];

var schemaPropertyTypes = ['String', 'Number', 'Array', 'Object', 'Custom'];

var moduleParts = ['fragments', 'resolvers', 'mutations', 'schema', 'permissions', 'parameters'];

var vulcanjsRemovableComponents = ['route', 'module', 'package'];

var vulcanjsListableComponents = ['packages'];

var allChoiceValue = '__vjs_all';
var allChoice = { name: '[ALL]', value: allChoiceValue };

var getDefaultChoiceIndex = function getDefaultChoiceIndex(choices, option) {
  var index = choices.findIndex(function (elem) {
    return elem === option;
  });
  return Math.max(index, 0);
};

var exposed = {
  alphabeticalSort: alphabeticalSort,
  numModulesSort: numModulesSort,
  reactExtensions: reactExtensions,
  packageManagers: packageManagers,
  visitorTypes: visitorTypes,
  schemaPropertyTypes: schemaPropertyTypes,
  getDefaultChoiceIndex: getDefaultChoiceIndex,
  getSetFromArr: getSetFromArr,
  vulcanjsRemovableComponents: vulcanjsRemovableComponents,
  vulcanjsListableComponents: vulcanjsListableComponents,
  moduleParts: moduleParts,
  allChoiceValue: allChoiceValue,
  allChoice: allChoice,
  cloningOptions: cloningOptions
};

module.exports = exposed;
