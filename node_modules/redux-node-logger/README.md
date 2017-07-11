#Redux-Node-Logger
### A Redux logger for node environments
![redux-node-logger screenshot](https://cloud.githubusercontent.com/assets/9889378/9400145/f321b9fe-478b-11e5-9f77-b08baf9573b9.png "A Redux Logger for Node Environments")
### Install
npm install --sav-dev redux-node-logger
### The Gist
No innovations here, just a logger middleware for [redux](https://github.com/rackt/redux) that will write all redux actions and state changes to the node console. Entirely based on [redux-logger](https://github.com/fcomb/redux-logger)
### Usage
redux-node-logger must be called as a function before being utilized as middleware. This allows passing in options to overwrite all colors and arrow icons, as well as a predicate that functions like that in redux-logger. Here's what a simple configureStore function might look like
```js
function configureStore() {
  //other conditions like client etc
  } else if (SERVER && DEVELOPMENT) {

    const createNodeLogger = require('redux-node-logger');
    finalCreateStore = compose(
      applyMiddleware(promiseMiddleware, createNodeLogger({/* an options object */})),
      createStore
    );

  }

  return finalCreateStore(rootReducer);
}
```
### Options Object
The option object has overridable defaults that look like this:
```js
  {
    downArrow: '▼',
    rightArrow: '▶',
    messageColor: 'bright-yellow',
    prevColor: 'grey',
    actionColor: 'bright-blue',
    nextColor: 'green',
    predicate: ''
  }
```

###immutable
works fine because it converts to POJO on JSON.stringify

###Source
uses renderkid to output color and formatting. Doesn't seem to support JSON.stringify(obj, null, 4) for instance. Anyhow, not much to it really. Feel free to look in on createNodeLogger.js and build something more to your needs 

###Webpack
you might need to add
```js
plugins: [
  new webpack.IgnorePlugin(/renderkid/),
]
```
to your config
