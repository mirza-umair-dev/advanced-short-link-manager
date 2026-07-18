
import { forwardRef, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const Input = forwardRef(
({htmlFor,id,type,placeholder,label,error,...props}, ref) => {
    const [show, setshow] = useState(false);
    return (
        <div className="flex flex-col mt-4 font-Inter">
            <label htmlFor={htmlFor} className="text-sm text-lightext">{label}</label>
            {type=='password' ? 
            <div className="flex items-center justify-between mt-2  rounded-lg transition-all bg-surface border-bd border  focus-within:border-accent2 font-light font-sm">
                <input type={show ? 'text' : 'password'} ref={ref} placeholder={placeholder} id={id} {...props}  className=" w-full h-full px-3 py-2 outline-0 " />
                {show ?  <FaRegEyeSlash  onClick={()=>setshow(false)} className="mr-2"/> :<FaRegEye onClick={()=>setshow(true)} className="mr-2" / >}
                
                    
            </div>:
            <input type={type} ref={ref} placeholder={placeholder} id={id} {...props}  className="mt-2 px-3 py-2 rounded-lg transition-all bg-surface border-bd border outline-0 focus:border-accent2 font-light font-sm" />
            }
            {error && (
        <p className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
        </div>
    )
}
);

Input.displayName='Input';

export default Input
