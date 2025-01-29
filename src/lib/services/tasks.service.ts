import { initialTasks } from "../shared/mocks/tasks.mock";
import type { Task } from "../types/task.types";

export const getTasks = async () => {
	return initialTasks;
};

export const createTask = async (task: Omit<Task, "id" | "completedAt">) => {
	const randomId = Math.floor(Math.random() * 1000000);
	return initialTasks.push({
		...task,
		id: randomId.toString(),
		completedAt: null,
	});
};

export const updateTask = async (task: Task) => {
	const index = initialTasks.findIndex((t) => t.id === task.id);
	if (index === -1) {
		throw new Error("Task not found");
	}
	initialTasks[index] = task;
	return task;
};

export const deleteTask = async (taskId: string) => {
	const index = initialTasks.findIndex((t) => t.id === taskId);
	if (index === -1) {
		throw new Error("Task not found");
	}
	initialTasks.splice(index, 1);
	return true;
};
