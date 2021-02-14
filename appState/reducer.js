export const initialState = {
  devID: null,
  user: null,
};

export const actionTypes = {
  SET_devID: "SET_devID",
  SET_USER: "SET_USER",
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_devID:
      return {
        ...state,
        devID: action.devID,
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
