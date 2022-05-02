const initialState = {
  feeds: null,
};

export default function FeedReducer(state = initialState, action) {
  switch (action.type) {
    case "setFeeds": {
      return {
        feeds: action.payload,
      };
    }

    case "clearFeeds": {
      console.log("clearFeeds called");
      return {
        feeds: action.payload,
      };
    }

    default:
      return state;
  }
}
