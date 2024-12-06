"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
	const router = useRouter();
	const { isLoaded, isSignedIn, user } = useUser();

	useEffect(() => {
		const role = user?.publicMetadata.role;

		if (role) {
			router.push(`/${role}`);
		}
	}, [user, router]);

	return (
		<div className="h-screen flex items-center justify-center bg-lamaSkyLight">
			<SignIn.Root>
				<SignIn.Step
					name="start"
					className=" bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2"
				>
					<div className="flex flex-col items-center justify-center gap-2 mb-4">
						<h1 className="text-xl font-bold flex items-center gap-2 justify-center">
							<Image src="/logo.png" alt="" width={24} height={24} />
							पाthShala✍🏻
						</h1>
						<h2 className="text-gray-400">Sign in to your account</h2>
					</div>

					<Clerk.GlobalError className="text-xs text-red-400" />
					<Clerk.Field name="identifier" className="flex flex-col gap-2">
						<Clerk.Label className="text-xs text-gray-500">
							Username
						</Clerk.Label>
						<Clerk.Input
							type="text"
							required
							className="p-2 rounded-md ring-1 ring-gray-300"
						/>
						<Clerk.FieldError className="text-xs text-red-400" />
					</Clerk.Field>

					<Clerk.Field name="password" className="flex flex-col gap-2">
						<Clerk.Label className="text-xs text-gray-500">
							Password
						</Clerk.Label>
						<Clerk.Input
							type="password"
							required
							className="p-2 rounded-md ring-1 ring-gray-300"
						/>
						<Clerk.FieldError className="text-xs text-red-400" />
					</Clerk.Field>

					<SignIn.Action
						submit
						className="mt-2 bg-blue-500 text-white rounded-md py-2 px-4 "
					>
						Sign In
					</SignIn.Action>
				</SignIn.Step>
			</SignIn.Root>
		</div>
	);
}
