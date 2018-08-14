import { createCollection, getDefaultResolvers, getDefaultMutations } from 'meteor/vulcan:core';
import schema from './schema.js';
import './fragments.js';
import './permissions.js';

const <%= collectionName %> = createCollection({
  collectionName: '<%= collectionName %>',
  typeName: '<%= typeName %>',
  schema,
  resolvers: getDefaultResolvers('<%= collectionName %>'),
  mutations: getDefaultMutations('<%= collectionName %>')
});

<%= collectionName %>.addDefaultView(terms => {
  return {
    options: { sort: { createdAt: -1 } }
  }
})

export default <%= collectionName %>;
