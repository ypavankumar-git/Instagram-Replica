import { app, db } from "./init";
import { collection, getDocs } from 'firebase/firestore/lite';
import store from "../redux/store/store";
import { setFeeds, clearFeeds } from "../redux/actions/feed";
import Dispatcher from "../redux/reducers/dispatcher";

const GetFeeds = async () => {
    
      const col = collection(db, 'feeds');
      const docs = await getDocs(col);
      const list = docs.docs.map(doc => doc.data());
      return Dispatcher(setFeeds, list);

      // return result;
    }

export default GetFeeds;