"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Column } from "@/lib/types/column.types";
import type { Task } from "@/lib/types/task.types";
import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import CreateTaskModal from "./modals/create-task-modal";
import TaskCard from "./task-card";

interface TaskColumProps {
	column: Column;
	tasks: Task[];
}
export default function TaskColum({ column, tasks }: TaskColumProps) {
	const { setNodeRef, isOver } = useDroppable({
		id: column.id,
	});

	return (
		<Card
			key={column.id}
			ref={setNodeRef}
			className={cn("w-full h-full min-h-72", {
				"border-2 border-dashed border-blue-500": isOver,
			})}
		>
			<CardHeader className="flex items-center justify-between flex-row w-full">
				<CardTitle>{column.title}</CardTitle>
				{column.canCreate && <CreateTaskModal column={column} />}
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				{tasks.map((task) => (
					<TaskCard key={task.id} task={task} />
				))}
			</CardContent>
		</Card>
	);
}
