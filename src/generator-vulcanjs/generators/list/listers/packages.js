const VulcanGenerator = require('../../../lib/VulcanGenerator');
const nodePrint = require('node-print');
const makeLister = require('../../../lib/lister');

module.exports = class extends VulcanGenerator {
  initializing() {
    this._assert('isVulcan');
    this._lister = makeLister.setup(this);
  }

  prompting() {
    const packageNames = this._lister.listPackages();
    this.props = {
      packageNames,
      prettyPackages: this._finalize('prettyPackages', packageNames),
    };
  }

  listing() {
    nodePrint.pt(this.props.prettyPackages);
  }

  end() {
    this._end();
  }
};
