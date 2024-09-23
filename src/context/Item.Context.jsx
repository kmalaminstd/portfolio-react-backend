/* eslint-disable react/prop-types */
import { onSnapshot } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { itemColRef } from "../config/firebase.config";

export const ItemContext = createContext()

export const ItemProvider = ({children})=>{

    const [items, setItems] = useState(null)

    useEffect(()=>{
        return onSnapshot(itemColRef, snapshot => {
            
            const blog = snapshot.docs.map(elm => {
                
                return{
                    ...elm.data(),
                    id: elm.id
                }
            })
            setItems(blog)
        })
    }, [])

    // console.log(items);
    

    const value = {
        items
    }

    return(
        <ItemContext.Provider value={value}>
            {children}
        </ItemContext.Provider>
    )
}