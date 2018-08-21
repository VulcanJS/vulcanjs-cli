'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var Redux = require('redux');
var _ = require('lodash');

var moduleReducer = function moduleReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case 'ADD_MODULE':
      return state;
    default:
      return state;
  }
};

var modulesReducer = function modulesReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case 'ADD_MODULE':
      {
        var partialNext = {};
        partialNext[action.moduleName] = moduleReducer(undefined, action);
        return _extends({}, state, partialNext);
      }

    case 'REMOVE_MODULE':
      {
        return _.pickBy(state, function (value, key) {
          return key !== action.moduleName;
        });
      }
    default:
      return state;
  }
};

var routeReducer = function routeReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case 'ADD_ROUTE':
      return { routePath: action.routePath };
    case 'REMOVE_ROUTE':
      {
        return _.pickBy(state, function (value, key) {
          return key !== action.routeName;
        });
      }
    default:
      return state;
  }
};

var routesReducer = function routesReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case 'ADD_ROUTE':
      {
        var partialNext = {};
        partialNext[action.routeName] = routeReducer(undefined, action);
        return _extends({}, state, partialNext);
      }

    case 'REMOVE_ROUTE':
      {
        return _.pickBy(state, function (value, key) {
          return key !== action.routeName;
        });
      }
    default:
      return state;
  }
};

var packageReducer = function packageReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { modules: {}, routes: {} };
  var action = arguments[1];

  switch (action.type) {

    case 'ADD_ROUTE':
      {
        var prevRoutes = state.routes;
        return _extends({}, state, {
          routes: routesReducer(prevRoutes, action)
        });
      }

    case 'REMOVE_ROUTE':
      {
        var _prevRoutes = state.routes;
        return _extends({}, state, {
          routes: routesReducer(_prevRoutes, action)
        });
      }

    case 'ADD_MODULE':
      {
        var prevModules = state.modules;
        return _extends({}, state, {
          modules: modulesReducer(prevModules, action)
        });
      }

    case 'REMOVE_MODULE':
      {
        var _prevModules = state.modules;
        return _extends({}, state, {
          modules: modulesReducer(_prevModules, action)
        });
      }
    default:
      return state;
  }
};

var packages = function packages() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case 'ADD_PACKAGE':
      {
        var partialNext = {};
        partialNext[action.packageName] = packageReducer(undefined, {});
        return _extends({}, state, partialNext);
      }

    case 'ADD_ROUTE':
      {
        var prevPackage = state[action.packageName];
        var _partialNext = {};
        _partialNext[action.packageName] = packageReducer(prevPackage, action);
        return _extends({}, state, _partialNext);
      }

    case 'ADD_MODULE':
      {
        var _prevPackage = state[action.packageName];
        var _partialNext2 = {};
        _partialNext2[action.packageName] = packageReducer(_prevPackage, action);
        return _extends({}, state, _partialNext2);
      }

    case 'REMOVE_PACKAGE':
      {
        return _.pickBy(state, function (value, key) {
          return key !== action.packageName;
        });
      }

    case 'REMOVE_MODULE':
      {
        var packageToWork = state[action.packageName];
        var _partialNext3 = {};
        _partialNext3[action.packageName] = packageReducer(packageToWork, action);
        return _extends({}, state, _partialNext3);
      }

    case 'REMOVE_ROUTE':
      {
        var _packageToWork = state[action.packageName];
        var _partialNext4 = {};
        _partialNext4[action.packageName] = packageReducer(_packageToWork, action);
        return _extends({}, state, _partialNext4);
      }

    default:
      return state;
  }
};

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

var storyBookSetupStatus = function storyBookSetupStatus() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'pending';
  var action = arguments[1];

  switch (action.type) {
    case 'SET_STORYBOOK_PENDING':
      return 'pending';
    case 'SET_STORYBOOK_INSTALLING':
      return 'installing';
    case 'SET_STORYBOOK_DONT_ASK':
      return 'dontask';
    case 'SET_STORYBOOK_INSTALLED':
      return 'installed';
    default:
      return state;
  }
};

var defaultStoryBookState = {
  isUsed: 'pending',
  setupStatus: 'pending'
};

var storyBook = function storyBook() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultStoryBookState;
  var action = arguments[1];

  switch (action.type) {
    case 'SET_STORYBOOK_SETUP_STATUS':
      {
        var actions = {
          pending: 'SET_STORYBOOK_PENDING',
          installing: 'SET_STORYBOOK_INSTALLING',
          dontask: 'SET_STORYBOOK_DONTASK',
          installed: 'SET_STORYBOOK_INSTALLED'
        };
        return _extends({}, state, {
          setupStatus: storyBookSetupStatus(state.setupStatus, {
            type: actions[action.status]
          })
        });
      }
    default:
      return state;
  }
};

var reducers = Redux.combineReducers({
  appName: appName,
  isVulcan: isVulcan,
  packageManager: packageManager,
  reactExtension: reactExtension,
  storyBook: storyBook,
  packages: packages
});

module.exports = reducers;
