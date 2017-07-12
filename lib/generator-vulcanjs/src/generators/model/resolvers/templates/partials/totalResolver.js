total: {
  name: '<%= totalResolverName %>',
  resolver(root, {terms = {}}, context) {
    const {selector, options} = context.<%= collectionName %>.getParameters(
      terms,
      {},
      context.currentUser
    );
    return context.<%= collectionName %>.find(selector, options).count();
  },
}
