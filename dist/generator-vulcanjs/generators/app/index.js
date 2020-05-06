'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var chalk = require('chalk');
var VulcanGenerator = require('../../lib/VulcanGenerator');

var STARTER_REPO_URL = 'https://github.com/VulcanJS/Vulcan-Starter.git';
var STARTERS = [{ name: "bootstrap", github: 'https://github.com/VulcanJS/Vulcan-Starter.git' }, { name: "material", github: 'https://github.com/Neobii/Vulcan-Starter-Material.git' }];

module.exports = function (_VulcanGenerator) {
  _inherits(_class, _VulcanGenerator);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: '_registerArguments',
    value: function _registerArguments() {
      this._registerOptions('appName', 'doShallowClone', 'reactExtension', 'packageManager', 'style');
    }
  }, {
    key: 'initializing',
    value: function initializing() {
      this._assert('notVulcan');
    }
  }, {
    key: 'prompting',
    value: function prompting() {
      var _this2 = this;

      if (!this._canPrompt()) {
        return false;
      }
      var questions = [];
      if (this._needArg('appName')) {
        questions = [].concat(_toConsumableArray(questions), _toConsumableArray(this._getQuestions('appName')));
      }
      questions = [].concat(_toConsumableArray(questions), _toConsumableArray(this._getQuestions('packageManager')));
      return this.prompt(questions).then(function (answers) {
        _this2.props = {
          appName: _this2._finalize('appName', answers),
          packageManager: _this2._finalize('raw', 'packageManager', answers)
        };
      });
    }
  }, {
    key: 'writing',
    value: function writing() {
      if (!this._canInstall()) {
        return;
      }
      var style = this.props.style && this.props.style.split('=')[1];
      var found = STARTERS.find(function (starter) {
        console.log(starter);return starter.name === style;
      });
      console.log("no style argument --->", this.props, style);
      return;
      if (found) {
        this.log(chalk.green('\nPulling the most up to date Vulcan-Starter git repository... \n'));
        this.spawnCommandSync('git', ['clone', found.github, this.props.appName]);
      } else {
        this.log(chalk.green('\nPulling the most up to date Vulcan-Starter git repository... \n'));
        this.spawnCommandSync('git', ['clone', STARTER_REPO_URL, this.props.appName]);
      }

      this.destinationRoot(this.destinationPath(this.props.appName));
      this.installDependencies({
        npm: this.props.packageManager === 'npm',
        bower: false,
        yarn: this.props.packageManager === 'yarn'
      });
      if (!this._canConfigure()) {
        return;
      }
      this._dispatch({
        type: 'SET_IS_VULCAN_TRUE'
      });
      this._dispatch({
        type: 'SET_APP_NAME',
        appName: this.props.appName
      });
      this._dispatch({
        type: 'SET_PACKAGE_MANAGER',
        packageManager: this.props.packageManager
      });
      this._commitStore();
    }
  }, {
    key: 'end',
    value: function end() {
      this._end();
      this.log(' ');
      this.log(chalk.green('Successfully generated vulcan code base. \n'));
      this.log(chalk.green('To run your new app: \n'));
      this.log(chalk.green('  cd ' + this.props.appName));
      this.log(chalk.green('  ' + this.props.packageManager + ' start \n'));
    }
  }]);

  return _class;
}(VulcanGenerator);
