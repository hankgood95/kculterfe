import React, {useState, useEffect} from "react";
import Calendar from 'react-calendar';
import './ConcertCalendar.css';
import 'react-calendar/dist/Calendar.css';

function monthToDigit(month) {
	switch(month) {
		case "Jan":
			return 1;
		case "Feb":
			return 2;
		case "Mar":
			return 3;
		case "Apr":
			return 4;
		case "May":
			return 5;
		case "Jun":
			return 6;
		case "Jul":
			return 7;
		case "Aug":
			return 8;
		case "Sep":
			return 9;
		case "Oct":
			return 10;
		case "Nov":
			return 11;
		case "Dec":
			return 12;
	}
}

function date_filter(selectDate, concertDate) {
	if (selectDate[0] > concertDate[0])
		return false;
	else if (selectDate[1] > concertDate[1])
		return false;
	else if (selectDate[2] > concertDate[2])
		return false;
	return true;
}

function dateFormatTrans(date){
	var formattingDate = [];
	var tmp;

	formattingDate = date.toString().split(' ').slice(1, 4).reverse();
	tmp = formattingDate[1];
	formattingDate[1] = formattingDate[2];
	formattingDate[2] = tmp;
	formattingDate[1] = monthToDigit(formattingDate[1]);
	// console.log("formattingDate: " + formattingDate);
	return formattingDate;
}

export default function ConcertCalendar() {
	const [value, setValue] = useState(new Date());
	const [date, setDate] = useState([]);
	function onChange(nextValue) {
		setValue(nextValue);
	}
	useEffect(()=> {
		setDate(dateFormatTrans(value)); // 연, 일, 월 순으로 저장됨
	}, [value])
	// console.log("date: " + date);
	return (
		<>
			<div className="calendar_container">
				<Calendar 
					defaultView="month" 
					minDetail="month" 
					onChange={onChange} 
					value={value}
					formatDay={(locale, date) => date.toLocaleString("en", {day: "numeric"})}
				/>
				<br/>
			</div>
		</>
	)
}
