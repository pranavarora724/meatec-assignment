
import React, { useState, useEffect } from "react";
import api from "@/api";

type FormData = {
  title: string;
  description: string;
  completed: boolean;
};

interface UpdateTaskProps {
  task: {
    id: string;
    title: string;
    description: string;
    completed: boolean;
  };
  onClose: () => void;
  toggleApiLoader: () => void;
}

const UpdateTask: React.FC<UpdateTaskProps> = ({ task, onClose, toggleApiLoader }) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    completed: false,
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Pre-fill form with task data
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        completed: task.completed,
      });
    }
  }, [task]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
    ...prev,
    [name]: type === "checkbox" && "checked" in e.target
      ? (e.target as HTMLInputElement).checked
      : value,
  }));

    // clear error on typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<FormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const updatedTask = {
        id: task.id,
        title: formData.title,
        description: formData.description,
        completed: formData.completed,
      };

      try {
        const res = await api.put(`/tasks/${task.id}`, updatedTask);
        if (res.status === 200) {
          onClose();
          toggleApiLoader();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-6 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Update Entry
      </h2>

      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="block font-medium mb-2 text-gray-700 dark:text-gray-300"
        >
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full rounded-xl px-4 py-2 text-gray-900 dark:text-gray-100 
            bg-gray-50 dark:bg-gray-800 border transition-colors duration-200 
            outline-none focus:ring-2 focus:ring-blue-500
            ${
              errors.title
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 dark:border-gray-700"
            }`}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block font-medium mb-2 text-gray-700 dark:text-gray-300"
        >
          Description
        </label>
        <textarea
          name="description"
          id="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          className={`w-full rounded-xl px-4 py-2 text-gray-900 dark:text-gray-100 
            bg-gray-50 dark:bg-gray-800 border transition-colors duration-200 
            outline-none focus:ring-2 focus:ring-blue-500
            ${
              errors.description
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 dark:border-gray-700"
            }`}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      {/* Completed Field (Checkbox) */}
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="completed"
          id="completed"
          checked={formData.completed}
          onChange={handleChange}
          className="w-5 h-5 rounded-md border-gray-300 dark:border-gray-700 text-blue-600 focus:ring-blue-500"
        />
        <label
          htmlFor="completed"
          className="text-gray-700 dark:text-gray-300 font-medium"
        >
          Mark as Completed
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl shadow-md transition-colors duration-200"
      >
        Update
      </button>
    </form>
  );
};

export default UpdateTask;
