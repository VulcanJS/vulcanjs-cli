const VulcanGenerator = require('../../../lib/VulcanGenerator');
const store = require('../../../lib/store');
const styles = require('../../../lib/styles');

module.exports = class extends VulcanGenerator {
  initializing() {
    this._assert('isVulcan');
  }

  prompting() {
    this.props.allPackages = store.get('allPackages');
  }

  listing() {
    if (!this._canWrite()) return false;
    this.props.allPackages.forEach(thePackage => {
      this._printEntirePackage(thePackage);
    });
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
