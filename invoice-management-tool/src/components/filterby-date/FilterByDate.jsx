import { useEffect, useState } from "react";
import "./FilterByDate.css";

export default function FilterByMonth({
  selectedMonth,
  setSelectedMonth,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) {

  const months = [
    { label: "January", value: "01" },
    { label: "February", value: "02" },
    { label: "March", value: "03" },
    { label: "April", value: "04" },
    { label: "May", value: "05" },
    { label: "June", value: "06" },
    { label: "July", value: "07" },
    { label: "August", value: "08" },
    { label: "September", value: "09" },
    { label: "October", value: "10" },
    { label: "November", value: "11" },
    { label: "December", value: "12" },
  ];

 /*  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = (currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0");
    handleChange(currentMonth);
  }, []); */

  const handleChange = (monthValue) => {
    const year = new Date().getFullYear();
    const start = `${year}-${monthValue}-01`;
    const lastDay = new Date(year, parseInt(monthValue), 0).getDate();
    const end = `${year}-${monthValue}-${lastDay.toString().padStart(2, "0")}`;

    setSelectedMonth(monthValue);
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div>
      <select
        value={selectedMonth}
        onChange={(e) => handleChange(e.target.value)}
      >
        {months.map((month) => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </select>
    </div>
  );
}
