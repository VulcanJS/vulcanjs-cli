const resolvers = {
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
  single: {
    name: '<%= singleResolverName %>',
    resolver(root, { _id }, context) {
      const document = context.<%= collectionName %>.findOne({ _id });
      const result = context.Users.restrictViewableFields(
        context.currentUser,
        context.<%= collectionName %>,
        document
      );
      return { result }
    }
  }
};

export default resolvers;
