Package.describe({
  name: '<%= packageName %>',
});

Package.onUse((api) => {
  api.use([<%- vulcanDependencies.join(",\n"); %>]);

api.mainModule('lib/server/main.js', 'server');
api.mainModule('lib/client/main.js', 'client');
});
