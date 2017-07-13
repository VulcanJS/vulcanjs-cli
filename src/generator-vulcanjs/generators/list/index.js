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
    // const questions = this._getQuestions(
    //   'vulcanjsListableComponent'
    // );
    const questions = [];
    return this.prompt(questions)
    .then((answers) => {
      this.props = {
        vulcanjsListableComponent: this._finalize('raw', 'vulcanjsListableComponent', answers),
      };
    });
  }

  end () {
    this._end();
  }
};
