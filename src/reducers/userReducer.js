export const userReducer = (state = { name: "Dh" }, action) => {
  switch (action.type) {
    case "LOGGED_IN_USER": {
      // console.log("IN user Reducer==>", action);
      return action.payload;
    }
    case "LOGOUT": {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
