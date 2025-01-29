"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useTaskStore } from "@/lib/store/task-store";
import { type Task, TaskStatus } from "@/lib/types/task.types";
import { Label } from "@radix-ui/react-label";
import { PencilIcon } from "lucide-react";
import { useState } from "react";

interface UpdateTaskModalProps {
	task: Task;
}

export default function UpdateTaskModal({ task }: UpdateTaskModalProps) {
	const updateTask = useTaskStore((state) => state.updateTask);
	const [isOpen, setIsOpen] = useState(false);

	const [title, setTitle] = useState(task.title);
	const [description, setDescription] = useState(task.description);

	const isCompleted = task.status === TaskStatus.Completed;

	const handleUpdateTask = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		await updateTask({
			...task,
			title,
			description,
		});
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button size={"icon"} variant={"ghost"} disabled={isCompleted}>
					<PencilIcon />
				</Button>
			</DialogTrigger>
			<DialogContent aria-description="Create task modal">
				<DialogHeader>
					<DialogTitle>Actualizar {task.title}</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleUpdateTask} className="flex flex-col gap-4">
					<div>
						<Label>Titulo</Label>
						<Input
							type="text"
							name="title"
							required
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div>
						<Label>Descripcion</Label>
						<Input
							type="text"
							name="description"
							required
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
					<Button type="submit">Actualizar</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
