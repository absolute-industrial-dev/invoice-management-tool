import "./Searchby.css";

export default function Searchby({ searchByFilters, searchBy, setSearchBy }) {
  const handleChange = (e) => {
    setSearchBy(e.target.value);
  };

  return (
    <div className="searchbycontainertest">
      <select name="searchByFilters" value={searchBy} onChange={handleChange}>
        {searchByFilters.map((filter) => (
          <option key={filter} value={filter}>
            {filter}
          </option>
        ))}
      </select>
    </div>
  );
}
