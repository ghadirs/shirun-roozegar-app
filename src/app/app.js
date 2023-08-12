import * as React from "react";
import "./app.scss";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./routes/index";

function MainApp() {
  return (
    <div id='main-app'>
      <Routes>
        <Route path='' element={<IndexPage />} />
      </Routes>
    </div>
  );
}

export default MainApp;
