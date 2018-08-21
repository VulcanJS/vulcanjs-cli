<%- name %> : {
  <% if (isHidden) { %> hidden: true <% } else { %> label: '<%= label %>' <% } %>,
  type: <%- type %>,
  optional: <%- isOptional %>,
  viewableBy: <%- viewableBy %>,
  insertableBy: <%- insertableBy %>,
  editableBy: <%- editableBy %>,
},
