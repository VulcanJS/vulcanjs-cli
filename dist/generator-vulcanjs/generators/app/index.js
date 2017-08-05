'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var chalk = require('chalk');
var VulcanGenerator = require('../../lib/VulcanGenerator');

module.exports = function (_VulcanGenerator) {
  _inherits(_class, _VulcanGenerator);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: '_registerArguments',
    value: function _registerArguments() {
      this._registerOptions('appName', 'reactExtension', 'packageManager');
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
      var questions = this._getQuestions('appName',
      // 'reactExtension',
      'packageManager');
      return this.prompt(questions).then(function (answers) {
        _this2.props = {
          appName: _this2._finalize('appName', answers),
          // reactExtension: this._finalize('raw', 'reactExtension', answers),
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
      this.log(chalk.green('\nPulling the most up to date git repository... \n'));
      this.spawnCommandSync('git', ['clone', 'https://github.com/Vulcanjs/Vulcan', '--depth', '1', this.props.appName]);
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
      // this._dispatch({
      //   type: 'SET_REACT_EXTENSION',
      //   reactExtension: this.props.reactExtension,
      // });
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
      if (!this._hasNoErrors()) {
        return;
      }
      this.log(' ');
      this.log(chalk.green('Successfully generated vulcan code base. \n'));
      this.log(chalk.green('To run your new app: \n'));
      this.log(chalk.green('  cd ' + this.props.appName));
      this.log(chalk.green('  ' + this.props.packageManager + ' start \n'));
    }
  }]);

  return _class;
}(VulcanGenerator);
