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
