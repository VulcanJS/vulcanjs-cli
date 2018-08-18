'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VulcanGenerator = require('../../lib/VulcanGenerator');
var vulcanjsRemovableComponents = require('../../lib/common').vulcanjsRemovableComponents;

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
      this._registerOptions('vulcanjsRemovableComponent');
    }
  }, {
    key: '_isComponentRemovable',
    value: function _isComponentRemovable() {
      return vulcanjsRemovableComponents.includes(this.options.vulcanjsComponent);
    }
  }, {
    key: 'prompting',
    value: function prompting() {
      var _this2 = this;

      if (!this._canPrompt()) {
        return false;
      }
      var questions = [];
      if (this._needArg('vulcanjsComponent') || !this._isComponentRemovable()) {
        questions = [].concat(_toConsumableArray(questions), _toConsumableArray(this._getQuestions('vulcanjsRemovableComponentsList')));
      }
      return this.prompt(questions).then(function (answers) {
        _this2.props = {
          vulcanjsComponent: _this2._finalize('raw', 'vulcanjsComponent', answers)
        };
      });
    }
  }, {
    key: 'composing',
    value: function composing() {
      if (!this._canWrite()) {
        return false;
      }
      var remover = require.resolve('./removers/' + this.props.vulcanjsComponent);
      var nextOptions = _extends({}, this.options, this.props, {
        dontAsk: true
      });
      return this.composeWith(remover, nextOptions);
    }
  }, {
    key: 'end',
    value: function end() {
      this._end();
    }
  }]);

  return _class;
}(VulcanGenerator);
