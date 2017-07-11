var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const esprima = require('esprima');
const escodegen = require('escodegen-wallaby');
const find = require('lodash/find');

const getLastImportIndex = tree => {
  let lastIndex = -1;
  tree.body.forEach((node, index) => {
    if (node.type === 'ImportDeclaration') {
      lastIndex = index;
    }
  });
  return lastIndex;
};

const parseAst = text => esprima.parseModule(text, {
  range: true,
  tokens: true,
  comment: true
});

const generateCode = ast => {
  const astWithComments = escodegen.attachComments(ast, ast.comments, ast.tokens);
  return escodegen.generate(astWithComments, {
    comment: true,
    format: { index: { style: '  ' } }
  });
};

const parseModifyGenerate = modifier => (text, ...args) => {
  const ast = parseAst(text);
  const newAst = modifier(ast, ...args);
  const generated = generateCode(newAst);
  return generated;
};

const addImportStatement = (tree, statement) => {
  const newTree = _extends({}, tree);
  const nextImportIndex = getLastImportIndex(tree) + 1;
  const importNode = esprima.parseModule(statement);
  newTree.body = [...[...tree.body].slice(0, nextImportIndex), importNode.body[0], ...[...tree.body].slice(nextImportIndex, newTree.body.length)];
  return newTree;
};

const appendCode = (tree, statement) => {
  const newTree = _extends({}, tree);
  const newCodeAst = parseAst(statement);
  const codeToPush = newCodeAst.body[0];
  newTree.body.push(codeToPush);
  return newTree;
};

const removeRoute = (tree, routeToRemove) => {
  const newTree = _extends({}, tree);
  newTree.body = tree.body.filter(node => {
    if (node.type !== 'ExpressionStatement') return true;
    if (!node.expression) return true;
    const expression = node.expression;
    if (!expression.callee) return true;
    if (expression.callee.name !== 'addRoute') return true;
    const args = node.expression.arguments;
    // console.log(JSON.stringify(args, null, 2));
    if (!args) return true;
    const properties = args[0].properties;
    if (!properties) return true;
    const namePropOfRoute = find(properties, {
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

module.exports = {
  getLastImportIndex: getLastImportIndex,
  addImportStatement: parseModifyGenerate(addImportStatement),
  appendCode: parseModifyGenerate(appendCode),
  removeRoute: parseModifyGenerate(removeRoute)
};
