import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './reducers/store'
import App from './App'

// https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
