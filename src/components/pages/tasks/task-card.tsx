"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTaskStore } from "@/lib/store/task-store";
import { type Task, TaskStatus } from "@/lib/types/task.types";
import { useDraggable } from "@dnd-kit/core";
import { GripVertical, Trash2 } from "lucide-react";
import { toast } from "sonner";
import UpdateTaskModal from "./modals/update-task-modal";

interface TaskCardProps {
	task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
	const deleteTask = useTaskStore((state) => state.deleteTask);
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: task.id,
	});
	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
			}
		: undefined;

	const isCompleted = task.status === TaskStatus.Completed;

	const handleDeleteTask = async (task: Task) => {
		await deleteTask(task.id);
		toast.success("Tarea eliminada");
	};

	return (
		<Card className="flex flex-row items-center" style={style} ref={setNodeRef}>
			{!isCompleted && (
				<div
					className="cursor-grab active:cursor-grabbing"
					{...attributes}
					{...listeners}
				>
					<GripVertical />
				</div>
			)}
			<div className="flex flex-col w-full">
				<CardHeader className="flex flex-row items-center justify-between p-2 w-full">
					<CardTitle className="max-w-64 whitespace-normal break-words">
						{task.title}
					</CardTitle>
					<div className="flex gap-2 items-center">
						<UpdateTaskModal task={task} />
						<Button
							size={"icon"}
							variant={"ghost"}
							disabled={isCompleted}
							onClick={() => handleDeleteTask(task)}
						>
							<Trash2 className="text-red-500" />
						</Button>
					</div>
				</CardHeader>
				<CardContent className="flex flex-col gap-2 p-2">
					<p>{task.description}</p>
					{isCompleted && (
						<p>Completado en: {task.completedAt?.toLocaleString()}</p>
					)}
				</CardContent>
			</div>
		</Card>
	);
}
