/* eslint-disable react/prop-types */
import { useContext } from "react"
import { AuthContext } from "../context/Auth.context"
import { Navigate, useLocation } from "react-router-dom";
import { CircleLoader } from "react-spinners";


function Private({children}) {

    const { currentUser, loader } = useContext(AuthContext)
    const location = useLocation()

    

    if(loader){
        return(
            <div className="loader_container">

                <CircleLoader
                    height="80"
                    width="80"
                    radius={1}
                    color="#4fa94d"
                    aria-label="loading-indicator"
                    visible="true"
                />
            </div>
        )
    }

    if(currentUser){
        return <>{children}</>
    }
      

  return (
    <>
        <Navigate to="/login" state={{from: location}} replace />
    </>
  )
}

export default Private