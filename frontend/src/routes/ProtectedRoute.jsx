import { useContext } from "react"
import { AuthContext } from "../context/authContext"
import { VscLoadingCompact } from "react-icons/vsc";
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext);
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
