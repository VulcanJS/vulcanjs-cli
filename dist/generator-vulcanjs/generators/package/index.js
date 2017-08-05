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
    key: 'initializing',
    value: function initializing() {
      this._assert('isVulcan');
    }
  }, {
    key: '_registerArguments',
    value: function _registerArguments() {
      this._registerOptions('packageName');
    }
  }, {
    key: 'prompting',
    value: function prompting() {
      var _this2 = this;

      if (!this._canPrompt()) {
        return false;
      }
      var questions = this._getQuestions('packageName');
      return this.prompt(questions).then(function (answers) {
        _this2.props = {
          packageName: _this2._finalize('packageName', answers),
          vulcanDependencies: ['\'vulcan:core\''],
          isPackageAutoAdd: _this2._finalize('raw', 'isPackageAutoAdd', answers)
        };
        _this2._assert('notPackageExists', _this2.props.packageName);
      });
    }
  }, {
    key: 'configuring',
    value: function configuring() {
      if (!this._canConfigure()) {
        return;
      }
      this._dispatch({
        type: 'ADD_PACKAGE',
        packageName: this.props.packageName
      });
      this._commitStore();
    }
  }, {
    key: '_writePackageJs',
    value: function _writePackageJs() {
      this.fs.copyTpl(this.templatePath('package.js'), this._getPath({ isAbsolute: true }, 'package', 'package.js'), this.props);
    }
  }, {
    key: '_writeClientMain',
    value: function _writeClientMain() {
      this.fs.copyTpl(this.templatePath('client.js'), this._getPath({ isAbsolute: true }, 'client', 'main.js'), this.props);
    }
  }, {
    key: '_writeServerMain',
    value: function _writeServerMain() {
      this.fs.copyTpl(this.templatePath('server.js'), this._getPath({ isAbsolute: true }, 'server', 'main.js'), this.props);
    }
  }, {
    key: '_writeServerSeed',
    value: function _writeServerSeed() {
      this.fs.copyTpl(this.templatePath('seed.js'), this._getPath({ isAbsolute: true }, 'server', 'seed.js'), this.props);
    }
  }, {
    key: '_writeModelsIndex',
    value: function _writeModelsIndex() {
      this.fs.copyTpl(this.templatePath('model.js'), this._getPath({ isAbsolute: true }, 'models', 'index.js'), this.props);
    }
  }, {
    key: '_writeRoutes',
    value: function _writeRoutes() {
      this.fs.copyTpl(this.templatePath('routes.js'), this._getPath({ isAbsolute: true }, 'routes'), this.props);
    }
  }, {
    key: '_writeTestsIndex',
    value: function _writeTestsIndex() {
      this.fs.copyTpl(this.templatePath('tests-index.js'), this._getPath({ isAbsolute: true }, 'packageTests', 'index.js'), this.props);
    }
  }, {
    key: 'writing',
    value: function writing() {
      if (!this._canWrite()) {
        return;
      }
      this._writePackageJs();
      this._writeClientMain();
      this._writeServerMain();
      this._writeServerSeed();
      this._writeModelsIndex();
      this._writeTestsIndex();
      this._writeRoutes();
    }
  }, {
    key: 'end',
    value: function end() {
      this._end();
      if (!this._hasNoErrors()) {
        return;
      }
      this.log('\nTo activate your package, run: ' + chalk.green('meteor add ' + this.props.packageName));
    }
  }]);

  return _class;
}(VulcanGenerator);
