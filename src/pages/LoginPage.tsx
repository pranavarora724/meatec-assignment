import LoginForm from "@/components/forms/LoginForm";
import Navbar from "@/components/Navbar";

function LoginPage()
{
    return ( 
            <div className="flex flex-col w-full min-h-screen bg-white text-black  dark:bg-gray-900 dark:text-white  transition-colors duration-300">
                <Navbar></Navbar>
                <LoginForm></LoginForm>
                
            </div>
            )
}

export default LoginPage;