import api from "@/api";
import CreateTask from "@/components/forms/CreateTask";
import Modal from "@/components/Modal";
import Navbar from "@/components/Navbar";
import SingleTask from "@/components/SingleTask";
import { useEffect, useState } from "react";

function DashboardPage() {
  const [addCourseModal, setAddCoureModal] = useState(false);
  const [tasksList, setTasksList] = useState([]);
  const [apiLoader , setApiLoader] = useState(false);

  useEffect(() => {
    getTasks();
  }, [apiLoader]);

  const getTasks = async () => {
    try {
      console.log("Calling");
      const res = await api.get("/tasks");
      setTasksList(res?.data?.tasks);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  function toggleCourseModal() {
    setAddCoureModal((prev) => !prev);
  }

  function toggleApiLoader()
  {
    setApiLoader((prev)=>!prev);
  }

  return (
   <div className="min-h-screen w-full flex flex-col bg-white text-black  dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <Navbar></Navbar>
        {
            (tasksList.length==0)?
            (<div className="grow flex justify-center items-center w-full dark:text-white">
                <div className="flex flex-col gap-y-2 items-center w-full">
                    <div>Click On The Button To Create Tasks</div>
                    <div className="px-2 py-1 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 cursor-pointer" onClick={toggleCourseModal}>Create Task</div>
                </div>
            </div>):
            (<div className="w-full flex flex-col gap-y-4">
                <div  className="w-full flex justify-center items-center">
                    <div onClick={toggleCourseModal} className="px-2 py-1 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 cursor-pointer">Create Task</div>
                </div>
                <div className="max-w-[1024px] w-[90%] mx-auto">
                    {
                        tasksList.filter((el)=>el?.completed==false).length>0
                        &&
                        (
                            <div className="flex flex-col gap-y-3">
                                <div className="text-lg">Ongoing Tasks</div>
                                <div className="flex flex-col gap-y-2">
                                    {
                                        tasksList.filter((el)=>el?.completed==false).map((el , index)=>{
                                            return(
                                                <SingleTask task={el} key={index} toggleApiLoader={toggleApiLoader}></SingleTask>
                                            )
                                        })
                                    }
                                    
                                </div>
                            </div>
                        )
                    }

                    {
                        tasksList.filter((el)=>el?.completed==true).length>0
                        &&
                        (
                            <div className="flex flex-col gap-y-3">
                                <div className="text-lg">Completed Tasks</div>
                                <div className="flex flex-col gap-y-2">
                                    {
                                        tasksList.filter((el)=>el?.completed==true).map((el , index)=>{
                                            return(
                                                <SingleTask task={el} key={index} toggleApiLoader={toggleApiLoader}></SingleTask>
                                            )
                                        })
                                    }
                                    
                                </div>
                            </div>
                        )
                    }
                    
                    
                </div>
            </div>)
        }
        
        <Modal
            isOpen={addCourseModal}
            onClose={toggleCourseModal}
            title="Create Task"
            >
            <CreateTask onClose={toggleCourseModal} toggleApiLoader={toggleApiLoader}></CreateTask>
        </Modal>
    </div>
  );
}

export default DashboardPage;
