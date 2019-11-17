multi: {
  name: '<%= listResolverName %>',
  resolver(root, {input = {}}, context, info) {
    // get selector and options from terms and perform Mongo query
    let { selector, options } = await Connectors.filter(collection, input, context);
    return {
      results: context.<%= collectionName %>.find(selector, options).fetch();
    }
  },
},
