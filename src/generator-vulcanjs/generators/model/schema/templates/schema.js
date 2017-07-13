const schema = {
  // default properties

  _id: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
  },
  createdAt: {
    type: Date,
    optional: true,
    viewableBy: ['guests'],
    onInsert: (document, currentUser) => {
      return new Date();
    }
  },
  // userId: {
  //   type: String,
  //   optional: true,
  //   viewableBy: ['guests'],
  //   resolveAs: 'user: User', // resolve this field as "user" on the client
  // },

  <% customSchemaProperties.forEach((schemaProperty) => { %>
    <%- include('./partials/schemaProperty.js', schemaProperty) %>
  <% }); %>
};

export default schema;
