import React from "react"
import ReactDom from "react-dom"

import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import App from './App'
import { mainRoutes } from './routes'
import Lang from '@/Lang'

ReactDom.render(
  <Lang>
    <Router>
      <Switch>
        <Route path="/user" render={(routeProps) => <App {...routeProps} />} />
        {mainRoutes.map((route) => {
          return <Route key={route.path} {...route} />;
        })}
        <Redirect to="/user" from="/" />
        <Redirect to="/404" />
      </Switch>
    </Router>
  </Lang>
  ,
  document.getElementById('root')
)