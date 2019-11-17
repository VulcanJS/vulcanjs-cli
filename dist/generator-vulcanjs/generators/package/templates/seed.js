import Users from 'meteor/vulcan:users';
import { createMutator } from 'meteor/vulcan:core';

const seedData = [];

Meteor.startup(() => {
  // if (Users.find().count() === 0) {
  //   createMutator({
  //      collection: Users,
  //      document:{
  //         username: 'DemoUser',
  //         email: 'dummyuser@gmail.com',
  //         profile: {
  //           isDummy: true
  //         },
  //      }
  //   });
  // }
});
