"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import Image from "next/image";
import { subjectSchema, SubjectSchema } from "@/lib/formValidationSchemas";

export default function SubjectForm({
	type,
	data,
}: {
	type: "create" | "update";
	data?: any;
}) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SubjectSchema>({
		resolver: zodResolver(subjectSchema),
	});

	const onSubmit = handleSubmit((data) => {
		console.log(data);
	});

	return (
		<form className="flex flex-col gap-8" onSubmit={onSubmit}>
			<h1 className="text-xl font-semibold">
				{type === "create" ? "Create a new subject" : "Update the subject"}
			</h1>

			<div className="flex justify-between flex-wrap gap-4">
				<InputField
					label="Subject Name"
					name="name"
					defaultValue={data?.name}
					register={register}
					error={errors?.name}
				/>
			</div>

			<button className="bg-blue-500 text-white rounded-md p-2">
				{type === "create" ? "Create" : "Update"}
			</button>
		</form>
	);
}
