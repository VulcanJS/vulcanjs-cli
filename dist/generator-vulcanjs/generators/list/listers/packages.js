const VulcanGenerator = require('../../../lib/VulcanGenerator');
const store = require('../../../lib/store');
const nodePrint = require('node-print');

module.exports = class extends VulcanGenerator {
  initializing() {
    this._assert('isVulcan');
  }

  prompting() {
    const packageNames = store.get('packageNames');
    this.props = {
      prettyPackages: this._finalize('prettyPackages', packageNames)
    };
  }

  listing() {
    nodePrint.pt(this.props.prettyPackages);
  }

  end() {
    this._end();
  }
};
