import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, classesData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

type Classes = {
	id: number;
	name: string;
	capacity: number;
	grade: number;
	supervisor: string;
};

const columns = [
	{
		header: "Class Name",
		accessor: "name",
	},
	{
		header: "Capacity",
		accessor: "capacity",
		className: "hidden md:table-cell",
	},
	{
		header: "Grade",
		accessor: "grade",
		className: "hidden lg:table-cell",
	},
	{
		header: "Supervisor",
		accessor: "supervisor",
		className: "hidden lg:table-cell",
	},
	{
		header: "Actions",
		accessor: "action",
	},
];

export default function ClassessListPage() {
	const renderRow = (item: Classes) => (
		<tr
			key={item.id}
			className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
		>
			<td className="gap-4 p-4">{item.name}</td>
			<td className="hidden md:table-cell">{item.capacity}</td>
			<td className="hidden lg:table-cell">{item.grade}</td>
			<td className="hidden lg:table-cell">{item.supervisor}</td>
			<td>
				<div className="flex items-center gap-2">
					{role === "admin" && (
						<>
							<FormModal
								table="announcement"
								type="update"
								data={item}
								id={item.id}
							/>
							<FormModal table="announcement" type="update" id={item.id} />
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
				<h1 className="hidden md:block text-lg font-semibold">All Classess</h1>
				<div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full md:w-auto">
					<TableSearch />

					<div className="flex items-center gap-4 self-end ">
						<button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
							<Image src="/filter.png" alt="" width={14} height={14} />
						</button>

						<button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
							<Image src="/sort.png" alt="" width={14} height={14} />
						</button>

						{role === "admin" && <FormModal table="class" type="create" />}
					</div>
				</div>
			</div>

			{/* LIST */}
			<Table columns={columns} renderRow={renderRow} data={classesData} />

			{/* PAGINATION */}
			<Pagination />
		</div>
	);
}
