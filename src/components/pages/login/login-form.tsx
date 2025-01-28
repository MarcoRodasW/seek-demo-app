"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/context/userContext";
import { defaultUser } from "@/lib/shared/mocks/user.mock";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function LoginForm() {
	const { login } = useAuth();
	const router = useRouter();

	const [formValues, setFormValues] = useState({
		username: defaultUser.email,
		password: defaultUser.password,
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		login(formValues.username, formValues.password);
		router.push("/tasks");
	};
	return (
		<form
			onSubmit={handleSubmit}
			className="w-full max-w-80 flex flex-col gap-4"
		>
			<div className="">
				<Label htmlFor="email">Email</Label>
				<Input
					type="email"
					id="email"
					value={formValues.username}
					onChange={(e) =>
						setFormValues({ ...formValues, username: e.target.value })
					}
					placeholder="name@mail.com"
					required
				/>
			</div>
			<div className="">
				<Label htmlFor="password">Password</Label>
				<Input
					type="password"
					id="password"
					value={formValues.password}
					onChange={(e) =>
						setFormValues({ ...formValues, password: e.target.value })
					}
					required
				/>
			</div>

			<Button type="submit">Ingresar</Button>
		</form>
	);
}
