import LoginPage from "./loginPage";
import { useSelector } from "react-redux";
import store from "../redux/store/store";

const AuthorizedPages = ({ children }) => {
  
  const tokenState = useSelector(state => state.TokenReducer)
  // const authorized = store.getState().TokenReducer.authorized;

  return(
      tokenState.authorized ? children : <LoginPage/>
    )
}

export default AuthorizedPages;