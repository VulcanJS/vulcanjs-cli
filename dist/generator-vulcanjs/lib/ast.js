'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var esprima = require('esprima');
var escodegen = require('escodegen-wallaby');
var find = require('lodash/find');

var getLastImportIndex = function getLastImportIndex(tree) {
  var lastIndex = -1;
  tree.body.forEach(function (node, index) {
    if (node.type === 'ImportDeclaration') {
      lastIndex = index;
    }
  });
  return lastIndex;
};

var parseAst = function parseAst(text) {
  return esprima.parseModule(text, {
    range: true,
    tokens: true,
    comment: true
  });
};

var generateCode = function generateCode(ast) {
  var astWithComments = escodegen.attachComments(ast, ast.comments, ast.tokens);
  return escodegen.generate(astWithComments, {
    comment: true,
    format: { index: { style: '  ' } }
  });
};

var parseModifyGenerate = function parseModifyGenerate(modifier) {
  return function (text) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var ast = parseAst(text);
    var newAst = modifier.apply(undefined, [ast].concat(args));
    var generated = generateCode(newAst);
    return generated;
  };
};

var getImportStatement = function getImportStatement(importPath) {
  return 'import \'' + importPath + '\';';
};

var addImportStatement = function addImportStatement(tree, importPath) {
  var newTree = _extends({}, tree);
  var nextImportIndex = getLastImportIndex(tree) + 1;
  var statement = getImportStatement(importPath);
  var importNode = esprima.parseModule(statement);
  newTree.body = [].concat(_toConsumableArray([].concat(_toConsumableArray(tree.body)).slice(0, nextImportIndex)), [importNode.body[0]], _toConsumableArray([].concat(_toConsumableArray(tree.body)).slice(nextImportIndex, newTree.body.length)));
  return newTree;
};

var appendCode = function appendCode(tree, code) {
  var newTree = _extends({}, tree);
  var newCodeAst = parseAst(code);
  var codeToPush = newCodeAst.body[0];
  newTree.body.push(codeToPush);
  return newTree;
};

var removeRoute = function removeRoute(tree, routeToRemove) {
  var newTree = _extends({}, tree);
  newTree.body = tree.body.filter(function (node) {
    if (node.type !== 'ExpressionStatement') return true;
    if (!node.expression) return true;
    var expression = node.expression;
    if (!expression.callee) return true;
    if (expression.callee.name !== 'addRoute') return true;
    var args = node.expression.arguments;
    // console.log(JSON.stringify(args, null, 2));
    if (!args) return true;
    var properties = args[0].properties;
    if (!properties) return true;
    var namePropOfRoute = find(properties, {
      type: 'Property',
      key: {
        type: 'Identifier',
        name: 'name'
      }
    });
    if (!namePropOfRoute.value) return true;
    if (!namePropOfRoute.value.value) return true;
    return namePropOfRoute.value.value !== routeToRemove;
  });
  return newTree;
};

var removeImportStatement = function removeImportStatement(tree, importPath) {
  var newTree = _extends({}, tree);
  newTree.body = tree.body.filter(function (node) {
    if (node.type !== 'ImportDeclaration') return true;
    var source = node.source;
    if (!source) return true;
    if (source.type !== 'Literal') return true;
    return source.value !== importPath;
  });
  return newTree;
};

module.exports = {
  getLastImportIndex: getLastImportIndex,
  addImportStatement: parseModifyGenerate(addImportStatement),
  appendCode: parseModifyGenerate(appendCode),
  removeRoute: parseModifyGenerate(removeRoute),
  removeImportStatement: parseModifyGenerate(removeImportStatement)
};
