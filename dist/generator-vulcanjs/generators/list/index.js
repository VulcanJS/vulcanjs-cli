var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const VulcanGenerator = require('../../lib/VulcanGenerator');

module.exports = class extends VulcanGenerator {
  initializing() {
    this._assert('isVulcan');
  }

  _registerArguments() {
    this._registerOptions('vulcanjsListableComponent', 'packageName');
  }

  prompting() {
    if (!this._canPrompt()) {
      return false;
    }
    const questions = this._getQuestions('vulcanjsListableComponentsList');
    return this.prompt(questions).then(answers => {
      this.props = {
        vulcanjsComponent: this._finalize('raw', 'vulcanjsComponent', answers)
      };
    });
  }

  composing() {
    const lister = require.resolve(`./listers/${this.props.vulcanjsComponent}`);
    this.composeWith(lister, _extends({}, this.props, this.options, {
      dontAsk: true
    }));
  }

  end() {
    this._end();
  }
};
