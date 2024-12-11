"use client";

import Image from "next/image";
import {
	Dispatch,
	SetStateAction,
	useActionState,
	useEffect,
	useState,
} from "react";
import dynamic from "next/dynamic";
import { deleteSubject } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const deleteActionMap = {
	subject: deleteSubject,
	class: deleteSubject,
	teacher: deleteSubject,
	student: deleteSubject,
	parent: deleteSubject,
	lesson: deleteSubject,
	exam: deleteSubject,
	assignment: deleteSubject,
	result: deleteSubject,
	attendance: deleteSubject,
	event: deleteSubject,
	announcement: deleteSubject,
};

const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
	loading: () => <h1>Loading...</h1>,
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
	loading: () => <h1>Loading...</h1>,
});
const SubjectForm = dynamic(() => import("./forms/SubjectForm"), {
	loading: () => <h1>Loading...</h1>,
});

const forms: {
	[key: string]: (
		setOpen: Dispatch<SetStateAction<boolean>>,
		type: "create" | "update",
		data?: any
	) => JSX.Element;
} = {
	subject: (setOpen, type, data) => (
		<SubjectForm type={type} data={data} setOpen={setOpen} />
	),
	teacher: (type, data, setOpen) => (
		<TeacherForm type={type} data={data} setOpen={setOpen} />
	),
	student: (type, data, setOpen) => (
		<StudentForm type={type} data={data} setOpen={setOpen} />
	),
};

export default function FormModal({
	table,
	type,
	data,
	id,
}: {
	table:
		| "teacher"
		| "student"
		| "parent"
		| "subject"
		| "class"
		| "lesson"
		| "exam"
		| "assignment"
		| "result"
		| "attendance"
		| "event"
		| "announcement";
	type: "create" | "update" | "delete";
	data?: any;
	id?: number | string;
}) {
	const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
	const bgColor =
		type === "create"
			? "bg-lamaYellow"
			: type === "update"
			? "bg-lamaSky"
			: "bg-lamaPurple";

	const [open, setOpen] = useState(false);

	const Form = () => {
		const [state, formAction] = useActionState(deleteActionMap[table], {
			success: false,
			error: false,
		});

		const router = useRouter();

		useEffect(() => {
			if (state.success) {
				toast.error("Subject has been deleted!");
				setOpen(false);
				router.refresh();
			}
		}, [state]);

		return type === "delete" && id ? (
			<form
				action={formAction}
				className="p-4 flex flex-col gap-4 items-center"
			>
				<input type="text | number" name="id" value={id} hidden />
				<span className="text-center font-medium">
					All data will be lost. Are you sure you want to delete this {table} ?
				</span>
				<button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
					Delete
				</button>
			</form>
		) : type === "create" || type === "update" ? (
			forms[table](setOpen, type, data)
		) : (
			"Form not found!"
		);
	};

	return (
		<>
			<button
				onClick={() => setOpen(true)}
				className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
			>
				<Image src={`/${type}.png`} alt="" width={16} height={16} />
			</button>

			{open && (
				<div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
					<div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
						<Form />
						<div
							onClick={() => setOpen(false)}
							className="absolute top-4 right-4 cursor-pointer"
						>
							<Image src="/close.png" alt="" width={14} height={14} />
						</div>
					</div>
				</div>
			)}
		</>
	);
}
