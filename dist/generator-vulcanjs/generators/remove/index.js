var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const VulcanGenerator = require('../../lib/VulcanGenerator');

module.exports = class extends VulcanGenerator {
  initializing() {
    this._assert('isVulcan');
    this._assert('hasNonZeroPackages');
  }

  _registerArguments() {
    this._registerOptions('vulcanjsRemovableComponent');
  }

  prompting() {
    if (!this._canPrompt()) {
      return false;
    }
    const questions = this._getQuestions('vulcanjsRemovableComponentsList');
    return this.prompt(questions).then(answers => {
      this.props = {
        vulcanjsComponent: this._finalize('raw', 'vulcanjsComponent', answers)
      };
    });
  }

  composing() {
    if (!this._canWrite()) {
      return false;
    }
    const remover = require.resolve(`./removers/${this.props.vulcanjsComponent}`);
    const nextOptions = _extends({}, this.options, this.props, {
      dontAsk: true
    });
    return this.composeWith(remover, nextOptions);
  }

  end() {
    this._end();
  }
};
