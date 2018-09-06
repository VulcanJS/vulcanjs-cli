<%- name %> : {
  <% if (isHidden) { %> hidden: true <% } else { %> label: '<%= label %>' <% } %>,
  type: <%- type %>,
  optional: <%- isOptional %>,
  canRead: <%- viewableBy %>,
  canCreate: <%- insertableBy %>,
  canUpdate: <%- editableBy %>,
},
