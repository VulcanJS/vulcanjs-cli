import Users from 'meteor/vulcan:users';
import { newMutation } from 'meteor/vulcan:core';

const seedData = [];

Meteor.startup(() => {
  // if (Users.find().count() === 0) {
  //   Accounts.createUser({
  //     username: 'DemoUser',
  //     email: 'dummyuser@gmail.com',
  //     profile: {
  //       isDummy: true
  //     },
  //   });
  // }
});
