import { useEffect, useState } from "react";
import "./FilterByStatus.css";

export default function FilterByStatus({ status, setStatus }) {
  const [selectedStatus, setSelectedStatus] = useState("");

  const statuses = ["Sales Log", "Collectibles", "Last File"];

  useEffect(() => {
    setSelectedStatus("Sales Log");
    setStatus("Sales Log");
  }, [setStatus]);

  const handleChange = (status) => {
    setSelectedStatus(status);
    setStatus(status);
  };

  return (
    <div>
      <select
        value={selectedStatus}
        onChange={(e) => handleChange(e.target.value)}
      >
        <option value="">Select a status</option>
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
}
