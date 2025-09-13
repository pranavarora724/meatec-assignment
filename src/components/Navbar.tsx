import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ToggleTheme";
import { AuthStore } from "@/stores/AuthStore";

function Navbar()
{
    const token = AuthStore((s) => s.token);
    const navigate = useNavigate();

    return(
        <div className="w-full">
            <header className="flex justify-between items-center p-4">
                <Link to={'/'}><h1 className="text-2xl font-bold">My App</h1></Link>
                
                <div className="flex flex-row gap-x-4 items-center">
                    <ThemeToggle/>
                    {token && 
                    <div onClick={()=>{ navigate('/'); AuthStore.getState().clearToken();  navigate('/');}} className="px-2 py-2 rounded-md bg-blue-500 hover:bg-blue-600 cursor-pointer text-white">Logout</div>
                    }
                    
                </div>
            </header>
        </div>
    )
}
export default Navbar;