import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, resultsData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

type Result = {
	id: number;
	subject: string;
	class: string;
	teacher: string;
	student: string;
	date: string;
	type: string;
	score: number;
};

const columns = [
	{
		header: "Subject",
		accessor: "subject",
	},
	{
		header: "Student",
		accessor: "student",
		className: "hidden md:table-cell",
	},
	{
		header: "Score",
		accessor: "score",
		className: "hidden md:table-cell",
	},
	{
		header: "Teacher",
		accessor: "teacher",
		className: "hidden lg:table-cell",
	},
	{
		header: "Class",
		accessor: "class",
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

export default function ResultsListPage() {
	const renderRow = (item: Result) => (
		<tr
			key={item.id}
			className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
		>
			<td className="gap-4 p-4">{item.subject}</td>
			<td className="hidden md:table-cell">{item.student}</td>
			<td className="hidden md:table-cell">{item.score}</td>
			<td className="hidden lg:table-cell">{item.teacher}</td>
			<td className="hidden lg:table-cell">{item.class}</td>
			<td className="hidden lg:table-cell">{item.date}</td>
			<td>
				<div className="flex items-center gap-2">
					{role === "admin" && (
						<>
							<FormModal
								table="result"
								type="update"
								data={item}
								id={item.id}
							/>
							<FormModal table="result" type="delete" id={item.id} />
						</>
					)}
				</div>
			</td>
		</tr>
	);

	return (
		<div className="bg-white rounded-md flex-1 p-4 m-4 mt-0">
			{/* TOP */}
			<div className="flex items-center justify-between">
				<h1 className="hidden md:block text-lg font-semibold">All Results</h1>
				<div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full md:w-auto">
					<TableSearch />

					<div className="flex items-center gap-4 self-end ">
						<button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
							<Image src="/filter.png" alt="" width={14} height={14} />
						</button>

						<button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
							<Image src="/sort.png" alt="" width={14} height={14} />
						</button>

						{role === "admin" && <FormModal table="result" type="create" />}
					</div>
				</div>
			</div>

			{/* LIST */}
			<Table columns={columns} renderRow={renderRow} data={resultsData} />

			{/* PAGINATION */}
			<Pagination />
		</div>
	);
}
