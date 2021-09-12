import React from "react";
import createRoutes from "pages";
import "antd/dist/antd.css";

function App() {
  const routes = createRoutes();

  return <div>{routes}</div>;
}

export default App;
