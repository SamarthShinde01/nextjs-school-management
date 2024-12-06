import Announcement from "@/components/Announcement";
import Performance from "@/components/Performance";
import BigCalendar from "@/components/BigCalendar";
import Image from "next/image";
import Link from "next/link";

export default function SingleStudentPage() {
	return (
		<div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
			{/* LEFT */}
			<div className="w-full xl:w-2/3">
				{/* TOP */}
				<div className="flex flex-col lg:flex-row gap-4">
					{/* USER INFO CARD */}
					<div className="bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4">
						<div className="w-1/3">
							<Image
								src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200"
								alt=""
								width={144}
								height={144}
								className="w-32 h-32 rounded-full object-cover"
							/>
						</div>

						<div className="w-2/3 flex flex-col justify-between gap-4">
							<h1 className="text-xl font-semibold">Shubham Gadhe</h1>
							<p className="text-sm text-gray-500">
								Lorem ipsum, dolor sit amet consectetur adipisicing elit.
							</p>
							<div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
								<div className="w-full md:w-1/3 lg:w-full flex items-center  gap-2">
									<Image src="/blood.png" alt="" width={14} height={14} />
									<span>A+</span>
								</div>
								<div className="w-full md:w-1/3 lg:w-full flex items-center  gap-2">
									<Image src="/date.png" alt="" width={14} height={14} />
									<span>January 2025</span>
								</div>
								<div className="w-full md:w-1/3 lg:w-full flex items-center  gap-2">
									<Image src="/mail.png" alt="" width={14} height={14} />
									<span>user@gmail.com</span>
								</div>
								<div className="w-full md:w-1/3 lg:w-full flex items-center  gap-2">
									<Image src="/phone.png" alt="" width={14} height={14} />
									<span>+1 234 567</span>
								</div>
							</div>
						</div>
					</div>
					{/* SMALL CARDS */}
					<div className="flex-1 flex gap-4 justify-between flex-wrap">
						{/* CARD */}
						<div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[47%]">
							<Image
								src="/singleAttendance.png"
								alt=""
								width={24}
								height={24}
								className="w-6 h-6"
							/>
							<div className="">
								<h1 className="text-xl font-semibold">90%</h1>
								<span className="text-sm text-gray-400">Attendance</span>
							</div>
						</div>

						<div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[47%]">
							<Image
								src="/singleBranch.png"
								alt=""
								width={24}
								height={24}
								className="w-6 h-6"
							/>
							<div className="">
								<h1 className="text-xl font-semibold">6th</h1>
								<span className="text-sm text-gray-400">Grade</span>
							</div>
						</div>

						<div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[47%]">
							<Image
								src="/singleLesson.png"
								alt=""
								width={24}
								height={24}
								className="w-6 h-6"
							/>
							<div className="">
								<h1 className="text-xl font-semibold">18</h1>
								<span className="text-sm text-gray-400">Lessons</span>
							</div>
						</div>

						<div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[47%]">
							<Image
								src="/singleClass.png"
								alt=""
								width={24}
								height={24}
								className="w-6 h-6"
							/>
							<div className="">
								<h1 className="text-xl font-semibold">6A</h1>
								<span className="text-sm text-gray-400">Class</span>
							</div>
						</div>
					</div>
				</div>

				{/* BOTTOM */}
				<div className="mt-4 gap-4 p-4 bg-white h-[800px]">
					<h1>Student&apos;s Schedule</h1>
					<BigCalendar />
				</div>
			</div>

			{/* RIGHT */}
			<div className="w-full xl:w-1/3 flex flex-col gap-4">
				<div className="bg-white p-4 rounded-md">
					<h1 className="text-xl font-semibold">Shortcuts</h1>
					<div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
						<Link
							className="p-4 rounded-md bg-lamaSkyLight"
							href={`/list/lessons?classId=${2}`}
						>
							Student&apos;s Lessons
						</Link>
						<Link
							className="p-4 rounded-md bg-lamaPurpleLight"
							href={`/list/teachers?classId=${2}`}
						>
							Student&apos;s Teachers
						</Link>
						<Link
							className="p-4 rounded-md bg-pink-50"
							href={`/list/exams?classId=${2}`}
						>
							Student&apos;s Exams
						</Link>
						<Link
							className="p-4 rounded-md bg-lamaSkyLight"
							href={`/list/assignment?classId=${2}`}
						>
							Student&apos;s Assignments
						</Link>
						<Link
							className="p-4 rounded-md bg-lamaYellowLight"
							href={`/list/results?classId=${2}`}
						>
							Student&apos;s Results
						</Link>
					</div>
				</div>

				<Performance />

				<Announcement />
			</div>
		</div>
	);
}
