
const Types ={
    authLogin : 'auth - Login',
    authLogout : 'auth - Logout',
    authRefresh: 'auth - Refresh'

}

const initialState = {
    user: {
        idUsers: "",
        nameUser: "",
        namePerson:"",
        FkRole:"",
      }
}

const UserReducer = (state,action)=>{
switch(action.type){
    case Types.authLogout: 
    window.localStorage.removeItem("session")
        return{
            ...state,
            user:initialState.user,
        }
    case Types.authLogin :
        window.localStorage.setItem("session", JSON.stringify(action.payload))
        return {...state,
        user: action.payload
        }
    case Types.authRefresh:
        window.localStorage.setItem("session", JSON.stringify(action.payload))
        return{
            ...state,
            user: action.payload
        }
    default:
        return state;
}

}

export {initialState, Types}
export default UserReducer