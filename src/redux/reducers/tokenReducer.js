const initialState = {
    idToken: null,
    accessToken: null,
    authorized: null
}

export default function TokenReducer(state = initialState , action) {

    switch(action.type) {
       case "setTokens":
           {
            return(
            {
              ...state,
              idToken: action.payload.id_token,
              accessToken: action.payload.access_token,
              authorized: true,
            })}

       case "clearTokens":
            {
             return(
            {
              ...state,
              idToken: null,
              accessToken: null,
              authorized: false,
            })}
           

        default:
            return state;
    }
}
        