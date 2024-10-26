// Actions
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

export const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};
