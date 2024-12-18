import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { currentUserId, role } from "@/lib/utils";
import { Announcement, Class, Prisma } from "@prisma/client";
import Image from "next/image";

type AnnouncementListPage = Announcement & { class: Class };

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

const renderRow = (item: AnnouncementListPage) => (
	<tr
		key={item.id}
		className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
	>
		<td className="gap-4 p-4">{item.title}</td>
		<td className="hidden md:table-cell">{item.class?.name || "-"}</td>
		<td className="hidden lg:table-cell">
			{new Date(item.date).toLocaleDateString()}
		</td>
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

						<FormModal table="announcement" type="delete" id={item.id} />
					</>
				)}
			</div>
		</td>
	</tr>
);

export default async function AnnouncementsListPage({
	searchParams,
}: {
	searchParams: any;
}) {
	const { page, ...queryParams } = await searchParams;

	const p = page ? parseInt(page) : 1;

	//URL PARAMS CONDITION

	const query: Prisma.AnnouncementWhereInput = {};

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
		prisma.announcement.findMany({
			where: query,
			include: {
				class: { select: { name: true } },
			},
			take: ITEM_PER_PAGE,
			skip: ITEM_PER_PAGE * (p - 1),
		}),
		prisma.announcement.count({ where: query }),
	]);

	return (
		<div className="bg-white rounded-md flex-1 p-4 m-4 mt-0">
			{/* TOP */}
			<div className="flex items-center justify-between">
				<h1 className="hidden md:block text-lg font-semibold">
					All Announcements
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
							<FormModal type="create" table="announcement" />
						)}
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
