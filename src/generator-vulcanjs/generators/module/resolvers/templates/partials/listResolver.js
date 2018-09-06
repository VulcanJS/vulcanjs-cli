list: {
  name: '<%= listResolverName %>',
  resolver(root, {terms = {}}, context, info) {
    let { selector, options } = context.<%= collectionName %>.getParameters(
      terms,
      {},
      context.currentUser
    );
    return {
      results: context.<%= collectionName %>.find(selector, options).fetch();
    }
  },
},
