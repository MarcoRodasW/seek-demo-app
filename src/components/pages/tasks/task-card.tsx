"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTaskStore } from "@/lib/store/task-store";
import type { Task } from "@/lib/types/task.types";
import { useDraggable } from "@dnd-kit/core";
import { GripVertical, PencilIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";

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

	const handleDeleteTask = async (task: Task) => {
		await deleteTask(task.id);
		toast.success("Tarea eliminada");
	};

	return (
		<Card className="flex flex-row items-center" style={style} ref={setNodeRef}>
			<div
				className="cursor-grab active:cursor-grabbing"
				{...attributes}
				{...listeners}
			>
				<GripVertical />
			</div>
			<div className="flex flex-col w-full">
				<CardHeader className="flex flex-row items-center justify-between p-2 w-full">
					<CardTitle>{task.title}</CardTitle>
					<div className="flex gap-2 items-center">
						<Button size={"icon"} variant={"ghost"}>
							<PencilIcon />
						</Button>
						<Button
							size={"icon"}
							variant={"ghost"}
							onClick={() => handleDeleteTask(task)}
						>
							<Trash2 className="text-red-500" />
						</Button>
					</div>
				</CardHeader>
				<CardContent className="p-2">
					<p>{task.description}</p>
				</CardContent>
			</div>
		</Card>
	);
}
