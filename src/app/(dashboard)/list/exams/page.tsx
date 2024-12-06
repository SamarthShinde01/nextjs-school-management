import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Class, Exam, Prisma, Subject, Teacher, Lesson } from "@prisma/client";
import Image from "next/image";

type ExamListTypes = Exam & {
	lesson: {
		subject: Subject;
		class: Class;
		teacher: Teacher;
	};
};
const columns = [
	{
		header: "Subject",
		accessor: "subject",
	},
	{
		header: "Class",
		accessor: "grade",
		className: "hidden md:table-cell",
	},
	{
		header: "Teacher",
		accessor: "teacher",
		className: "hidden lg:table-cell",
	},
	{
		header: "Date",
		accessor: "date",
		className: "hidden lg:table-cell",
	},
	{
		header: "Actions",
		accessor: "action",
	},
];
const renderRow = (item: ExamListTypes) => (
	<tr
		key={item.id}
		className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
	>
		<td className="gap-4 p-4">{item.lesson.subject.name}</td>
		<td className="hidden md:table-cell">{item.lesson.class.name}</td>
		<td className="hidden lg:table-cell">
			{item.lesson.teacher.name + " " + item.lesson.teacher.surname}
		</td>
		<td className="hidden lg:table-cell">
			{new Date(item.startTime).toLocaleDateString()}
		</td>
		<td>
			<div className="flex items-center gap-2">
				{role === "admin" && (
					<>
						<FormModal table="exam" type="update" data={item} id={item.id} />
						<FormModal table="exam" type="delete" id={item.id} />
					</>
				)}
			</div>
		</td>
	</tr>
);

export default async function ExamsListPage({
	searchParams,
}: {
	searchParams: any;
}) {
	const { page, ...queryParams } = await searchParams;

	const p = page ? parseInt(page) : 1;

	//URL PARAMS CONDITION

	const query: Prisma.ExamWhereInput = {};

	if (queryParams) {
		for (const [key, value] of Object.entries(queryParams)) {
			if (value !== null && typeof value === "string") {
				switch (key) {
					case "classId":
						query.lesson = { classId: parseInt(value) };
						break;
					case "teacherId":
						query.lesson = { teacherId: value };
						break;
					case "search":
						query.lesson = {
							subject: {
								name: { contains: value, mode: "insensitive" },
							},
						};
					default:
						break;
				}
			}
		}
	}

	const [data, count] = await prisma.$transaction([
		prisma.exam.findMany({
			where: query,
			include: {
				lesson: {
					select: {
						subject: { select: { name: true } },
						class: { select: { name: true } },
						teacher: { select: { name: true, surname: true } },
					},
				},
			},
			take: ITEM_PER_PAGE,
			skip: ITEM_PER_PAGE * (p - 1),
		}),
		prisma.exam.count({ where: query }),
	]);

	return (
		<div className="bg-white rounded-md flex-1 p-4 m-4 mt-0">
			{/* TOP */}
			<div className="flex items-center justify-between">
				<h1 className="hidden md:block text-lg font-semibold">All Exams</h1>
				<div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full md:w-auto">
					<TableSearch />

					<div className="flex items-center gap-4 self-end ">
						<button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
							<Image src="/filter.png" alt="" width={14} height={14} />
						</button>

						<button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
							<Image src="/sort.png" alt="" width={14} height={14} />
						</button>

						{role === "admin" && <FormModal table="exam" type="create" />}
					</div>
				</div>
			</div>

			{/* LIST */}
			<Table columns={columns} renderRow={renderRow} data={data} />

			{/* PAGINATION */}
			<Pagination page={p} count={count} />
		</div>
	);
}
