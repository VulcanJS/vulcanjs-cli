'use strict';

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
      this._registerOptions('packageName', 'routeName', 'routePath', 'componentName', 'layoutName');
    }
  }, {
    key: 'prompting',
    value: function prompting() {
      var _this2 = this;

      if (!this._canPrompt()) {
        return false;
      }
      var argsAndQuestions = [{ arg: 'packageName', question: 'packageNameList' }, { arg: 'routeName' }, { arg: 'routePath' }, { arg: 'componentName' }, { arg: 'layoutName' }];
      var questions = argsAndQuestions.reduce(function (currentQuestions, _ref) {
        var arg = _ref.arg,
            question = _ref.question;

        if (_this2._needArg(arg)) {
          var questionName = question || arg;
          return [].concat(_toConsumableArray(currentQuestions), _toConsumableArray(_this2._getQuestions(questionName)));
        }
        return currentQuestions;
      }, []);
      return this.prompt(questions).then(function (answers) {
        _this2.props = {
          packageName: _this2._finalize('packageName', answers),
          componentName: _this2._finalize('componentName', answers),
          routeName: _this2._finalize('raw', 'routeName', answers),
          routePath: _this2._finalize('raw', 'routePath', answers),
          layoutName: _this2._finalize('raw', 'layoutName', answers),
          addRouteStatement: _this2._finalize('addRouteStatement', answers)
        };
      });
    }
  }, {
    key: '_updateRoutes',
    value: function _updateRoutes() {
      var routesPath = this._getPath({ isAbsolute: true }, 'routes');

      var fileText = this.fs.read(routesPath);
      var fileTextWithWithImport = ast.appendCode(fileText, this.props.addRouteStatement);
      this.fs.write(routesPath, fileTextWithWithImport);
    }
  }, {
    key: 'configuring',
    value: function configuring() {
      if (!this._canConfigure()) {}
    }
  }, {
    key: 'writing',
    value: function writing() {
      if (!this._canWrite()) {
        return;
      }
      this._updateRoutes();
    }
  }, {
    key: 'end',
    value: function end() {
      this._end();
    }
  }]);

  return _class;
}(VulcanGenerator);
