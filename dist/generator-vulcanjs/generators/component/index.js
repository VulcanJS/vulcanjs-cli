'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VulcanGenerator = require('../../lib/VulcanGenerator');
var ast = require('../../lib/ast');

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
      this._assert('hasNonZeroPackages');
    }
  }, {
    key: '_registerArguments',
    value: function _registerArguments() {
      this._registerOptions('packageName',
      // 'modelName',
      'componentName');
    }
  }, {
    key: 'prompting',
    value: function prompting() {
      var _this2 = this;

      if (!this._canPrompt()) {
        return false;
      }
      var questions = this._getQuestions('packageNameList', 'packageNameIfManual',
      // 'modelNameList',
      // 'modelNameIfManual',
      'componentName', 'componentType', 'isRegisterComponent');
      return this.prompt(questions).then(function (answers) {
        _this2.props = {
          packageName: _this2._finalize('packageName', answers),
          // modelName: this._finalize('modelName', answers),
          componentName: _this2._finalize('componentName', answers),
          componentFileName: _this2._finalize('componentFileName', answers),
          componentType: _this2._finalize('raw', 'componentType', answers),
          isRegister: _this2._finalize('raw', 'isRegister', answers)
        };
        _this2.props.componentPath = _this2._finalize('componentPath', answers);
      });
    }
  }, {
    key: '_writeComponent',
    value: function _writeComponent() {
      var templatePath = this.props.componentType === 'pure' ? this.templatePath('pureFunctionComponent.js') : this.templatePath('classComponent.js');
      this.fs.copyTpl(templatePath, this._getPath({ isAbsolute: true }, 'components', this.props.componentFileName), this.props);
    }
  }, {
    key: '_updateRegisteredComponents',
    value: function _updateRegisteredComponents() {
      if (!this.props.isRegister) return;
      var registeredComponentsPath = this._getPath({ isAbsolute: true }, 'registeredComponents');
      var fileText = this.fs.read(registeredComponentsPath);
      var fileWithImportText = ast.addImportStatement(fileText, '../components/' + this.props.componentFileName);
      this.fs.write(registeredComponentsPath, fileWithImportText);
    }
  }, {
    key: 'writing',
    value: function writing() {
      if (!this._canWrite()) {
        return;
      }
      this._writeComponent();
      this._updateRegisteredComponents();
    }
  }, {
    key: 'end',
    value: function end() {
      this._end();
    }
  }]);

  return _class;
}(VulcanGenerator);
