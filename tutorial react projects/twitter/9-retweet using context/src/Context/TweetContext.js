import React from "react";

var TweetStateContext = React.createContext();
var TweetDispatchContext = React.createContext();

function TweetReducer(state, action) {
  switch (action.type) {
    case "SET_TWEET_TEXT":
      return {...state, tweetText: action.payload};
   
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function TweetProvider({children}) {
  var [state, dispatch] = React.useReducer(TweetReducer, {
    tweetText: "",
  });
  return (
    <TweetStateContext.Provider value={state}>
      <TweetDispatchContext.Provider value={dispatch}>
        {children}
      </TweetDispatchContext.Provider>
    </TweetStateContext.Provider>
  );
}

function useTweetState() {
  var context = React.useContext(TweetStateContext);
  if (context === undefined) {
    throw new Error("useLayoutState must be used within a LayoutProvider");
  }
  return context;
}

function useTweetDispatch() {
  var context = React.useContext(TweetDispatchContext);
  if (context === undefined) {
    throw new Error("useLayoutDispatch must be used within a LayoutProvider");
  }
  return context;
}

export {TweetProvider, useTweetState, useTweetDispatch ,setTweetText};

// #########################################################
function setTweetText(dispatch,tweetText) {
  dispatch({
    type: "SET_TWEET_TEXT",
    payload:tweetText
  });
}


