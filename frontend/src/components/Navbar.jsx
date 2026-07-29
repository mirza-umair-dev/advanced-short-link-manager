import { Link } from "react-router-dom"
import Userpop from "./Userpop"

export const Navbar = () => {
    return (
        <div className="flex bg-surface items-center justify-between px-10 py-2 border-b border-bd sticky top-0 left-0 w-full">
           <div className="flex items-center gap-2">  <div className="w-2 h-2 bg-accent rounded-full"></div> <Link to='/' >Link Manager</Link></div>
            <div>
                <Userpop />
            </div>
        </div>
    )
}
