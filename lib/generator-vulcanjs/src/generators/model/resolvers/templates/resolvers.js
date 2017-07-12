import { addGraphQLResolvers } from 'meteor/vulcan:core';

const resolvers = {
  <%if (hasListResolver) { %><% include ./partials/listResolver.js %><%} %>
  <%if (hasSingleResolver) { %><% include ./partials/singleResolver.js %><%} %>
  <%if (hasTotalResolver) { %><% include ./partials/totalResolver.js -%><%} %>
};

export default resolvers;
