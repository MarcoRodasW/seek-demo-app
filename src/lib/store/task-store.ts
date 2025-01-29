import { create } from "zustand";
import { initialTasks } from "../shared/mocks/tasks.mock";
import type { Task } from "../types/task.types";

interface TaskStore {
	tasks: Task[];
	getTasks: () => Promise<void>;
	createTask: (task: Omit<Task, "id" | "completedAt">) => Promise<void>;
	updateTask: (task: Task) => Promise<void>;
	deleteTask: (taskId: string) => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
	tasks: initialTasks,

	// Fetch tasks
	getTasks: async () => {
		const tasks = await Promise.resolve(initialTasks);
		set({ tasks });
	},

	// Create a new task
	createTask: async (task) => {
		const randomId = Math.floor(Math.random() * 1000000);
		const newTask: Task = {
			...task,
			id: randomId.toString(),
			completedAt: null,
		};
		const updatedTasks = [...get().tasks, newTask];
		set({ tasks: updatedTasks });
		return Promise.resolve();
	},

	// Update an existing task
	updateTask: async (task) => {
		const tasks = get().tasks;
		const index = tasks.findIndex((t) => t.id === task.id);
		if (index === -1) {
			throw new Error("Task not found");
		}
		tasks[index] = task;
		set({ tasks: [...tasks] });
		return Promise.resolve();
	},

	// Delete a task
	deleteTask: async (taskId) => {
		const tasks = get().tasks.filter((t) => t.id !== taskId);
		set({ tasks });
		return Promise.resolve();
	},
}));
