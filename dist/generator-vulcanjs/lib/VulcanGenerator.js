'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Generator = require('yeoman-generator');
var beautify = require('gulp-beautify');
var questions = require('./questions');
var finalizers = require('./finalizers');
var assertions = require('./assertions');
var storeFactory = require('./store');
var pathFinder = require('./path-finder');
var optionsManager = require('./optionsManager');
var chalk = require('chalk');

var store = void 0;
var errors = void 0;
module.exports = function (_Generator) {
  _inherits(VulcanGenerator, _Generator);

  function VulcanGenerator(args, options) {
    _classCallCheck(this, VulcanGenerator);

    var _this = _possibleConstructorReturn(this, (VulcanGenerator.__proto__ || Object.getPrototypeOf(VulcanGenerator)).call(this, args, options));

    if (!store) {
      var allConfig = _this.config.getAll();
      store = storeFactory.init(allConfig);
    }
    if (!errors) {
      errors = assertions.errors;
    }
    _this.registerTransformStream(beautify({
      indent_size: 2,
      brace_style: 'collapse, preserve-inline'
    }));
    _this._assert = assertions.assert;
    _this._registerOptions = optionsManager.setup(_this);
    _this._finalize = finalizers.setup(_this);
    _this._getPath = pathFinder.setup(_this);
    _this._getQuestions = questions.setup(_this);
    _this._registerOptions('dontAsk');
    _this._registerArguments();
    _this.inputProps = {};
    _this.props = {};
    return _this;
  }

  /*
    State management
  */

  _createClass(VulcanGenerator, [{
    key: '_commitStore',
    value: function _commitStore() {
      var _this2 = this;

      var storeKeys = Object.keys(store.getState());
      storeKeys.forEach(function (key) {
        _this2.config.set(key, store.getState()[key]);
      });
    }
  }, {
    key: '_dispatch',
    value: function _dispatch(action) {
      return store.dispatch(action);
    }

    /*
      Helpers that determine whether a task can be performed
    */

  }, {
    key: '_canPrompt',
    value: function _canPrompt() {
      return this._hasNoErrors();
    }
  }, {
    key: '_canWrite',
    value: function _canWrite() {
      return this._hasNoErrors();
    }
  }, {
    key: '_canConfigure',
    value: function _canConfigure() {
      return this._hasNoErrors();
    }
  }, {
    key: '_canInstall',
    value: function _canInstall() {
      return this._hasNoErrors();
    }

    /*
      Error management
    */

  }, {
    key: '_hasNoErrors',
    value: function _hasNoErrors() {
      var errorKeys = Object.keys(errors);
      return errorKeys.length === 0;
    }
  }, {
    key: '_logAllErrors',
    value: function _logAllErrors() {
      var _this3 = this;

      var errorKeys = Object.keys(errors);
      var errorsArr = errorKeys.map(function (errorKey) {
        return errors[errorKey];
      });
      errorsArr.forEach(function (error, index) {
        var errorNo = 'Error (' + index + ')';
        var message = '\n' + errorNo + ': ' + chalk.red(error.message);
        _this3.env.error(message);
      });
    }

    /*
      Life-cycle functions
    */

  }, {
    key: '_end',
    value: function _end() {
      this._logAllErrors();
    }
  }, {
    key: '_registerArguments',
    value: function _registerArguments() {}
  }]);

  return VulcanGenerator;
}(Generator);
