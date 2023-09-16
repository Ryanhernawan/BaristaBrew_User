import logo from "./logo.svg";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./Pages/Dashboard";


function App() {
  return (
    <div >
     <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard/>} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
