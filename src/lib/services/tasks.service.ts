import { revalidatePath } from "next/cache";
import { initialTasks } from "../shared/mocks/tasks.mock";
import type { Task } from "../types/task.types";

export const getTasks = async () => {
	return initialTasks;
};

export const createTask = async (task: Omit<Task, "id">) => {
	const randomId = Math.floor(Math.random() * 1000000);
	revalidatePath("/tasks");
	return initialTasks.push({
		id: randomId.toString(),
		...task,
	});
};

export const updateTask = async (task: Task) => {
	const index = initialTasks.findIndex((t) => t.id === task.id);
	if (index === -1) {
		throw new Error("Task not found");
	}
	initialTasks[index] = task;
	revalidatePath("/tasks");
	return task;
};

export const deleteTask = async (taskId: string) => {
	const index = initialTasks.findIndex((t) => t.id === taskId);
	if (index === -1) {
		throw new Error("Task not found");
	}
	initialTasks.splice(index, 1);
	revalidatePath("/tasks");
	return true;
};
