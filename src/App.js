import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { userRoutes } from "./routes";
import Frame from "./components/Frame";
import { isLogined } from "./utils/auth";
import "./css/App.scss";

function App() {
  return isLogined() ? (

    <Frame>
      <Switch>
        {userRoutes.map(route => {
          return (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              render={routeProps => {
                console.log(routeProps)
                return <route.component {...routeProps} />;
              }}
            />
          );
        })}
        <Redirect to={userRoutes[0].path} from="/user" />
        <Redirect to="/404" />
      </Switch>
    </Frame>


  ) : (
      <Redirect to="/login" />
    );
}

export default App;
