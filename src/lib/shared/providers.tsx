"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { AuthProvider } from "../context/userContext";
export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider attribute="class" defaultTheme="dark">
			<AuthProvider>
				{children}
				<Toaster richColors />
			</AuthProvider>
		</ThemeProvider>
	);
}
