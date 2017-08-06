import React from 'react';
import <%= componentName %> from '../components/<%= componentFileName %>';
<%if (isRegister) { %><% include ./partials/registerComponentImport.js -%><%} -%>
const <%= containerName %> = <%= componentName %>;
<%if (isRegister) { %><% include ./partials/registerContainer.js -%><%} -%>
export default <%= containerName %>;
