import logo from "./logo.svg";
import "./App.css";
//components
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";

//pages
import Main from "./pages/Main";

import { Routes, Route } from "react-router-dom";

function NotFound() {
  return <h1>Not found - 🙈</h1>
}

function App() {
  return (
    <>
      <Navbar />
      <div className="app-container">
      <div style={{maxWidth: 900}}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path='*' element={<NotFound />} />
         
        </Routes>
      </div>
      </div>
    </>
  );
}

export default App;
