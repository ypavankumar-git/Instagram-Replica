import { useState, useEffect } from "react";
import "./feedsSection.css";
// import GetFeeds from "../firebase/getFeeds";
// import store from "../redux/store/store";
import { Feed } from "../../components/index";
import SampleData from "../../services/sampleData";

const FeedsSection = () => {

    const [feeds, setFeeds] = useState(SampleData);
    console.log(feeds);
    const arr = Object.keys(feeds).map(key => feeds[key]);

    // Object.keys(feeds).map(key => {
    //   console.log(feeds[key].username)
    // })
    
    // const callFeeds = async () => {
    //     // console.log(GetFeeds());
    //        await GetFeeds().then (() => {
    //             setFeeds(store.getState().FeedReducer.feeds)
    //             console.log(store.getState().FeedReducer.feeds);  
    //     })
    
    // }    
    
    //   callFeeds();
    

return(
    <div className="feedsSectionContainer">
        {
            arr.map(feed => 
               <Feed feed={feed}></Feed>
            )
        }
   </div>
        
)
}

export default FeedsSection;