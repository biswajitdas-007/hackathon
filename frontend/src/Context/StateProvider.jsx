import { createContext, useState } from "react";

const StateContext = createContext();

const StateProvider = ({children}) => {
    const [isAuth, setAuth] = useState(false);
    const toggleAuth = (token) => {
        if (token) {
            setAuth(true)
        }
    }
    const value = { isAuth, toggleAuth };
    return (
        <StateContext.Provider value={value}>{children}</StateContext.Provider>
    )
}

export { StateContext, StateProvider };