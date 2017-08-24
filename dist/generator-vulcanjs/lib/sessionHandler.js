'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var store = require('mem-fs').create();
var memFs = require('mem-fs-editor').create(store);

/**
 * 
 * @returns {nm$_sessionHandler.sessionHandler.instance}
 */
module.exports = function () {
  function sessionHandler() {
    _classCallCheck(this, sessionHandler);
  }

  _createClass(sessionHandler, [{
    key: 'getSettings',


    /**
     * 
     * @returns {undefined}
     */
    value: function getSettings() {
      // Make sure the settings.json file exists
      this.settings = memFs.readJSON('settings.json');
      if (!this.settings) {
        this.settings = memFs.readJSON('sample_settings.json');
        if (!this.settings) {
          throw 'Failed to retrieve a sample settings.json!';
        }
        this.copiedSample = true;
      }
    }
    /**
     * 
     * @param {type} action
     * @param {type} key
     * @returns {thissettings.public|sessionHandler.this.getParamValue.value|this.settings}
     */

  }, {
    key: 'getParamValue',
    value: function getParamValue(action, key) {

      var value;
      if (!this.settings) {
        this.getSettings();
      }
      value = action === 'public' ? this.settings['public'][key] : this.settings[key];
      return value;
    }
    /**
     * 
     * @param {type} action
     * @param {type} key
     * @param {type} value
     * @returns {undefined}
     */

  }, {
    key: 'setValue',
    value: function setValue(action, key, value) {
      if (action === 'public') {
        this.settings['public'][key] = value;
      } else {
        this.settings[key] = value;
      }
      memFs.writeJSON('settings.json', this.settings);
      memFs.commit([], function () {});
    }
  }]);

  return sessionHandler;
}();
