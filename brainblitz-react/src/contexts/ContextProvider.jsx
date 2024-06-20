import { createContext, useContext, useState } from "react";


const stateContext = createContext({
    user: null,
    token: null,
    role: null,
    setUser: ()=> {},
    setToken: ()=> {},
    setRole: ()=> {},
});

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [token,_setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [role, _setRole] = useState(localStorage.getItem('ACCESS_ROLE'));


    const setToken = (token) => {
        _setToken(token);

        if(token) {
            localStorage.setItem('ACCESS_TOKEN', token)
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    const setRole = (role) => {
        _setRole(role);

        if(role) {
            localStorage.setItem('ACCESS_ROLE', role)
        } else {
            localStorage.removeItem('ACCESS_ROLE');
        }
    }

    return (
        <stateContext.Provider value={
            {user,
            token,
            role,
            setUser,
            setToken,
            setRole,
            }
        }
        >
            {children}
        </stateContext.Provider>
    )}

export const useStateContext = () => useContext(stateContext);