import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore/lite";
import "./feedsSection.css";
import { Feed } from "../../components/index";
import { loading } from "../../assets/index";
import store from "../../redux/store/store";
import { db } from "../../firebase/init";
import ConvertObjectToMap from "../../utilities/objectToMap";

function FeedsSection() {
  const [feedsLoaded, setFeedsLoaded] = useState(false);
  const [feedsMapArray, setFeedsMapArray] = useState(
    store.getState().FeedReducer.feeds
  );

  const GetFeeds = async () => {
    const feedsCollection = collection(db, "feeds");
    const docs = await getDocs(feedsCollection);
    const list = docs.docs.map((doc) => doc.data());
    const mapList = ConvertObjectToMap(list);

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
}

export default FeedsSection;
