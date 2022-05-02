import './App.css';
import LoginPage from "./pages/loginPage";
import SignUpPage from "./pages/signupPage";
// import AuthorizedPages from "./pages/authorizedPages";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router";
import AuthorizedPages from "./pages/authorizedPages";
import HomePage from "./pages/homePage";

function App() {
  return (
  <Router>
    <div className="App">
    <Routes>
      <Route path={"/"} exact element={<LoginPage/>} />
      <Route path={"/login"} element={<LoginPage/>} />
      <Route path={"/signup"} element={<SignUpPage/>} />
      <Route path={"/home"} element={<HomePage/>} />
      <Route path={"/homed"} element={ <AuthorizedPages> <HomePage/> </AuthorizedPages> }/>
    </Routes>
    </div>
  </Router>
  );
}

export default App;
