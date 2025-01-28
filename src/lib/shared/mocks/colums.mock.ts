import type { Column } from "@/lib/types/column.types";
import { TaskStatus } from "@/lib/types/task.types";

export const columns: Column[] = [
	{ id: TaskStatus.Todo, title: "To-Do", canCreate: true },
	{ id: TaskStatus.InProgress, title: "In Progress", canCreate: true },
	{ id: TaskStatus.Completed, title: "Completed" },
];
