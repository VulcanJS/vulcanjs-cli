'use strict';

var Redux = require('redux');
var _ = require('lodash');

var appName = function appName() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var action = arguments[1];

  switch (action.type) {
    case 'SET_APP_NAME':
      return action.appName;
    default:
      return state;
  }
};

var isVulcan = function isVulcan() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments[1];

  switch (action.type) {
    case 'SET_IS_VULCAN_TRUE':
      return true;
    default:
      return state;
  }
};

var packageManager = function packageManager() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'yarn';
  var action = arguments[1];

  switch (action.type) {
    case 'SET_PACKAGE_MANAGER':
      return action.packageManager;
    default:
      return state;
  }
};

var reactExtension = function reactExtension() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'jsx';
  var action = arguments[1];

  switch (action.type) {
    case 'SET_REACT_EXTENSION':
      return action.reactExtension;
    default:
      return state;
  }
};

var reducers = Redux.combineReducers({
  appName: appName,
  isVulcan: isVulcan,
  packageManager: packageManager,
  reactExtension: reactExtension
});

module.exports = reducers;
