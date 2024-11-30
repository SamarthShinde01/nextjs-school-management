import AttendanceChart from "@/app/components/AttendanceChart";
import { CountChart } from "@/app/components/CountChart";
import UserCard from "@/app/components/UserCard";

export default function AdminPage() {
	return (
		<div className="p-4 flex gap-4 flex-col md:flex-row">
			{/* LEFT */}
			<div className="w-full lg:w-2/3 flex flex-col gap-8">
				{/* USER CARD */}
				<div className="flex gap-4 justify-between flex-wrap">
					<UserCard type="student" />
					<UserCard type="teacher" />
					<UserCard type="parent" />
					<UserCard type="staff" />
				</div>

				{/* MIDDLE CHART */}
				<div className="flex gap-4 flex-col lg:flex-row">
					{/* COUNT CHART */}
					<div className="w-full lg:w-1/3 h-[450px]">
						<CountChart />
					</div>

					{/* ATTENDANCE CHART */}
					<div className="w-full lg:w-2/3 h-[450px]">
						<AttendanceChart />
					</div>
				</div>
			</div>

			{/* RIGHT */}
			<div className="w-full lg:w-1/3">R</div>
		</div>
	);
}
