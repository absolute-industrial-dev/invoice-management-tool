import "./ExportToExcel.css";
import { RiFileExcel2Fill } from "react-icons/ri";
import * as XLSX from "xlsx";

export default function ExportToExcel(data) {
  // Function to export to excel
  const exportToExcel = async () => {
    // Create worksheet
    console.log("Data to export:", data.data);
    console.log("Is array?", Array.isArray(data.data));

    const worksheet = XLSX.utils.json_to_sheet(data.data);

    // Create workbook and append worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    //Save file with filename
    XLSX.writeFile(workbook, "Test 1.xlsx");
  };
  return (
    <button className="ete-button" onClick={exportToExcel}>
      <RiFileExcel2Fill />
    </button>
  );
}
