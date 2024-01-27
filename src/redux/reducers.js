const initialState = {
    darkMode: true,
};
  
const rootReducer = (state = initialState, action) => {
switch (action.type) {
    case 'TOGGLE_DARK_MODE':
    return {
        ...state,
        darkMode: !state.darkMode,
    };
    default:
    return state;
}
};

export default rootReducer;
  