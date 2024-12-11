import Announcement from "@/components/Announcement";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import { currentUserId } from "@/lib/utils";

export default function TeacherPage() {
	return (
		<div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
			{/* LEFT */}
			<div className="w-full xl:w-2/3">
				<div className="h-full bg-white rounded-md p-4">
					<h1 className="text-xl font-semibold">Schedule</h1>

					<BigCalendarContainer type="teacherId" id={currentUserId!} />
				</div>
			</div>

			{/* RIGHT */}
			<div className="w-full xl:w-1/3 flex flex-col gap-8">
				<Announcement />
			</div>
		</div>
	);
}
