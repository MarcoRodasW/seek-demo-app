import type { TaskStatus } from "./task.types";

export interface Column {
	id: TaskStatus;
	title: string;
	canCreate?: boolean;
}
