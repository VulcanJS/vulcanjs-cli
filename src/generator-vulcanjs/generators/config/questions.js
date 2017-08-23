const validations = require('../../lib/validations');

function setup () {
  function get (...questionNames) {

    function port () {
      return {
        type: 'input',
        name: 'port',
        message: 'Port:',
        default: 3000,
        validate: validations.assertNonEmpty,
      };
    }


    function getSingleQuestion (questionName) {
      switch (questionName) {
        case 'port': return port();
        default: return undefined;
      }
    }

    return questionNames.map(getSingleQuestion);
  }

  return get;
}

module.exports = {
  setup,
};
