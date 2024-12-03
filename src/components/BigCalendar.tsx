"use client";
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { calendarEvents } from "@/lib/data";
import { useState } from "react";

const localizer = momentLocalizer(moment);

const BigCalendar = () => {
	const [view, setView] = useState<View>(Views.WORK_WEEK);

	const handleOnChangeView = (selectedView: View) => {
		setView(selectedView);
	};

	return (
		<Calendar
			localizer={localizer}
			events={calendarEvents}
			startAccessor="start"
			endAccessor="end"
			views={["work_week", "day"]}
			onView={handleOnChangeView}
			view={view}
			style={{ height: "98%" }}
			min={new Date(2025, 1, 1, 8, 0, 0)}
			max={new Date(2025, 1, 1, 18, 0, 0)}
		/>
	);
};

export default BigCalendar;