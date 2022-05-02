import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore/lite";
import "./feedsSection.css";
import { Feed } from "../../components/index";
import { loading } from "../../assets/index";
//import SampleComments from "../../services/sampleComments";
//import GetFeeds from "../../firebase/getFeeds";
import store from "../../redux/store/store";
//import ConvertObjectToMap from "../../utilities/objectToMap";
import { db } from "../../firebase/init";
import ConvertObjectToMap from "../../utilities/objectToMap";

const FeedsSection = () => {
  const [feedsLoaded, setFeedsLoaded] = useState(false);
  const [feedsMapArray, setFeedsMapArray] = useState(
    store.getState().FeedReducer.feeds
  );
  console.log(feedsMapArray);
  console.log(feedsLoaded);

  const GetFeeds = async () => {
    const feedsCollection = collection(db, "feeds");
    const docs = await getDocs(feedsCollection);
    const list = docs.docs.map((doc) => doc.data());
    const mapList = ConvertObjectToMap(list);
    console.log(mapList);

    await setFeedsMapArray(mapList);
    await setFeedsLoaded(true);

    store.dispatch({
      type: "setFeeds",
      payload: mapList,
    });
  };

  useEffect(() => {
    if (store.getState().FeedReducer.feeds === null) {
      GetFeeds();
    } else {
      setFeedsLoaded(true);
    }
  }, []);

  return (
    <div className="feedsSectionContainer">
      {feedsLoaded ? (
        feedsMapArray.map((feed) => (
          <Feed key={feed.get("username")} feed={feed} />
        ))
      ) : (
        <div className="loadingIconContainer">
          <img src={loading} alt="loading" />
        </div>
      )}
    </div>
  );
};

/* name={feed["name"]}
          image={feed["image"]}
          likes={feed["likes"]}
          comments={feed["comments"]}
        /> */

export default FeedsSection;
