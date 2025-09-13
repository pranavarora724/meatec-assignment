import Navbar from "@/components/Navbar";

import { Link } from "react-router-dom";

function HomePage()
{
    

    return(
        <div className="min-h-screen w-full flex flex-col bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
              <Navbar></Navbar>
              <div className="grow h-full w-full flex justify-center items-center">
                <div className="flex flex-col gap-y-2 justify-center items-center">
                  <div className="text-xl">Get all you tasks at one place</div>
                  <Link to={'/login'}>
                    <div className="bg-blue-500 hover:bg-blue-600 cursor-pointer px-2 py-1 w-fit rounded-md text-white font-semibold">Get Started</div>
                  </Link>
                  
                </div>
              </div>
            </div>
    )
}
export default HomePage;