const resolvers = {
  list: {
    name: '<%= listResolverName %>',
    resolver(root, {terms = {}}, context, info) {
      let { selector, options } = context.<%= collectionName %>.getParameters(
        terms,
        {},
        context.currentUser
      );
      return context.<%= collectionName %>.find(selector, options).fetch();
    },
  },
  single: {
    name: '<%= singleResolverName %>',
    resolver(root, {documentId}, context) {
      const document = context.<%= collectionName %>.findOne({_id: documentId});
      return context.Users.restrictViewableFields(
        context.currentUser,
        context.<%= collectionName %>,
        document
      );
    },
  },
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
  },
};

export default resolvers;
