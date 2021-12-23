const AuthReducer = (state, action) => {
    switch(action.type){
        case "TOKEN":
            return{
                token: action.payload
            };
            default:
            return state;
    }
}

export default AuthReducer;