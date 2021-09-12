import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import LandingPage from "pages/LandingPage/LandingPage";

const createRoutes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route key="landingPage" path="/" component={LandingPage} />
        <Route component={LandingPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default createRoutes;
