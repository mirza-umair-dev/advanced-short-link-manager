import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";

const Userpop = () => {
  const { user,logout } = useContext(AuthContext);
  const [showpop, setshowpop] = useState(false);

  return (

    <div>
      <div className="rounded-full h-10 w-10 bg-accent2 font-semibold flex items-center justify-center text-lg cursor-pointer" onClick={()=> setshowpop(!showpop)}>
        {user.name[0].toUpperCase()}
      </div>
      {showpop && 
      <div className="relative"> 
      <div className="flex px-4 py-3 flex-col gap-1 border border-bd rounded-lg absolute top-6 right-0 bg-surface"> 
      <h3 className="font-semibold text-xl">{user.name}</h3>
      <p className="text-sm">{user.email}</p>
      <button className="bg-red-500 px-2 py-1 text-white rounded cursor-pointer" onClick={logout}>
        Logout
      </button>
         </div>
      </div>
      }
    </div>
  );
};

export default Userpop;
