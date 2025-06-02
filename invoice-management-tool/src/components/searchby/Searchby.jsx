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
      </div>
    </div>
  );
}
