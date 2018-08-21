'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
      this._registerOptions('packageName', 'moduleName');
    }
  }, {
    key: 'prompting',
    value: function prompting() {
      var _this2 = this;

      if (!this._canPrompt()) {
        return false;
      }
      var questions = [];
      if (this._needArg('packageName')) {
        questions = [].concat(_toConsumableArray(questions), _toConsumableArray(this._getQuestions('packageNameList')));
      }
      if (this._needArg('moduleName')) {
        questions = [].concat(_toConsumableArray(questions), _toConsumableArray(this._getQuestions('moduleName')));
      }
      return this.prompt(questions).then(function (answers) {
        _this2.props = {
          packageName: _this2._finalize('packageName', answers),
          moduleName: _this2._finalize('moduleName', answers),
          collectionName: _this2._finalize('collectionName', answers),
          typeName: _this2._finalize('pascalModuleName', answers)
        };
        _this2._composeGenerators();
      });
    }
  }, {
    key: '_composeGenerators',
    value: function _composeGenerators() {
      var _this3 = this;

      var moduleParts = ['fragments', 'schema', 'permissions'];
      moduleParts.forEach(function (modulePart) {
        var generator = require.resolve('./' + modulePart);
        var nextOptions = _extends({}, _this3.options, _this3.props, {
          dontAsk: true
        });
        this.composeWith(generator, nextOptions);
      }
      var boundCompose = composeWithModelPart.bind(this);
      var modelParts = ['fragments', 'schema', 'permissions', 'parameters'];
      if (this.props.isAddCustomResolvers) modelParts.push('resolvers');
      if (this.props.isAddCustomMutations) modelParts.push('mutations');
      modelParts.forEach(boundCompose);
    }
  }, {
    key: 'configuring',
    value: function configuring() {
      if (!this._canConfigure()) {}
    }
  }, {
    key: '_writeCollection',
    value: function _writeCollection() {
      this.fs.copyTpl(this.templatePath('collection.js'), this._getPath({ isAbsolute: true }, 'module', 'collection.js'), this.props);
    }
  }, {
    key: '_writeTestCollection',
    value: function _writeTestCollection() {
      var testProps = _extends({}, this.props, {
        subjectName: 'collection',
        subjectPath: '../../../lib/modules/' + this.props.moduleName + '/fragments'
      });
      this.fs.copyTpl(this.templatePath('generic-test.js'), this._getPath({ isAbsolute: true }, 'moduleTest', 'collection.spec.js'), testProps);
    }
  }, {
    key: '_updateModulesIndex',
    value: function _updateModulesIndex() {
      var modulesIndexPath = this._getPath({ isAbsolute: true }, 'modulesIndex');
      var fileText = this.fs.read(modulesIndexPath);
      var fileWithImportText = ast.addImportStatement(fileText, './' + this.props.moduleName + '/collection.js');
      this.fs.write(modulesIndexPath, fileWithImportText);
    }
  }, {
    key: 'writing',
    value: function writing() {
      if (!this._canWrite()) {
        return;
      }
      this._writeCollection();
      this._updateModulesIndex();
      // this._writeTestCollection();
    }
  }, {
    key: 'end',
    value: function end() {
      this._end();
    }
  }]);

  return _class;
}(VulcanGenerator);
