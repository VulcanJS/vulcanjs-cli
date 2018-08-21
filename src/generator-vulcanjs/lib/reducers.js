const Redux = require('redux');
const _ = require('lodash');

const moduleReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_MODULE': return state;
    default: return state;
  }
};

const modulesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_MODULE': {
      const partialNext = {};
      partialNext[action.moduleName] = moduleReducer(undefined, action);
      return {
        ...state,
        ...partialNext,
      };
    }

    case 'REMOVE_MODULE': {
      return _.pickBy(
        state,
        (value, key) => key !== action.moduleName
      );
    }
    default: return state;
  }
};

const routeReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_ROUTE': return { routePath: action.routePath };
    case 'REMOVE_ROUTE': {
      return _.pickBy(
        state,
        (value, key) => key !== action.routeName
      );
    }
    default: return state;
  }
};

const routesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_ROUTE': {
      const partialNext = {};
      partialNext[action.routeName] = routeReducer(undefined, action);
      return {
        ...state,
        ...partialNext,
      };
    }

    case 'REMOVE_ROUTE': {
      return _.pickBy(
        state,
        (value, key) => key !== action.routeName
      );
    }
    default: return state;
  }
};

const packageReducer = (state = { modules: {}, routes: {} }, action) => {
  switch (action.type) {

    case 'ADD_ROUTE': {
      const prevRoutes = state.routes;
      return {
        ...state,
        routes: routesReducer(prevRoutes, action),
      };
    }

    case 'REMOVE_ROUTE': {
      const prevRoutes = state.routes;
      return {
        ...state,
        routes: routesReducer(prevRoutes, action),
      };
    }

    case 'ADD_MODULE': {
      const prevModules = state.modules;
      return {
        ...state,
        modules: modulesReducer(prevModules, action),
      };
    }

    case 'REMOVE_MODULE': {
      const prevModules = state.modules;
      return {
        ...state,
        modules: modulesReducer(prevModules, action),
      };
    }
    default: return state;
  }
};

const packages = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_PACKAGE': {
      const partialNext = {};
      partialNext[action.packageName] = packageReducer(undefined, {});
      return {
        ...state,
        ...partialNext,
      };
    }

    case 'ADD_ROUTE': {
      const prevPackage = state[action.packageName];
      const partialNext = {};
      partialNext[action.packageName] = packageReducer(
        prevPackage,
        action
      );
      return {
        ...state,
        ...partialNext,
      };
    }

    case 'ADD_MODULE': {
      const prevPackage = state[action.packageName];
      const partialNext = {};
      partialNext[action.packageName] = packageReducer(
        prevPackage,
        action
      );
      return {
        ...state,
        ...partialNext,
      };
    }

    case 'REMOVE_PACKAGE': {
      return _.pickBy(
        state,
        (value, key) => key !== action.packageName
      );
    }

    case 'REMOVE_MODULE': {
      const packageToWork = state[action.packageName];
      const partialNext = {};
      partialNext[action.packageName] = packageReducer(packageToWork, action);
      return {
        ...state,
        ...partialNext,
      };
    }

    case 'REMOVE_ROUTE': {
      const packageToWork = state[action.packageName];
      const partialNext = {};
      partialNext[action.packageName] = packageReducer(packageToWork, action);
      return {
        ...state,
        ...partialNext,
      };
    }

    default: return state;
  }
};

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

const storyBookSetupStatus = (state = 'pending', action) => {
  switch (action.type) {
    case 'SET_STORYBOOK_PENDING': return 'pending';
    case 'SET_STORYBOOK_INSTALLING': return 'installing';
    case 'SET_STORYBOOK_DONT_ASK': return 'dontask';
    case 'SET_STORYBOOK_INSTALLED': return 'installed';
    default: return state;
  }
};

const defaultStoryBookState = {
  isUsed: 'pending',
  setupStatus: 'pending',
};

const storyBook = (state = defaultStoryBookState, action) => {
  switch (action.type) {
    case 'SET_STORYBOOK_SETUP_STATUS': {
      const actions = {
        pending: 'SET_STORYBOOK_PENDING',
        installing: 'SET_STORYBOOK_INSTALLING',
        dontask: 'SET_STORYBOOK_DONTASK',
        installed: 'SET_STORYBOOK_INSTALLED',
      };
      return {
        ...state,
        setupStatus: storyBookSetupStatus(state.setupStatus, {
          type: actions[action.status],
        }),
      };
    }
    default: return state;
  }
};

const reducers = Redux.combineReducers({
  appName,
  isVulcan,
  packageManager,
  reactExtension,
  storyBook,
  packages,
});

module.exports = reducers;
