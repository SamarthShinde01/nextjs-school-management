import prisma from "@/lib/prisma";
import { currentUserId, role } from "@/lib/utils";

export default async function Announcement() {
	const roleConditions = {
		teacher: { lessons: { some: { teacherId: currentUserId! } } },
		student: { students: { some: { id: currentUserId! } } },
		parent: { students: { some: { parentId: currentUserId! } } },
	};

	const data = await prisma.announcement.findMany({
		take: 3,
		orderBy: { date: "desc" },
		where: {
			...(role !== "admin" && {
				OR: [
					{ classId: null },
					{ class: roleConditions[role as keyof typeof roleConditions] || {} },
				],
			}),
		},
	});

	return (
		<div className="p-4 bg-white rounded-md">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-semibold">Announcement</h1>
				<span className="text-xs text-gray-400">View All</span>
			</div>

			<div className="flex flex-col gap-4 mt-4">
				{data[0] && (
					<div className="bg-lamaSkyLight rounded-md p-4 ">
						<div className="flex items-center justify-between">
							<h2 className="font-medium">{data[0]?.title}</h2>
							<span className="text-xs text-gray-400 bg-white px-1 py-1 rounded-md ">
								{data[0]?.date.toLocaleDateString()}
							</span>
						</div>

						<p className="text-xs text-gray-400 mt-1">{data[0]?.description}</p>
					</div>
				)}

				{data[1] && (
					<div className="bg-lamaPurpleLight rounded-md p-4 ">
						<div className="flex items-center justify-between">
							<h2 className="font-medium">{data[1]?.title}</h2>
							<span className="text-xs text-gray-400 bg-white px-1 py-1 rounded-md ">
								{data[1]?.date.toLocaleDateString()}
							</span>
						</div>

						<p className="text-xs text-gray-400 mt-1">{data[1]?.description}</p>
					</div>
				)}

				{data[2] && (
					<div className="bg-lamaYellowLight rounded-md p-4 ">
						<div className="flex items-center justify-between">
							<h2 className="font-medium">{data[2]?.title}</h2>
							<span className="text-xs text-gray-400 bg-white px-1 py-1 rounded-md ">
								{data[2]?.date.toLocaleDateString()}
							</span>
						</div>

						<p className="text-xs text-gray-400 mt-1">{data[2]?.description}</p>
					</div>
				)}
			</div>
		</div>
	);
}
