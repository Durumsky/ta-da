import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Main from "./pages/Main";
import Survey from "./pages/Survey";
import Account from "./pages/Account";
import Secrets from "./pages/Secrets";

import { Routes, Route } from "react-router-dom";

function NotFound() {
  return <h1>Not found - 🙈</h1>;
}

function App() {
  return (
    <>
      <Navbar />
      <div className="app-container">
        <div style={{ maxWidth: 900 }}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/app"
              element={
                <ProtectedRoute redirectTo="/">
                  <Survey />
                </ProtectedRoute>
              }
            />

            <Route
              path="/app/account"
              element={
                <ProtectedRoute redirectTo="/">
                  <Account />
                </ProtectedRoute>
              }
            />
            <Route
              path="/app/secrets"
              element={
                <ProtectedRoute redirectTo="/">
                  <Secrets />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
