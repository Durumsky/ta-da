import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
