'use strict';

var uiText = require('./ui-text');

var allOptions = {
  appName: {
    type: String,
    required: false,
    alias: 'n',
    desc: uiText.descriptions.appName
  },
  packageName: {
    type: String,
    required: false,
    alias: 'p',
    desc: uiText.descriptions.packageName
  },
  modelName: {
    type: String,
    required: false,
    alias: 'm',
    desc: uiText.descriptions.modelName
  },
  componentName: {
    type: String,
    required: false,
    alias: 'c',
    desc: uiText.descriptions.componentName
  },
  layoutName: {
    type: String,
    required: false,
    alias: 'l',
    desc: uiText.descriptions.layoutName
  },
  routeName: {
    type: String,
    required: false,
    alias: 'r',
    desc: uiText.descriptions.routeName
  },
  routePath: {
    type: String,
    required: false,
    alias: 'rp',
    desc: uiText.descriptions.routePath
  },
  packageManager: {
    type: String,
    required: false,
    alias: 'pm',
    desc: uiText.descriptions.packageManager
  },
  dontAsk: {
    type: Boolean,
    required: false,
    alias: 'd',
    desc: uiText.descriptions.dontAsk
  },
  vulcanjsRemovableComponent: {
    type: String,
    required: false,
    alias: 'vc',
    desc: uiText.descriptions.vulcanjsRemovableComponent
  },
  vulcanjsListableComponent: {
    type: String,
    required: false,
    alias: 'vc',
    desc: uiText.descriptions.vulcanjsListableComponent
  }
};

function setup(generatorSetup) {
  var generator = generatorSetup;
  function register() {
    function registerSingleOption(optionName) {
      generator.option(optionName, allOptions[optionName]);
    }

    for (var _len = arguments.length, optionNames = Array(_len), _key = 0; _key < _len; _key++) {
      optionNames[_key] = arguments[_key];
    }

    optionNames.forEach(function (optionName) {
      registerSingleOption(optionName);
    });
  }
  return register;
}

module.exports = {
  setup: setup,
  allOptions: allOptions
};
