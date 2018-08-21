'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VulcanGenerator = require('../../../lib/VulcanGenerator');
var ast = require('../../../lib/ast');

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
      // TODO: add arguments for remove
    }
  }, {
    key: 'prompting',
    value: function prompting() {
      var _this2 = this;

      if (!this._canPrompt()) {
        return false;
      }
      var questions = this._getQuestions('packageNameWithNumModulesList', 'moduleNameList', 'isDelete');
      return this.prompt(questions).then(function (answers) {
        _this2._assert('isDelete', answers.isDelete);
        _this2.props = {
          packageName: _this2._finalize('packageName', answers),
          moduleName: _this2._finalize('moduleName', answers)
        };
      });
    }
  }, {
    key: '_updateModulesIndex',
    value: function _updateModulesIndex() {
      var modulesIndexPath = this._getPath({ isAbsolute: true }, 'modulesIndex');
      var fileText = this.fs.read(modulesIndexPath);
      var fileWithImportText = ast.removeImportStatement(fileText, './' + this.props.moduleName + '/collection.js');
      this.fs.write(modulesIndexPath, fileWithImportText);
    }
  }, {
    key: '_removeModuleDir',
    value: function _removeModuleDir() {
      var sourceDir = this._getPath({ isAbsolute: true }, 'module');
      this.fs.delete(sourceDir);
    }
  }, {
    key: 'writing',
    value: function writing() {
      if (!this._canWrite()) {
        return false;
      }
      this._dispatch({
        type: 'REMOVE_MODULE',
        packageName: this.props.packageName,
        moduleName: this.props.moduleName
      });
      this._removeModuleDir();
      this._updateModulesIndex();
      return this._commitStore();
    }
  }, {
    key: 'end',
    value: function end() {
      this._end();
    }
  }]);

  return _class;
}(VulcanGenerator);
