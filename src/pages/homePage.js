import { Home, Header, Feed } from "../components/index";
import FeedsSection from "../sections/feedsSection/feedsSection";
import "./style.css";

const HomePage = () =>{
    return(
        <div className="homePageContainer">
          <Header/>
          <div className="feedsContainer">
            <FeedsSection/>
          </div>
        </div>
    )
}
 
export default HomePage;