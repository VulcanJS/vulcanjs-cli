const RenderKid = require('renderkid');

const kid = new RenderKid();

//gets top level keys and prints them in format
const topLevel = (obj, rightArrow) => {

  let formatted = '';
  Object.keys(obj).forEach(key => {
    if (key.length > 0)
      formatted += `<label>${rightArrow} ${key}</label>`;
    if (obj[key])
      formatted += `<pre>${JSON.stringify(obj[key])}</pre>`;
  });

  return formatted;
};

const renderToConsole = (obj, rightArrow) => {
  try {
    return topLevel(obj, rightArrow)
  } catch(e) {
    return obj;
  }
};

export default function createNodeLogger(customOptions) {
  const options = {
    downArrow: '▼',
    rightArrow: '▶',
    messageColor: 'bright-yellow',
    prevColor: 'grey',
    actionColor: 'bright-blue',
    nextColor: 'green',
    predicate: '',
    ...customOptions
  };

  return ({ getState }) => next => action => {

  const {
    downArrow,
    rightArrow,
    messageColor,
    prevColor,
    actionColor,
    nextColor,
    predicate } = options;

  //bailout on provided predicate
  if (typeof predicate === 'function' && !predicate(getState, action))
    return next(action);

  //bailout on console undefined
  if (typeof console === 'undefined')
    return next(action);

  const prevState = renderToConsole(getState(), rightArrow);
  const actionDisplay = renderToConsole(action, rightArrow);
  const returnValue = next(action);
  const nextState = renderToConsole(getState(), rightArrow);
  const time = new Date();

  const message = `${downArrow} action ${action.type} @ ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;

  kid.style({
    'label': {},
    'list': {
      marginLeft: '1',
    },
    'li': {
      marginLeft: '2',
    },
    'pre': {
      marginLeft: '4',
      display: 'block'
    },
    'message': {
      display: 'block',
      color: messageColor
    },
    'prev': {
      color: prevColor
    },
    'action': {
      color: actionColor
    },
    'next': {
      color: nextColor
    }
  });

  const output = kid.render(`
    <message>
      ${message}
    </message>
    <ul>
      <li><prev>
        prev state
      </prev></li>
      <pre><prev>
        ${prevState}
      </prev></pre>
      <li><action>
        action
      </action></li>
      <pre><action>
        ${actionDisplay}
      </action></pre>
      <li><next>
        next
      </next></li>
      <pre><next>
        ${nextState}
      </next></pre>
    </ul>
  `);

  console.log(output);

  return returnValue;
}};
