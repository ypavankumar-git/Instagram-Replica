import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router";
import LoginPage from "./pages/loginPage";
import SignUpPage from "./pages/signupPage";
import AuthorizedPages from "./pages/authorizedPages";
import HomePage from "./pages/homePage";
import NotFound from "./components/notFound/notFound";

function Paths() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/home"
            element={
              <AuthorizedPages>
                <HomePage />
              </AuthorizedPages>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Paths;
