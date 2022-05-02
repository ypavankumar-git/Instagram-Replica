import LoginPage from "./pages/loginPage";
import SignUpPage from "./pages/signupPage";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router";
import AuthorizedPages from "./pages/authorizedPages";
import HomePage from "./pages/homePage";
import Profile from "./components/profile/profile";
import Story from "./components/stories/stories";
import ProfilePage from "./pages/profilePage";

const Paths = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path={"/"} exact element={<LoginPage />} />
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/signup"} element={<SignUpPage />} />
          <Route path={"/home"} element={<HomePage />} />
          <Route path={"/profile"} element={<ProfilePage />} />
          <Route path={"/stories"} element={<Story selfProfile={true} />} />
          <Route
            path={"/homed"}
            element={
              <AuthorizedPages>
                <HomePage />
              </AuthorizedPages>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default Paths;
