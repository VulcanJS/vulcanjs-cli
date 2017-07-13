const VulcanGenerator = require('../../lib/VulcanGenerator');

module.exports = class extends VulcanGenerator {
  initializing () {
    this._assert('isVulcan');
  }

  _registerArguments () {
    this._registerOptions(
      'vulcanjsListableComponent'
    );
  }

  prompting () {
    if (!this._canPrompt()) { return false; }
    const questions = this._getQuestions(
      'vulcanjsListableComponentsList'
    );
    return this.prompt(questions)
    .then((answers) => {
      this.props = {
        vulcanjsComponent: this._finalize('raw', 'vulcanjsComponent', answers),
      };
    });
  }

  composing () {
    const lister = require.resolve(`./listers/${this.props.vulcanjsComponent}`);
    this.composeWith(lister);
  }

  end () {
    this._end();
  }
};
