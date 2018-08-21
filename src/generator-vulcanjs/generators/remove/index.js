const VulcanGenerator = require('../../lib/VulcanGenerator');
const vulcanjsRemovableComponents = require('../../lib/common').vulcanjsRemovableComponents;

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

  _isComponentRemovable () {
    return vulcanjsRemovableComponents.includes(this.options.vulcanjsComponent);
  }

  prompting () {
    if (!this._canPrompt()) { return false; }
    let questions = [];
    if (this._needArg('vulcanjsComponent') || !this._isComponentRemovable()) {
      questions = [...questions, ...this._getQuestions(
        'vulcanjsRemovableComponentsList'
      )];
    }
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
      dontAsk: true,
    };
    return this.composeWith(remover, nextOptions);
  }

  end () {
    this._end();
  }
};
