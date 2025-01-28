import LoginForm from "@/components/pages/login/login-form";
import { Info } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
	const isAuthenticated = cookies().has("token");
	if (isAuthenticated) {
		return redirect("/tasks");
	}
	return (
		<main className="h-screen w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
			<div className="hidden md:block lg:col-span-2 bg-gradient-to-br from-gray-900 via-black to-gray-900 w-full h-full" />
			<div className="flex flex-col items-center justify-center h-full  mx-auto">
				<h1 className="text-2xl md:text-3xl font-bold">
					Sistema de Gestion de Tareas
				</h1>
				<div
					className="border-dashed flex items-center p-4 gap-2 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 shadow-sm"
					role="alert"
				>
					<Info />
					<p>
						Aplicación de <span className="font-bold">Demo</span>. <br />
						Click en el botón de <span className="font-bold">Ingresar</span>{" "}
						para acceder.
					</p>
				</div>
				<LoginForm />
			</div>
		</main>
	);
}
