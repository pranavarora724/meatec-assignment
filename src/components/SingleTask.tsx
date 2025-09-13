import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react"; // lightweight icons
import { type Task } from "@/types";
import Modal from "./Modal";
import UpdateTask from "./forms/UpdateTask";
import DeleteTask from "./forms/DeleteTask";

type SingleTaskProps = {
  task: Task;
  toggleApiLoader: () => void;
};

const SingleTask: React.FC<SingleTaskProps> = ({ task , toggleApiLoader }) => 
{
        const [updateTaskModal , setUpdateTaskModal] = useState(false);
        const [deleteTaskModal , setDeleteTaskModal] = useState(false);
                
        function onEdit()
        {
            toggleUpdateTaskModal();
        }

        function onDelete()
        {
            toggleDeleteModal();
        }

        function toggleUpdateTaskModal()
        {
            setUpdateTaskModal((prev)=>!prev);
        }
        function toggleDeleteModal()
        {
            setDeleteTaskModal((prev)=>!prev);
        }

   return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-5 mb-4 transition hover:shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        {/* Title + Description */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold cursor-default text-gray-900 dark:text-gray-100 break-words w-[90%] truncate">
            {task.title}
          </h3>
          <p className="text-gray-600 cursor-default dark:text-gray-400 text-sm mt-2 whitespace-pre-wrap break-words leading-relaxed">
            {task.description}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onEdit()}
            className="flex items-center cursor-pointer gap-1 px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition"
          >
            <Pencil size={16} />
            Edit
          </button>
          <button
            onClick={() => onDelete()}
            className="flex items-center cursor-pointer gap-1 px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>

      <Modal
            isOpen={updateTaskModal}
            onClose={toggleUpdateTaskModal}
            title="Update Task"
      >
        <UpdateTask task={task} onClose={toggleUpdateTaskModal} toggleApiLoader={toggleApiLoader}></UpdateTask>
      </Modal>

      <Modal
            isOpen={deleteTaskModal}
            onClose={toggleDeleteModal}
            title="Delete Task"
      >
        <DeleteTask task={task} toggleApiLoader={toggleApiLoader} onClose={toggleDeleteModal}></DeleteTask>
      </Modal>
    </div>
  );
};

export default SingleTask;
