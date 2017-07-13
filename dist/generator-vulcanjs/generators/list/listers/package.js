const VulcanGenerator = require('../../../lib/VulcanGenerator');
const store = require('../../../lib/store');
const styles = require('../../../lib/styles');

module.exports = class extends VulcanGenerator {
  initializing() {
    this._assert('isVulcan');
  }

  _registerArguments() {
    this._registerOptions('packageName');
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
    console.log(this.props);
  }

  _printEntirePackage(thePackage) {
    this._printPackageName(thePackage);
    this._printPackageDetails(thePackage);
  }

  _printPackageDetails(thePackage) {}

  _printPackageName(thePackage) {
    const title = styles.h1(thePackage.name);
    this.log(title);
  }

  end() {
    this._end();
  }
};
