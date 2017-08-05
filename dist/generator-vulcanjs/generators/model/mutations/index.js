'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VulcanGenerator = require('../../../lib/VulcanGenerator');

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
      this._registerOptions('packageName', 'modelName');
    }
  }, {
    key: 'prompting',
    value: function prompting() {
      var _this2 = this;

      if (!this._canPrompt()) {
        return false;
      }
      var questions = this._getQuestions('packageNameWithNumModelsList', 'modelNameList');
      return this.prompt(questions).then(function (answers) {
        _this2.props = {
          packageName: _this2._finalize('packageName', answers),
          modelName: _this2._finalize('modelName', answers),
          collectionName: _this2._finalize('collectionName', answers),
          newMutationName: _this2._finalize('mutationName', 'new', answers),
          editMutationName: _this2._finalize('mutationName', 'edit', answers),
          removeMutationName: _this2._finalize('mutationName', 'remove', answers),
          newPermission: _this2._finalize('permissionName', ['new'], answers),
          editOwnPermission: _this2._finalize('permissionName', ['edit', 'own'], answers),
          editAllPermission: _this2._finalize('permissionName', ['edit', 'all'], answers),
          removeOwnPermission: _this2._finalize('permissionName', ['remove', 'own'], answers),
          removeAllPermission: _this2._finalize('permissionName', ['remove', 'all'], answers)
        };
      });
    }
  }, {
    key: '_writeMutations',
    value: function _writeMutations() {
      this.fs.copyTpl(this.templatePath('mutations.js'), this._getPath({ isAbsolute: true }, 'model', 'mutations.js'), this.props);
    }
  }, {
    key: '_writeTestMutations',
    value: function _writeTestMutations() {
      var testProps = _extends({}, this.props, {
        subjectName: 'mutations',
        subjectPath: '../../../lib/models/' + this.props.modelName + '/mutations'
      });
      this.fs.copyTpl(this.templatePath('../../templates/generic-test.js'), this._getPath({ isAbsolute: true }, 'modelTest', 'mutations.spec.js'), testProps);
    }
  }, {
    key: 'writing',
    value: function writing() {
      if (!this._canWrite()) {
        return;
      }
      this._writeMutations();
      this._writeTestMutations();
    }
  }, {
    key: 'end',
    value: function end() {
      this._end();
    }
  }]);

  return _class;
}(VulcanGenerator);
