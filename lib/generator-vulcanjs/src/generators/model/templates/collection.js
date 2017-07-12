import { createCollection } from 'meteor/vulcan:core';
import schema from './schema.js';
import resolvers from './resolvers.js';
import './fragments.js';
import mutations from './mutations.js';
import './permissions.js';
import './parameters.js';

const <%= collectionName %> = createCollection({
  collectionName: '<%= collectionName %>',
  typeName: '<%= typeName %>',
  schema,
  resolvers,
  mutations,
});

export default <%= collectionName %>;
