import React, { Component } from 'react';
<%if (isRegister) { %><% include ./partials/registerComponentImport.js -%><%} -%>

class <%= componentName %> extends Component {
  render () {
    return (
      <div>
        Find me at <%= componentPath %>
      </div>
    );
  }
}
<%if (isRegister) { %><% include ./partials/registerComponent.js -%><%} -%>

export default <%= componentName %>;
