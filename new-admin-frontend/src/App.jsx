import React, { memo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import allRoutesMapper from "./routes";
import { Toaster } from "react-hot-toast";
import "./App.css";

const OtherComponents = memo(() => {
  return (
    <>
      <Toaster />
    </>
  );
});

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          {allRoutesMapper?.map((singleRoute, index) => (
            <Route
              key={index}
              path={singleRoute?.path}
              element={singleRoute?.component}
            />
          ))}
        </Routes>
      </BrowserRouter>

      <OtherComponents />
    </div>
  );
};

export default memo(App);
