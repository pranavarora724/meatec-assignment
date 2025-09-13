import React, { useState } from "react";
import api from "@/api";

type FormData = {
  title: string;
  description: string;
};

interface CreateTaskProps {
  onClose: () => void;
  toggleApiLoader:()=>void;
}

const CreateTask: React.FC<CreateTaskProps> = ({onClose , toggleApiLoader}) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // clear error on typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async(e: React.FormEvent) => {
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
      console.log("Form Submitted:", formData);

      const newTask = {
        id:generateId(),
        title:formData.title,
        description:formData.description,
        completed:false
     }

     try {
        const res = await api.post('/tasks', newTask);
        console.log(res);
        if(res.status==200)
        {
            onClose();
            toggleApiLoader();
        }
     } catch (error) {
        console.log(error);
     }
    }
  };

  function generateId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 4; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-6 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Create Entry
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

      {/* Submit */}
      <button
        type="submit"
        className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl shadow-md transition-colors duration-200"
      >
        Submit
      </button>
    </form>
  );
};

export default CreateTask;
