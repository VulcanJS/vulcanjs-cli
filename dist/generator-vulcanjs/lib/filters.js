'use strict';

var dashify = require('dashify');
var camelCase = require('camelcase');
var pascalCase = require('pascal-case');

function packageName(toFilter) {
  return dashify(toFilter);
}

function appName(toFilter) {
  return dashify(toFilter);
}

function modelName(toFilter) {
  return camelCase(toFilter);
}

function componentName(toFilter) {
  return pascalCase(toFilter);
}

function filter(filterType, toFilter) {
  switch (filterType) {
    case 'packageName':
      return packageName(toFilter);
    case 'appName':
      return appName(toFilter);
    case 'modelName':
      return modelName(toFilter);
    case 'componentName':
      return componentName(toFilter);
    default:
      return toFilter;
  }
}

module.exports = {
  filter: filter
};
