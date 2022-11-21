// const INITIAL_STATE = {
//     user_id: '',
//     name: '',
//     email: '',
//     password: '',

// }

const userReducer = (state = null, action) => {
    switch (action.type) {
        case "SET_USER":
            return action.payload;
        case "UPDATE_USER":
            return action.payload;
        case "LOGOUT":
            return null;
        default:
            return state;
    }
};

export default userReducer;
