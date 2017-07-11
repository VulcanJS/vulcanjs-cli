'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = createNodeLogger;
var RenderKid = require('renderkid');

var kid = new RenderKid();

//gets top level keys and prints them in format
var topLevel = function topLevel(obj, rightArrow) {

  var formatted = '';
  Object.keys(obj).forEach(function (key) {
    if (key.length > 0) formatted += '<label>' + rightArrow + ' ' + key + '</label>';
    if (obj[key]) formatted += '<pre>' + JSON.stringify(obj[key]) + '</pre>';
  });

  return formatted;
};

var renderToConsole = function renderToConsole(obj, rightArrow) {
  try {
    return topLevel(obj, rightArrow);
  } catch (e) {
    return obj;
  }
};

function createNodeLogger(customOptions) {
  var options = _extends({
    downArrow: '▼',
    rightArrow: '▶',
    messageColor: 'bright-yellow',
    prevColor: 'grey',
    actionColor: 'bright-blue',
    nextColor: 'green',
    predicate: ''
  }, customOptions);

  return function (_ref) {
    var getState = _ref.getState;
    return function (next) {
      return function (action) {

        //bailout on provided predicate
        if (typeof predicate === 'function' && !predicate(getState, action)) return next(action);

        //bailout on console undefined
        if (typeof console === 'undefined') return next(action);

        var downArrow = options.downArrow;
        var rightArrow = options.rightArrow;
        var messageColor = options.messageColor;
        var prevColor = options.prevColor;
        var actionColor = options.actionColor;
        var nextColor = options.nextColor;
        var predicate = options.predicate;

        var prevState = renderToConsole(getState(), rightArrow);
        var actionDisplay = renderToConsole(action, rightArrow);
        var returnValue = next(action);
        var nextState = renderToConsole(getState(), rightArrow);
        var time = new Date();

        var message = downArrow + ' action ' + action.type + ' @ ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();

        kid.style({
          'label': {},
          'list': {
            marginLeft: '1'
          },
          'li': {
            marginLeft: '2'
          },
          'pre': {
            marginLeft: '4',
            display: 'block'
          },
          'message': {
            display: 'block',
            color: messageColor
          },
          'prev': {
            color: prevColor
          },
          'action': {
            color: actionColor
          },
          'next': {
            color: nextColor
          }
        });

        var output = kid.render('\n    <message>\n      ' + message + '\n    </message>\n    <ul>\n      <li><prev>\n        prev state\n      </prev></li>\n      <pre><prev>\n        ' + prevState + '\n      </prev></pre>\n      <li><action>\n        action\n      </action></li>\n      <pre><action>\n        ' + actionDisplay + '\n      </action></pre>\n      <li><next>\n        next\n      </next></li>\n      <pre><next>\n        ' + nextState + '\n      </next></pre>\n    </ul>\n  ');

        console.log(output);

        return returnValue;
      };
    };
  };
}

;
module.exports = exports['default'];