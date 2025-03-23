const initialState = {
  token: ""
};

const Token = (state = initialState, action = {}) => {
  const { type } = action;

  switch (type) {
    case 'SET_TOKEN':
        return {
          ...state,
          token: action.token
        };
    default:
      return state;
  }
};

export default Token;
