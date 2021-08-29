export const userReducer = (state = null, action) => {
  switch (action.type) {
    case "LOGGED_IN_USER": {
      return state;
    }
    case "LOGOUT": {
      return state;
    }

    default: {
      return state;
    }
  }
};
