"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/userContext";

interface LogoutButtonProps extends ButtonProps {
	children: React.ReactNode;
}

export default function LogoutButton({
	children,
	className,
	...props
}: LogoutButtonProps) {
	const { logout } = useAuth();
	const rotuer = useRouter();

	function handleClick() {
		logout();
		rotuer.push("/");
	}

	return (
		<Button className={className} {...props} onClick={handleClick}>
			{children}
		</Button>
	);
}
