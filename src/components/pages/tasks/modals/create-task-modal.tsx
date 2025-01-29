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
import { Label } from "@/components/ui/label";
import { useTaskStore } from "@/lib/store/task-store";
import type { Column } from "@/lib/types/column.types";
import { TaskStatus } from "@/lib/types/task.types";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CreateTaskModalProps {
	column?: Column;
}

export default function CreateTaskModal({ column }: CreateTaskModalProps) {
	const [isOpen, setIsOpen] = useState(false);
	const createTask = useTaskStore((state) => state.createTask);

	const handleCreateTask = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const title = formData.get("title") as string;
		const description = formData.get("description") as string;
		await createTask({
			title,
			description,
			status: column?.id || TaskStatus.Todo,
		});
		toast.success(`Tarea ${title} creada correctamente`);
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant={"ghost"} size={"icon"}>
					<PlusIcon />
				</Button>
			</DialogTrigger>
			<DialogContent aria-description="Create task modal">
				<DialogHeader>
					<DialogTitle>Crear tarea</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleCreateTask} className="flex flex-col gap-4">
					<div>
						<Label>Titulo</Label>
						<Input type="text" name="title" required />
					</div>
					<div>
						<Label>Descripcion</Label>
						<Input type="text" name="description" required />
					</div>
					<Button type="submit">Crear</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
