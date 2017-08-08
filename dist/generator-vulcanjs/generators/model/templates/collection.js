import { createCollection, getDefaultResolvers, getDefaultMutations } from 'meteor/vulcan:core';
import schema from './schema.js';
import './fragments.js';
import './permissions.js';
import './parameters.js';

const <%= collectionName %> = createCollection({
  schema,
  collectionName: '<%= collectionName %>',
  typeName: '<%= typeName %>',
  resolvers: getDefaultResolvers(<%= collectionName %>),
  mutations: getDefaultMutations(<%= collectionName %>),
});

export default <%= collectionName %>;
