const Generator = require('yeoman-generator');
const beautify = require('gulp-beautify');
const questions = require('./questions');
const finalizers = require('./finalizers');
const assertions = require('./assertions');
const storeFactory = require('./store');
const pathFinder = require('./path-finder');
const optionsManager = require('./optionsManager');

let store;
let errors;

module.exports = class VulcanGenerator extends Generator {
  constructor (args, options) {
    super(args, options);
    if (!store) {
      const allConfig = this.config.getAll();
      store = storeFactory.init(allConfig);
    }
    if (!errors) {
      errors = assertions.errors;
    }
    this.registerTransformStream(
      beautify({ indent_size: 2 })
    );
    this._assert = assertions.assert;
    this._registerOptions = optionsManager.setup(this);
    this._finalize = finalizers.setup(this);
    this._getPath = pathFinder.setup(this);
    this._getQuestions = questions.setup(this);
    this._registerOptions('dontAsk');
    this._registerArguments();
    this.inputProps = {};
    this.props = {};
  }

  /*
    State management
  */

  _commitStore () {
    const storeKeys = Object.keys(store.getState());
    storeKeys.forEach((key) => {
      this.config.set(key, store.getState()[key]);
    });
  }

  _dispatch (action) {
    return store.dispatch(action);
  }

  /*
    Helpers that determine whether a task can be performed
  */

  _canPrompt () {
    return this._hasNoErrors();
  }

  _canWrite () {
    return this._hasNoErrors();
  }

  _canConfigure () {
    return this._hasNoErrors();
  }

  _canInstall () {
    return this._hasNoErrors();
  }


  /*
    Error management
  */

  _hasNoErrors () {
    const errorKeys = Object.keys(errors);
    return errorKeys.length === 0;
  }

  _logAllErrors () {
    const errorKeys = Object.keys(errors);
    const errorsArr = errorKeys.map(errorKey => errors[errorKey]);
    errorsArr.forEach((error, index) => {
      const errorNo = `Error (${index}):`;
      const message = `${errorNo} \n\n ${error.message}`;
      this.env.error(message);
    });
  }

  /*
    Life-cycle functions
  */

  _end () {
    this._logAllErrors();
  }

  _registerArguments () {}

};
