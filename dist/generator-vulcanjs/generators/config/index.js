'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var chalk = require('chalk');
var VulcanGenerator = require('../../lib/VulcanGenerator');
var confQuestions = require("./questions");
var sh = require("../../lib/sessionHandler");
var sessionHandler = new sh();

module.exports = function (_VulcanGenerator) {
  _inherits(_class, _VulcanGenerator);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'initializing',
    value: function initializing() {
      var _this2 = this;

      // Ensure vulcan project
      this._assert('isVulcan');
      if (!this._canPrompt()) {
        return false;
      }

      // Move to project root
      this.destinationRoot(this.destinationPath());

      var that = this;
      var generator = this;
      var newQuestion = function newQuestion() {
        return _this2.prompt([{
          type: 'list',
          name: 'action',
          message: 'Select a category to configure, or exit.',
          choices: [{ name: 'Start options (port, packages location,...)', value: 'start', checked: false }, { name: 'Site informations (title, image,...)', value: 'public', checked: false }, { name: 'Emailing  (address, mailchimp,...)', value: 'emailing', checked: false }, { name: 'Quit', value: 'quit', checked: false }]
        }]);
      };

      function getAll() {
        return newQuestion().then(function (answers) {
          if (answers.action === "quit") {
            return;
          } else {
            that.action = answers.action;
            // It should get the list of parameters by action 
            var choicesList = confQuestions.getList(that.action);
            that.prompt([{
              type: 'list',
              name: 'parameter',
              pageSize: 20,
              message: 'Please choose a parameter',
              choice: choicesList,
              choices: choicesList
            }]).then(function (answers) {

              that.parameter = answers.parameter;
              var currentValue = chalk.green(sessionHandler.getParamValue(generator.action, generator.parameter) || "[!] Nothing set yet ");
              that.log('Current value for parameter is \'' + currentValue + '\'');
              // It should require the value for the parameter 
              return that.prompt([{
                type: 'input',
                name: 'value',
                message: "Parameter value"
              }]);
            }).then(function (answers) {
              that.value = answers.value;
              that.log('\nSaving ' + that.action + ': ' + that.parameter + ' = ' + that.value + '...');
              sessionHandler.setValue(that.action, that.parameter, that.value);
              that.log(chalk.green("OK") + "\n");
              return getAll();
            });
          }
        });
      }
      return getAll();

      // Prompt for questions
      return that.prompt([{
        type: 'checkbox',
        pageSize: 20,
        name: 'parametersList',
        message: 'Which parameters do you want to configure',
        choices: [{ name: 'Port', value: 'port', checked: false }]
      }]).then(function (answers) {
        return that.prompt([{
          type: 'input',
          name: 'value',
          message: 'Do you want to continue'
          //        choices: [
          //          {name: 'Port', value: 'port', checked: false},
          //        ],
        }]);
      }).then(function (answers) {
        console.log("record " + answers);
      });
    }
  }, {
    key: 'prompting',
    value: function prompting() {

      /**    
       const questions = this._getQuestions(...this.questionsList);
       console.log(questions)
       return this.prompt(questions).then((answers) => {
       console.log(answers)
       });
       */
    }
  }, {
    key: 'writing',
    value: function writing() {
      if (!this._canWrite()) {
        return;
      }
    }
  }, {
    key: 'end',
    value: function end() {
      this._end();
    }
  }]);

  return _class;
}(VulcanGenerator);
