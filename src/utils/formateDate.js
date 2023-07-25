export const formateDate = (dateNew) => {
	const date = dateNew ? new Date(dateNew) : new Date();

	function getDayOfMonthSuffix(day) {
		if (day >= 11 && day <= 13) {
			return "th";
		}
		const lastDigit = day % 10;
		switch (lastDigit) {
			case 1:
				return "st";
			case 2:
				return "nd";
			case 3:
				return "rd";
			default:
				return "th";
		}
	}

	const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	const dayOfWeek = daysOfWeek[date.getDay()];
	const dayOfMonth = date.getDate();
	const month = months[date.getMonth()];

	const suffix = getDayOfMonthSuffix(dayOfMonth);
	const formattedDate = `${dayOfWeek}, ${dayOfMonth}${suffix} ${month}`;

	return { formattedDate };
};
