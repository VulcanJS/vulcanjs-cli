'use strict';

var validations = require('../../lib/validations');

function setup() {
  function get() {

    function port() {
      return {
        type: 'input',
        name: 'port',
        message: 'Port:',
        default: 3000,
        validate: validations.assertNonEmpty
      };
    }

    function getSingleQuestion(questionName) {
      switch (questionName) {
        case 'port':
          return port();
        default:
          return undefined;
      }
    }

    for (var _len = arguments.length, questionNames = Array(_len), _key = 0; _key < _len; _key++) {
      questionNames[_key] = arguments[_key];
    }

    return questionNames.map(getSingleQuestion);
  }

  return get;
}

module.exports = {
  setup: setup
};
