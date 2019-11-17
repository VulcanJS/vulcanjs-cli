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
  },
},
