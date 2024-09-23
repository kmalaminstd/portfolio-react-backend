/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../context/Auth.context";
import { Navigate, useLocation } from "react-router-dom";
import { CircleLoader } from "react-spinners";

function Public({ children }) {
  const { currentUser, loader } = useContext(AuthContext);
  const location = useLocation();

  // Show the loader until authentication state is determined
  if (loader) {
    return (
            
        <div className="loader_container">

            <CircleLoader 
                    height="100"
                    width="100"
                    radius={1}
                    color="#4fa94d"
                    ariaLabel="puff-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
            />
        </div>
            
    );
  }

  
  if (currentUser) {
    return <Navigate to={location?.state?.from || "/"} />;
  }

  
  return <>{children}</>;
}

export default Public;
