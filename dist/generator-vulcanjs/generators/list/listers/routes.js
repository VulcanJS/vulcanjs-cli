const VulcanGenerator = require('../../../lib/VulcanGenerator');
const nodePrint = require('node-print');

module.exports = class extends VulcanGenerator {
  initializing() {
    this._assert('isVulcan');
  }

  prompting() {
    if (!this._canPrompt()) {
      return false;
    }
    const questions = this._getQuestions('packageNameList', 'packageNameIfManual');
    return this.prompt(questions).then(answers => {
      this.props = {
        packageName: this._finalize('packageName', answers)
      };
    });
  }

  listing() {
    const prettyRoutesForPackage = this._finalize('prettyRoutesForPackage', this.props.packageName);
    nodePrint.pt(prettyRoutesForPackage);
  }

  end() {
    this._end();
  }
};
