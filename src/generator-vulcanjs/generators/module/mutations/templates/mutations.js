import {
    createMutator,
    updateMutator,
    deleteMutator,
    Utils
} from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';

const mutations = {
    create: {
        name: '<%= newMutationName %>',
        check(user) {
            if (!user) return false;
            return Users.canDo(user, '<%= newPermission %>');
        },
        mutation(root, { document }, context) {
            Utils.performCheck(this.check, context.currentUser, document);
            return createMutator({
                collection: context.<%= collectionName %>,
                document: document,
                currentUser: context.currentUser,
                validate: true,
                context,
           });
        },
    },

    update: {
        name: '<%= editMutationName %>',
            check(user, document) {
            if (!user || !document) return false;
            return Users.owns(user, document) ?
                Users.canDo(user, '<%= editOwnPermission %>') :
                Users.canDo(user, `<%= editAllPermission %>`);
        },
        mutation(root, { documentId, set, unset }, context) {
            const document = context.<%= collectionName %>.findOne(documentId);
            Utils.performCheck(this.check, context.currentUser, document);
            return updateMutator({
                collection: context.<%= collectionName %>,
                documentId: documentId,
                set: set,
                unset: unset,
                currentUser: context.currentUser,
                validate: true,
                context,
            });
        },
    },

    delete: {
        name: '<%= removeMutationName %>',
            check(user, document) {
            if (!user || !document) return false;
            return Users.owns(user, document) ?
                Users.canDo(user, '<%= removeOwnPermission %>') :
                Users.canDo(user, `<%= removeAllPermission %>`);
        },
        mutation(root, { documentId }, context) {
            const document = context.<%= collectionName %>.findOne(documentId);
            Utils.performCheck(this.check, context.currentUser, document);
            return deleteMutator({
                collection: context.<%= collectionName %>,
                documentId: documentId,
                currentUser: context.currentUser,
                validate: true,
                context,
            });
        },
    },
};

export default mutations;