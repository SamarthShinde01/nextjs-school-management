import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { currentUserId, role } from "@/lib/utils";
import { Class, Event, Prisma } from "@prisma/client";
import Image from "next/image";

type EventListType = Event & { class: Class };

const columns = [
	{
		header: "Title",
		accessor: "title",
	},
	{
		header: "Class",
		accessor: "class",
		className: "hidden md:table-cell",
	},
	{
		header: "Date",
		accessor: "date",
		className: "hidden md:table-cell",
	},
	{
		header: "Start Time",
		accessor: "startTime",
		className: "hidden lg:table-cell",
	},
	{
		header: "End Time",
		accessor: "endTime",
		className: "hidden lg:table-cell",
	},
	...(role === "admin"
		? [
				{
					header: "Actions",
					accessor: "action",
				},
		  ]
		: []),
];
const renderRow = (item: EventListType) => (
	<tr
		key={item.id}
		className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
	>
		<td className="gap-4 p-4">{item.title}</td>
		<td className="hidden md:table-cell">{item.class?.name || "-"}</td>
		<td className="hidden md:table-cell">
			{new Date(item.startTime).toLocaleDateString()}
		</td>
		<td className="hidden lg:table-cell">
			{item.startTime.toLocaleTimeString("en-US", {
				hour: "numeric",
				minute: "2-digit",
				hour12: true,
			})}
		</td>
		<td className="hidden lg:table-cell">
			{item.endTime.toLocaleTimeString("en-IN", {
				hour: "numeric",
				minute: "2-digit",
				hour12: true,
			})}
		</td>
		<td>
			<div className="flex items-center gap-2">
				{role === "admin" && (
					<>
						<FormModal table="event" type="update" data={item} id={item.id} />
						<FormModal table="event" type="delete" id={item.id} />
					</>
				)}
			</div>
		</td>
	</tr>
);
export default async function EventsListPage({
	searchParams,
}: {
	searchParams: any;
}) {
	const { page, ...queryParams } = await searchParams;

	const p = page ? parseInt(page) : 1;

	//URL PARAMS CONDITION

	const query: Prisma.EventWhereInput = {};

	if (queryParams) {
		for (const [key, value] of Object.entries(queryParams)) {
			if (value !== null && typeof value === "string") {
				switch (key) {
					case "classId":
						query.classId = parseInt(value);
						break;
					case "search":
						query.title = { contains: value, mode: "insensitive" };
						break;
					default:
						break;
				}
			}
		}
	}

	//ROLE CONDITIONS
	const roleConditions = {
		teacher: { lessons: { some: { teacherId: currentUserId! } } },
		student: { students: { some: { id: currentUserId! } } },
		parent: { students: { some: { parentId: currentUserId! } } },
	};

	query.OR = [
		{ classId: null },
		{
			class: roleConditions[role as keyof typeof roleConditions] || {},
		},
	];

	const [data, count] = await prisma.$transaction([
		prisma.event.findMany({
			where: query,
			include: {
				class: true,
			},
			take: ITEM_PER_PAGE,
			skip: ITEM_PER_PAGE * (p - 1),
		}),
		prisma.event.count({ where: query }),
	]);

	return (
		<div className="bg-white rounded-md flex-1 p-4 m-4 mt-0">
			{/* TOP */}
			<div className="flex items-center justify-between">
				<h1 className="hidden md:block text-lg font-semibold">All Events</h1>
				<div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full md:w-auto">
					<TableSearch />

					<div className="flex items-center gap-4 self-end ">
						<button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
							<Image src="/filter.png" alt="" width={14} height={14} />
						</button>

						<button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
							<Image src="/sort.png" alt="" width={14} height={14} />
						</button>

						{role === "admin" && <FormModal table="event" type="create" />}
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
