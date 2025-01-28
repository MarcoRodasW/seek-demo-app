import { type Task, TaskStatus } from "@/lib/types/task.types";

export const initialTasks: Task[] = [
	{
		id: "1",
		title: "Task 1",
		description: "Description 1",
		status: TaskStatus.Todo,
		completedAt: null,
	},
];
