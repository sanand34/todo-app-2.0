export const initialState = {
  del: null,
  user: null,
};

export const actionTypes = {
  SET_DEL: "SET_DEL",
  SET_USER: "SET_USER",
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_DEL:
      return {
        ...state,
        del: action.del,
      };

    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
