<%if (isAddCustomResolvers && isAddCustomMutations) {%>import { createCollection } from 'meteor/vulcan:core';<%} %><%if ((!isAddCustomResolvers) && isAddCustomMutations) {%>import { createCollection, getDefaultResolvers } from 'meteor/vulcan:core';<%} %><%if (isAddCustomResolvers && (!isAddCustomMutations)) {%>import { createCollection, getDefaultMutations } from 'meteor/vulcan:core';<%} %><%if ((!isAddCustomResolvers) && (!isAddCustomMutations)) {%>import { createCollection, getDefaultResolvers, getDefaultMutations } from 'meteor/vulcan:core';<%} %>

import schema from './schema.js';
import './fragments.js';
import './permissions.js';
import './parameters.js';
<%if (isAddCustomResolvers) { %>import resolvers from './resolvers.js'<%} %>
<%if (isAddCustomMutations) { %>import mutations from './mutations.js'<%} %>

const <%= collectionName %> = createCollection({
  schema,
  collectionName: '<%= collectionName %>',
  typeName: '<%= typeName %>',
  <%if (!isAddCustomResolvers) { %>resolvers: getDefaultResolvers(<%= collectionName %>)<%} else {%>resolvers<%} %>,
  <%if (!isAddCustomMutations) { %>mutations: getDefaultMutations(<%= collectionName %>)<%} else {%>mutations<%} %>,
});

export default <%= collectionName %>;
