import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase.config";

export const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({children}) =>{

    const [currentUser, setCurrentUser] = useState(null)
    const [loader, setLoader] = useState(true)

    // console.log(currentUser);
    

    useEffect(()=>{
        const unsubscibe = onAuthStateChanged(auth, user=>{
            if(user){
                setCurrentUser(user)
            }else{
                setCurrentUser(null)
            }
            setLoader(false)
        })

        return () => unsubscibe()
    },[])

    // console.log(currentUser);
    // console.log(loader);
    
    const value = {
        currentUser,
        loader
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}