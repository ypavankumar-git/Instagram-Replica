const initialState = {
    feeds: {}
}

export default function FeedReducer(state = initialState , action) {

    switch(action.type) {
       case "setFeeds":
           {
            return(
            {
              feeds: {...action.payload}
            })}

       case "clearFeeds":
           {
            return(
            {
              feeds: null
            })}

        default:
            return state;
    }
}
        