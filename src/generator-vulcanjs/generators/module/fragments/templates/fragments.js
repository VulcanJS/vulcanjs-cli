import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
   fragment <%= collectionName %>Fragment on <%= typeName %> {
     _id
     createdAt
   }
`);
