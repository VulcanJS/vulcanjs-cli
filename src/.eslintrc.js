module.exports = {
    "extends": "airbnb-base",
    "rules": {
      "space-before-function-paren": ["error", "always"],
      "comma-dangle": ["error", {
        "arrays": "always-multiline",
        "objects": "always-multiline",
        "imports": "ignore",
        "exports": "ignore",
        "functions": "never",
      }],
      "no-underscore-dangle": ["error", {
        "allowAfterThis": true,
        "allowAfterSuper": true,
      }],
      "arrow-parens": ["error", "always"],
   },
};
