import TaskSection from "@/components/pages/tasks/task-section";
import LogoutButton from "@/lib/shared/logout-button";
import { LogOut } from "lucide-react";
import { Suspense } from "react";

export default function TaskPage() {
	return (
		<main className="min-h-screen h-full w-full container mx-auto">
			<nav className=" w-full p-4 flex items-center">
				<h1 className="text-3xl w-full font-semibold text-center">
					Gestion de Tareas
				</h1>
				<LogoutButton className="ml-auto">
					Cerrar sessión <LogOut />
				</LogoutButton>
			</nav>
			<Suspense>
				<TaskSection />
			</Suspense>
		</main>
	);
}
