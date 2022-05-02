// import { db } from "./init";
// import { collection, getDocs } from "firebase/firestore/lite";
// //import { setFeeds } from "../redux/actions/feed";
// import store from "../redux/store/store";
// //import Dispatcher from "../redux/reducers/dispatcher";

// const GetFeeds = async () => {
//   const col = collection(db, "feeds");
//   const docs = await getDocs(col);
//   const list = docs.docs.map((doc) => doc.data());
//   store.dispatch({
//     type: "setFeeds",
//     payload: list,
//   });
//   return list;
// };

// export default GetFeeds;
