import Users from 'meteor/vulcan:users';

Users.groups.members.can([
  '<%= newPermission %>',
  '<%= editOwnPermission %>',
  '<%= removeOwnPermission %>',
]);

Users.groups.admins.can([
  '<%= editAllPermission %>',
  '<%= removeAllPermission %>,'
]);
