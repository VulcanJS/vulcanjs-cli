single: {
  name: '<%= singleResolverName %>',
  resolver(root, {documentId}, context) {
    const document = context.<%= collectionName %>.findOne({_id: documentId});
    const result = context.Users.restrictViewableFields(
      context.currentUser,
      context.<%= collectionName %>,
      document
    );
    return { result }
  },
},
