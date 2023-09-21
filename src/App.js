import logo from "./logo.svg";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./Pages/Dashboard";
import Order from "./Pages/Order";


function App() {
  return (
    <div className="App" >
     <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/OrderMenu" element={<Order/>} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
