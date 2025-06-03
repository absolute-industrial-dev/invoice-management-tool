import { useState } from "react";
import "./FilterByStatus.css";

export default function FilterByStatus({ status, setStatus }) {
  const [selectedStatus, SetSelectedStatus] = useState("");

  const statuses = ["Sales Log", "Collectibles", "Last File"];

  const handleChange = (status) => {
    SetSelectedStatus(status);
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
