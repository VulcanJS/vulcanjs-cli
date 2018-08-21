const Redux = require('redux');
const _ = require('lodash');


const appName = (state = '', action) => {
  switch (action.type) {
    case 'SET_APP_NAME': return action.appName;
    default: return state;
  }
};

const isVulcan = (state = false, action) => {
  switch (action.type) {
    case 'SET_IS_VULCAN_TRUE': return true;
    default: return state;
  }
};

const packageManager = (state = 'yarn', action) => {
  switch (action.type) {
    case 'SET_PACKAGE_MANAGER': return action.packageManager;
    default: return state;
  }
};

const reactExtension = (state = 'jsx', action) => {
  switch (action.type) {
    case 'SET_REACT_EXTENSION': return action.reactExtension;
    default: return state;
  }
};


const reducers = Redux.combineReducers({
  appName,
  isVulcan,
  packageManager,
  reactExtension,
});

module.exports = reducers;
