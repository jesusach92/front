import {createContext, useReducer} from 'react';
import UserReducer, { initialState } from './UserReducer';

const UserContext = createContext();

const UserProvaider = ({children}) =>{
const [state, dispatch] = useReducer(UserReducer, initialState)
return (
    <UserContext.Provider value={[state, dispatch]}>
        {children}
    </UserContext.Provider>
)
}

export {UserContext};
export default UserProvaider;