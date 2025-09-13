import { create } from 'zustand';

import { type Task } from '@/types';

type TaskState = {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, updatedFields: Partial<Task>) => void;
  removeTask: (id: string) => void;
  clearTasks: () => void;
};

export const TaskStore = create<TaskState>((set) => ({
  tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),

  setTasks: (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    set({ tasks });
  },

  addTask: (task) => {
    set((state) => {
      const updatedTasks = [...state.tasks, task];
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    });
  },

  updateTask: (id, updatedFields) => {
    set((state) => {
      const updatedTasks = state.tasks.map((t) =>
        t.id === id ? { ...t, ...updatedFields } : t
      );
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    });
  },

  removeTask: (id) => {
    set((state) => {
      const updatedTasks = state.tasks.filter((t) => t.id !== id);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    });
  },

  clearTasks: () => {
    localStorage.removeItem('tasks');
    set({ tasks: [] });
  },
}));
