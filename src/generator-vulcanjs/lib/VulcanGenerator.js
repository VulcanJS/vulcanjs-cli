const Generator = require('yeoman-generator');
const beautify = require('gulp-beautify');
const questions = require('./questions');
const finalizers = require('./finalizers');
const makeAssertions = require('./assertions');
const storeFactory = require('./store');
const pathFinder = require('./path-finder');
const optionsManager = require('./optionsManager');
const chalk = require('chalk');
const gulpFilter = require('gulp-filter');

let store;
let errors;
module.exports = class VulcanGenerator extends Generator {
  constructor (args, options) {
    super(args, options);
    if (!store) {
      const allConfig = this.config.getAll();
      store = storeFactory.init(allConfig);
    }

    const assertions = makeAssertions.setup(this);
    if (!errors) {
      errors = assertions.errors;
    }
    const beautified = beautify({
      indent_size: 2,
      brace_style: 'collapse, preserve-inline',
    });
    const jsxFilter = gulpFilter(['!**/*.jsx'], { restore: true });
    this.registerTransformStream([
      jsxFilter,
      beautified,
      jsxFilter.restore,
    ]);
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
  Helper to test if a question is necessary
  */
  _needArg (argument) {
    return typeof this.options[argument] === 'undefined';
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
    const errorsArr = errorKeys.map((errorKey) => errors[errorKey]);
    errorsArr.forEach((error, index) => {
      const errorNo = `Error (${index})`;
      const message = `\n${errorNo}: ${chalk.red(error.message)}`;
      this.log(message);
      //      this.env.error(message);
    });
    process.exit(1);
  }

  /*
    Life-cycle functions
  */

  _end () {
    if (!this._hasNoErrors) { this._logAllErrors(); }
  }

  _registerArguments () { }

};
