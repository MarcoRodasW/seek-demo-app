import LogoutButton from "@/lib/shared/logout-button";
import { LogOut } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function TaskPage() {
	const isAuthenticated = cookies().has("token");
	if (!isAuthenticated) {
		return redirect("/");
	}
	return (
		<main className="min-h-screen h-full w-full">
			<nav className="container mx-auto fixed left-0 right-0 top-0 w-full p-4 flex items-center">
				<h1 className="text-3xl w-full font-semibold text-center">
					Gestion de Tareas
				</h1>
				<LogoutButton className="ml-auto">
					Cerrar sessión <LogOut />
				</LogoutButton>
			</nav>
			<section className="mt-24 container mx-auto bg-red-400 h-full w-full">
				x
			</section>
		</main>
	);
}
