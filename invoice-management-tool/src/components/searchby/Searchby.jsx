import { AdjustmentsHorizontalIcon, FunnelIcon } from "@heroicons/react/24/solid";
import "./Searchby.css";

export default function Searchby({
  className = "",
  searchByFilters,
  searchBy,
  setSearchBy,
}) {
  const handleChange = (e) => {
    setSearchBy(e.target.value);
  };

  return (
    <div className={`searchbycontainertest ${className}`}>
      <div className="search-wrapper">
        <select
          name="searchByFilters"
          className="seachBy-Filters"
          value={searchBy}
          onChange={handleChange}
        >
          {searchByFilters.map((filter) => (
            <option key={filter} value={filter}>
              {filter}
            </option>
          ))}
        </select>
        <AdjustmentsHorizontalIcon className="select-icon"/>
      </div>
    </div>
  );
}
