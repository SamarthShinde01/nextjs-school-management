import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, assignmentsData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

type Assignment = {
	id: number;
	subject: string;
	class: string;
	teacher: string;
	dueDate: string;
};

const columns = [
	{
		header: "Subject Name",
		accessor: "subject",
		className: "hidden md:table-cell",
	},
	{
		header: "Class",
		accessor: "class",
		className: "hidden md:table-cell",
	},
	{
		header: "Teacher",
		accessor: "teacher",
		className: "hidden lg:table-cell",
	},
	{
		header: "Due Date",
		accessor: "dueDate",
		className: "hidden lg:table-cell",
	},
	{
		header: "Actions",
		accessor: "action",
	},
];

export default function AssignmentsListPage() {
	const renderRow = (item: Assignment) => (
		<tr
			key={item.id}
			className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
		>
			<td className="gap-4 p-4">{item.subject}</td>
			<td className="hidden md:table-cell">{item.class}</td>
			<td className="hidden lg:table-cell">{item.teacher}</td>
			<td className="hidden lg:table-cell">{item.dueDate}</td>
			<td>
				<div className="flex items-center gap-2">
					<Link href={`/list/Assignments/${item.id}`}>
						<button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
							<Image src="/edit.png" alt="" width={16} height={16} />
						</button>
					</Link>

					{role === "admin" && (
						<button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
							<Image src="/delete.png" alt="" width={16} height={16} />
						</button>
					)}
				</div>
			</td>
		</tr>
	);

	return (
		<div className="bg-white rounded-md flex-1 p-4 m-4 mt-0">
			{/* TOP */}
			<div className="flex items-center justify-between">
				<h1 className="hidden md:block text-lg font-semibold">
					All Assignments
				</h1>
				<div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full md:w-auto">
					<TableSearch />

					<div className="flex items-center gap-4 self-end ">
						<button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
							<Image src="/filter.png" alt="" width={14} height={14} />
						</button>

						<button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
							<Image src="/sort.png" alt="" width={14} height={14} />
						</button>

						{role === "admin" && (
							<button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
								<Image src="/plus.png" alt="" width={14} height={14} />
							</button>
						)}
					</div>
				</div>
			</div>

			{/* LIST */}
			<Table columns={columns} renderRow={renderRow} data={assignmentsData} />

			{/* PAGINATION */}
			<Pagination />
		</div>
	);
}
