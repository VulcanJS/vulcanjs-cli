const VulcanGenerator = require('../../lib/VulcanGenerator');

module.exports = class extends VulcanGenerator {
  initializing () {
    this._assert('isVulcan');
    this._assert('hasNonZeroPackages');
  }

  _registerArguments () {
    this._registerOptions(
      'vulcanjsRemovableComponent'
    );
  }

  prompting () {
    if (!this._canPrompt()) { return false; }
    const questions = this._getQuestions(
      'vulcanjsRemovableComponentsList'
    );
    return this.prompt(questions)
    .then((answers) => {
      this.props = {
        vulcanjsComponent: this._finalize('raw', 'vulcanjsComponent', answers),
      };
    });
  }

  composing () {
    if (!this._canWrite()) { return false; }
    const remover = require.resolve(`./removers/${this.props.vulcanjsComponent}`);
    const nextOptions = {
      ...this.options,
      ...this.props,
    };
    return this.composeWith(remover, nextOptions);
  }

  end () {
    this._end();
  }
};
