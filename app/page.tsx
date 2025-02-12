"use client";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {
	async function signIn(formData: FormData) {
		const body = {
			name: formData.get("name"),
			email: formData.get("email"),
		};

		const response = await fetch("https://frontend-take-home-service.fetch.com/auth/login", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(body),
		});

		if (!response.ok) {
			alert("Unable to Login");
		} else {
			redirect("/adoption");
		}
	}

	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<Image src="/paw.svg" alt="logo" width={450} height={100} />

					<h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
						Sign in to your account
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form action={signIn} className="space-y-6">
						<div>
							<div className="flex items-center justify-between">
								<label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
									Name
								</label>
							</div>
							<div className="mt-2">
								<input
									id="name"
									name="name"
									type="text"
									required
									className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
								/>
							</div>
						</div>

						<div>
							<label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
								Email
							</label>
							<div className="mt-2">
								<input
									id="email"
									name="email"
									type="email"
									required
									autoComplete="email"
									className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Sign in
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
