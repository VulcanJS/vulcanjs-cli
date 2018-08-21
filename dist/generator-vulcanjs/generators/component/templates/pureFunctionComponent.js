import React from 'react';
<%if (isRegister) { %><% include ./partials/registerComponentImport.js -%><%} -%>

const <%= componentName %> = () => (
  <div>
    Find me at <%= componentPath %>
  </div>
);
<%if (isRegister) { %><% include ./partials/registerComponent.js -%><%} -%>

export default <%= componentName %>;
