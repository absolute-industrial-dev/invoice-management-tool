import "./ExportToExcel.css";
import { RiFileExcel2Fill } from "react-icons/ri";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export default function ExportToExcel({ data }) {
  const status = "Sales Log";
  // Function to export to excel
  const exportToExcel = async () => {
    const templateUrl = "/template.xlsx";

    const response = await fetch(templateUrl);
    const arrayBuffer = await response.arrayBuffer();

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(arrayBuffer);

    const worksheet = workbook.getWorksheet(1);

    const processedData = salesLog(data);

    processedData.forEach((item, index) => {
      const row = worksheet.getRow(index + 3);

      const columns = Object.keys(item);

      columns.forEach((key, colIndex) => {
        row.getCell(colIndex + 1).value = item[key];
      });

      row.commit();
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(blob, "Test 1.xlsx");
  };
  return (
    <button className="ete-button" onClick={exportToExcel}>
      <RiFileExcel2Fill className="excel-icon"/>
    </button>
  );
}

function salesLog(data) {
  return data.map((item) => ({
    "Company Name": item.company_name,
    "PO Number": item.po_number,
    "SI Number": item.si_number,
    "DR Number": item.dr_number,
    "Net Amount": item.net_amount,
    "Gross Amount": item.gross_amount,
    Description: item.description,
    "Tin Number": item.tin_number,
    Address: item.address,
    "Invoice Date": formatDate(item.invoice_date),
    "Due Date": formatDate(item.due_date),
    "Collection Date": "",
    "OR Number": "",
    Agent: item.agent,
    "Commi Status": "",
    SA: "",
    COST: "",
    RATE: "",
    TPC: "",
    COMMI: "",
    PROTIP: "",
    "TOTAL SALES CREDIT": "",
    SUPPLIER: "",
  }));
}

function createColumns(num) {
  const columns = [];
  for (let i = 0; i < num; i++) {
    columns.push({ wch: 25 });
  }
  return columns;
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
