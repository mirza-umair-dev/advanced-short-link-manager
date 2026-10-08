import { useContext } from "react"
import { VscLoadingCompact } from "react-icons/vsc";
import { Navigate } from 'react-router-dom';
import { AppContext } from "../context/ContextProvider";

const ProtectedRoute = ({children}) => {
    const {user,loading} = useContext(AppContext);
    const userInfo = () =>{
        console.log(user.role);
    }
    userInfo();
    if(loading) return (
     <div>
        <div className="animation-spin">
            <VscLoadingCompact />
        </div>
    </div>);

    if(!user){
        return <Navigate to="/auth/login" replace />;
    }

    return children;
}

export default ProtectedRoute
