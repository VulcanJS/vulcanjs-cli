'use strict';

var alphabeticalSort = function alphabeticalSort(a, b) {
  var aLower = a.toLowerCase();
  var bLower = b.toLowerCase();
  if (aLower < bLower) return -1;
  if (aLower > bLower) return 1;
  return 0;
};

var numModelsSort = function numModelsSort(a, b) {
  var aHasNonZero = a.numModels > 0;
  var bHasNonZero = b.numModels > 0;
  if (aHasNonZero && bHasNonZero) return 0;
  if (!aHasNonZero && !bHasNonZero) return 0;
  if (!aHasNonZero && bHasNonZero) return 1;
  /* if (aHasNonZero && !bHasNonZero)*/return -1;
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

var schemaPropertyTypes = ['String', 'Number', 'Boolean', 'Array', 'Object', 'Custom'];

var modelParts = ['fragments', 'resolvers', 'mutations', 'schema', 'permissions', 'parameters'];

var vulcanjsRemovableComponents = ['route', 'model', 'package'];

var vulcanjsListableComponents = ['packages', 'routes'];

var manualChoiceValue = '__vjs_manual';
var manualChoice = { name: '[MANUAL]', value: manualChoiceValue };
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
  numModelsSort: numModelsSort,
  reactExtensions: reactExtensions,
  packageManagers: packageManagers,
  visitorTypes: visitorTypes,
  schemaPropertyTypes: schemaPropertyTypes,
  getDefaultChoiceIndex: getDefaultChoiceIndex,
  getSetFromArr: getSetFromArr,
  vulcanjsRemovableComponents: vulcanjsRemovableComponents,
  vulcanjsListableComponents: vulcanjsListableComponents,
  modelParts: modelParts,
  manualChoiceValue: manualChoiceValue,
  manualChoice: manualChoice,
  allChoiceValue: allChoiceValue,
  allChoice: allChoice,
  cloningOptions: cloningOptions
};

module.exports = exposed;
