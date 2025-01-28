export enum TaskStatus {
	Todo = 0,
	InProgress = 1,
	Completed = 2,
}

export interface Task {
	id: string;
	title: string;
	description: string;
	status: TaskStatus;
	completedAt: Date | null;
}
