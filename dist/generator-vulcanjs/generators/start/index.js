'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var chalk = require('chalk');
var VulcanGenerator = require('../../lib/VulcanGenerator');
var sh = require('../../lib/settingsHandler');
var sessionHandler = new sh();

module.exports = function (_VulcanGenerator) {
  _inherits(_class, _VulcanGenerator);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'initializing',
    value: function initializing() {
      return this.prompt([{
        type: 'list',
        name: 'action',
        message: 'Select a category to configure, or exit.',
        choices: [{ name: 'Start options (port, packages location,...)', value: 'start', checked: false }, { name: 'Site informations (title, image,...)', value: 'public', checked: false }, { name: 'Emailing  (address, mailchimp,...)', value: 'emailing', checked: false }, { name: 'Quit', value: 'quit', checked: false }]
      }]);
    }
  }, {
    key: 'writing',
    value: function writing() {

      var env = process.env;
      var args = ['run'];
      var port = sessionHandler.getParamValue(null, 'port');
      if (port) {
        args.push('--port', port);
      }
      var packageLocation = sessionHandler.getParamValue(null, 'packageLocation');
      if (packageLocation) {
        env['METEOR_PACKAGE_DIRS'] = packageLocation + '/packages';
      }
      this.log(chalk.green('\nStarting your app... \n'));
      this.spawnCommandSync('meteor', args, { env: env });
    }
  }]);

  return _class;
}(VulcanGenerator);
