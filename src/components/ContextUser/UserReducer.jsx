
const Types ={
    authLogin : 'auth - Login',
    authLogout : 'auth - Logout'

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
        return{
            ...state,
            user:initialState.user,
            
        }
    case Types.authLogin :
        return {...state,
        user: action.payload
        }
    
    default:
        return state;
}

}

export {initialState, Types}
export default UserReducer