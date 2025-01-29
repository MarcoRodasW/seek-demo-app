"use client";

import { columns } from "@/lib/shared/mocks/colums.mock";
import { useTaskStore } from "@/lib/store/task-store";
import type { TaskStatus } from "@/lib/types/task.types";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { useEffect } from "react";
import { toast } from "sonner";
import TaskColum from "./task-colum";
export default function TaskSection() {
	const { tasks, getTasks, updateTask } = useTaskStore();

	useEffect(() => {
		// Fetch tasks on component mount
		getTasks();
	}, [getTasks]);

	const handleDragEnd = async (event: DragEndEvent) => {
		const { active, over } = event;
		const item = tasks.find((t) => t.id === active.id);
		console.log(event);
		if (!item) return;
		console.log(event);
		if (over && active.id !== over.id) {
			await updateTask({ ...item, status: over.id as TaskStatus });
			toast.success("Tarea actualizada");
		}
	};

	return (
		<section className="mt-24 h-full w-full flex flex-row gap-2 items-start justify-evenly">
			<DndContext onDragEnd={handleDragEnd}>
				{columns.map((value, index) => (
					<TaskColum
						key={value.id}
						column={value}
						tasks={tasks.filter((t) => t.status === value.id)}
					/>
				))}
			</DndContext>
		</section>
	);
}
