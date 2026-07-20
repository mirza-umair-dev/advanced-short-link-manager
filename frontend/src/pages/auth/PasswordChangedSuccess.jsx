
import { ImCheckboxChecked } from "react-icons/im";
import { Link } from "react-router-dom";
const PasswordChangedSuccess = () => {
    return (
         <div className="flex flex-col items-center justify-center w-screen gap-6 h-screen">
            <ImCheckboxChecked size={80}/>
            <h1 className="text-xl font-bold">Password Changed Succesfully</h1>
            <p>Go back and login again with new password to access Link Manager</p>
            <Link to='/auth/login' className="text-accent2">Back to Login Page</Link>
        </div>
    )
}

export default PasswordChangedSuccess;
