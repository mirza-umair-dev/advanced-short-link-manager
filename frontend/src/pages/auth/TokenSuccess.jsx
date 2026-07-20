
import { ImCheckboxChecked } from "react-icons/im";
import { Link } from "react-router-dom";
const TokenSuccess = () => {
    return (
         <div className="flex flex-col items-center justify-center w-screen gap-6 h-screen">
            <ImCheckboxChecked size={80}/>
            <h1 className="text-xl font-bold">Email Sent Succesfully</h1>
            <p>Check your mail  to proceed further!</p>
            <Link to='/auth/login' className="text-accent2">Back to Login Page</Link>
        </div>
    )
}

export default TokenSuccess
