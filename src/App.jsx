import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { useSelector } from "react-redux";
import Home from "./components/Home";
import CreateStory from "./components/CreateStory";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path='/createStory' element={<CreateStory/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
