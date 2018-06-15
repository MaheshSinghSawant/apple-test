import React from "react"
import { render } from "react-dom"
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './redux/store/store'

import AppContainer from './containers/AppContainer/'

render (
  <Provider store={ store }>
    <ConnectedRouter history={ history }>
      <div>
        <AppContainer />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
)