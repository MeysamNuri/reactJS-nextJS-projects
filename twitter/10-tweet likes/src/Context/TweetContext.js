import React from "react";

var TweetStateContext = React.createContext();
var TweetDispatchContext = React.createContext();

function TweetReducer(state, action) {
  switch (action.type) {
    case "SET_TWEET_TEXT":
      return {...state, tweetText: action.payload};
      case "SET_TWEET_LISTS":
      return {...state, tweetlists: action.payload};
      case "SET_TWEET_LIKES":
        const tweetId=action.payload
        const foundedIndex=state.tweetList.findIndex(item => item._id === tweetId)
        console.log(foundedIndex);
        if(foundedIndex = -1)
        return state
        return {...state,tweetlists :[...state.tweetList.slice(0,foundedIndex),{...state.tweetList[foundedIndex],likes:state.tweetList[foundedIndex].likes +1},[...state.tweetList.slice(foundedIndex + 1)]]}

     
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function TweetProvider({children}) {
  var [state, dispatch] = React.useReducer(TweetReducer, {
    tweetText: "",
    tweetLists:[]
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

export {TweetProvider, useTweetState, useTweetDispatch,setLikeTweet ,setTweetText,setTweetList};

// #########################################################
function setTweetText(dispatch,tweetText) {
  dispatch({
    type: "SET_TWEET_TEXT",
    payload:tweetText
  });
}

function setLikeTweet(dispatch,id) {
  dispatch({
    type: "SET_TWEET_LIKES",
    payload:id
  });
}

function setTweetList(dispatch,tweetlists) {
  dispatch({
    type: "SET_TWEET_LISTS",
    payload:tweetlists
  });
}

