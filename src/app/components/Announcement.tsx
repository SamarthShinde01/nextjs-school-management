export default function Announcement() {
	return (
		<div className="p-4 bg-white rounded-md">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-semibold">Announcement</h1>
				<span className="text-xs text-gray-400">View All</span>
			</div>

			<div className="flex flex-col gap-4 mt-4">
				<div className="bg-lamaSkyLight rounded-md p-4 ">
					<div className="flex items-center justify-between">
						<h2 className="font-medium">Lorem ipsum dolor sit</h2>
						<span className="text-xs text-gray-400 bg-white px-1 py-1 rounded-md ">
							2024-01-01
						</span>
					</div>

					<p className="text-xs text-gray-400 mt-1">
						Lorem ipsum dolor sit amet, concesteum adipuscing elit,
					</p>
				</div>

				<div className="bg-lamaPurpleLight rounded-md p-4 ">
					<div className="flex items-center justify-between">
						<h2 className="font-medium">Lorem ipsum dolor sit</h2>
						<span className="text-xs text-gray-400 bg-white px-1 py-1 rounded-md ">
							2024-01-01
						</span>
					</div>

					<p className="text-xs text-gray-400 mt-1">
						Lorem ipsum dolor sit amet, concesteum adipuscing elit,
					</p>
				</div>

				<div className="bg-lamaYellowLight rounded-md p-4 ">
					<div className="flex items-center justify-between">
						<h2 className="font-medium">Lorem ipsum dolor sit</h2>
						<span className="text-xs text-gray-400 bg-white px-1 py-1 rounded-md ">
							2024-01-01
						</span>
					</div>

					<p className="text-xs text-gray-400 mt-1">
						Lorem ipsum dolor sit amet, concesteum adipuscing elit,
					</p>
				</div>
			</div>
		</div>
	);
}
