"use client";

import { Input } from "@/components/ui/input";
import { columns } from "@/lib/shared/mocks/colums.mock";
import { useTaskStore } from "@/lib/store/task-store";
import { type Task, TaskStatus } from "@/lib/types/task.types";
import {
	DndContext,
	type DragEndEvent,
	PointerSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import TaskColum from "./task-colum";
export default function TaskSection() {
	const tasks = useTaskStore((state) => state.tasks);
	const getTasks = useTaskStore((state) => state.getTasks);
	const updateTask = useTaskStore((state) => state.updateTask);

	const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

	const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);

	const router = useRouter();
	const searchParams = useSearchParams();
	const searchQuery = searchParams.get("search") || "";

	useEffect(() => {
		// Fetch tasks on component mount
		getTasks();
	}, [getTasks]);

	useEffect(() => {
		const filtered = tasks.filter(
			(task) =>
				task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				task.description.toLowerCase().includes(searchQuery.toLowerCase()),
		);
		setFilteredTasks(filtered);
	}, [tasks, searchQuery]);

	const handleSearch = (query: string) => {
		router.push(`?search=${encodeURIComponent(query)}`, { scroll: false });
	};

	const handleDragEnd = async (event: DragEndEvent) => {
		const { active, over } = event;
		const item = tasks.find((t) => t.id === active.id);
		if (!item) return;
		if (over && active.id !== over.id) {
			if (over.id === TaskStatus.Completed) {
				await updateTask({
					...item,
					status: TaskStatus.Completed,
					completedAt: new Date(),
				});
				return;
			}
			await updateTask({ ...item, status: over.id as TaskStatus });
		}
	};

	return (
		<section className="mt-24 h-full w-full flex flex-col gap-4">
			<div className="flex flex-row items-center justify-between">
				<Input
					className="max-w-md"
					placeholder="Buscar tareas..."
					value={searchQuery}
					onChange={(e) => handleSearch(e.target.value)}
				/>
			</div>
			<div className="flex flex-row gap-2 items-start justify-evenly">
				<DndContext onDragEnd={handleDragEnd} sensors={sensors}>
					{columns.map((value, index) => (
						<TaskColum
							key={value.id}
							column={value}
							tasks={filteredTasks.filter((t) => t.status === value.id)}
						/>
					))}
				</DndContext>
			</div>
		</section>
	);
}
