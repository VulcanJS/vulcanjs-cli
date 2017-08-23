'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var chalk = require('chalk');
var VulcanGenerator = require('../../lib/VulcanGenerator');
var confQuestions = require("./questions");
var store = require('mem-fs').create();
var memFs = require('mem-fs-editor').create(store);

module.exports = function (_VulcanGenerator) {
  _inherits(_class, _VulcanGenerator);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: '_registerArguments',
    value: function _registerArguments() {}
  }, {
    key: 'initializing',
    value: function initializing() {
      var _this2 = this;

      this._getQuestions = confQuestions.setup();

      // Ensure vulcan project
      this._assert('isVulcan');
      if (!this._canPrompt()) {
        return false;
      }

      // Move to project root
      this.destinationRoot(this.destinationPath());

      // Make sure the settings.json file exists
      this.settings = memFs.readJSON("settings.json");
      if (!this.settings) {
        this.settings = memFs.readJSON("sample_settings.json");
        if (!this.settings) {
          throw "Failed to retrieve a sample settings.json!";
        }
        this.copiedSample = true;
      }

      // Prompt for questions
      return this.prompt([{
        type: 'checkbox',
        pageSize: 20,
        name: 'parametersList',
        message: 'Which parameters do you want to configure',
        choices: [{ name: 'Port', value: 'port', checked: false }]
      }]).then(function (answers) {
        _this2.questionsList = answers.parametersList;
      });
      ;
    }
  }, {
    key: 'prompting',
    value: function prompting() {

      var questions = this._getQuestions.apply(this, _toConsumableArray(this.questionsList));
      console.log(questions);
      return this.prompt(questions).then(function (answers) {
        console.log(answers);
      });
    }
  }, {
    key: 'writing',
    value: function writing() {
      if (!this._canWrite()) {
        return;
      }
      memFs.writeJSON("settings.json", this.settings);
      memFs.commit([], function () {});
      /*
       memFs.extendJSON('settings.json', {a:1});
       memFs.commit([], () => { console.log("ok") } )
       */
    }
  }, {
    key: 'end',
    value: function end() {
      this._end();
    }
  }]);

  return _class;
}(VulcanGenerator);
