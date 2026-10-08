import { useContext } from "react"
import { VscLoadingCompact } from "react-icons/vsc";
import { Navigate } from 'react-router-dom';
import { AppContext } from "../context/ContextProvider";
import { useState } from "react";
import { useEffect } from "react";

const ProtectedRoute = ({children}) => {
    const {user,loading} = useContext(AppContext);
    const [userRole, setuserRole] = useState('');
    const userInfo = () =>{
        console.log(user?.role);
        setuserRole(user?.role);
    }


    useEffect(() => {
    
      userInfo();
    }, )
    
    
    if(loading) return (
     <div>
        <div className="animation-spin">
            <VscLoadingCompact />
        </div>
    </div>);

    if(!user){
        return <Navigate to="/auth/login" replace />;
    }

    if(userRole=='user'){
        return children
    }else {
        return <Navigate to="/Admin/analytics" replace />;
    }
}

export default ProtectedRoute
