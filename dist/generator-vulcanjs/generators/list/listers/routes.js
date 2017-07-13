const VulcanGenerator = require('../../../lib/VulcanGenerator');
const nodePrint = require('node-print');
const common = require('../../../lib/common');

module.exports = class extends VulcanGenerator {
  initializing() {
    this._assert('isVulcan');
  }

  prompting() {
    if (!this._canPrompt()) {
      return false;
    }
    const questions = this._getQuestions('packageNameWithAllList', 'packageNameIfManual');
    return this.prompt(questions).then(answers => {
      this.props = {
        packageName: this._finalize('packageName', answers)
      };
    });
  }

  _listRoutesForPackage() {
    const prettyRoutes = this._finalize('prettyRoutesForPackage', this.props.packageName);
    nodePrint.pt(prettyRoutes);
  }

  _listRoutesForAllPackages() {
    const prettyRoutes = this._finalize('allPrettyRoutes');
    nodePrint.pt(prettyRoutes);
  }

  listing() {
    if (!this._canWrite()) {
      return false;
    }
    if (this.props.packageName === common.allChoiceValue) {
      return this._listRoutesForAllPackages();
    }
    return this._listRoutesForPackage();
  }

  end() {
    this._end();
  }
};
