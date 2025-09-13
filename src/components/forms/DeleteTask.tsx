import api from "@/api";
import { type Task } from "@/types";

type DeleteTaskProps = {
  task: Task;
  toggleApiLoader: () => void;
  onClose: () => void;
};

const DeleteTask: React.FC<DeleteTaskProps> = ({ task , toggleApiLoader , onClose }) =>
{

    async function deleteHandler()
    {
        try {    
            const res = await api.delete(`/tasks/${task.id}`)
            if(res.status==200)
            {
                onClose();
                toggleApiLoader();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className="max-w-md mx-auto space-y-6 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                Are you sure you want to delete this task 
            </h2>
            <button
            onClick={deleteHandler}        
                className="w-full bg-red-400 cursor-pointer hover:bg-red-500 text-white font-semibold px-4 py-2 rounded-xl shadow-md transition-colors duration-200"
            >
                Delete
            </button>
        </div>
    )
}

export default DeleteTask;