import "./ExportToExcel.css";
import { RiFileExcel2Fill } from "react-icons/ri";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { fetchExcelInvoices } from "../../lib/invoiceService";

export default function ExportToExcel({ status, startDate, endDate }) {
  const convertedStatus = status.toLowerCase().replace(/\s+/g, "");

  const options = {
    year: "numeric",
    month: "long",
  };

  const formattedMonth = new Date(startDate).toLocaleDateString('en-US', options); // "June 2025"

  const filename = `${status} - ${formattedMonth}`;

  // Function to export to excel
  const exportToExcel = async () => {
    const data = await fetchExcelInvoices(status, startDate, endDate);
    let templateUrl = `template-${convertedStatus}.xlsx`;

    let processedData = null;

    const response = await fetch(templateUrl);
    const arrayBuffer = await response.arrayBuffer();

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(arrayBuffer);

    const worksheet = workbook.getWorksheet(1);

    if (status === "Collectibles") {
      processedData = collectibles(data);
    } else if (status === "Last File") {
      processedData = lastFile(data);
    } else {
      processedData = salesLog(data);
    }

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
    saveAs(blob, `${filename}.xlsx`);
  };
  return (
    <button className="ete-button" onClick={exportToExcel}>
      <RiFileExcel2Fill className="excel-icon" />
    </button>
  );
}

function salesLog({ data }) {
  const filled = fillMissingRecords(data);
  return filled.map((item) => ({
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

function collectibles({ data }) {
  return data.map((item) => ({
    "Company Name": item.company_name,
    "PO Number": item.po_number,
    "SI Number": item.si_number,
    "DR Number": item.dr_number,
    "Net Amount": item.net_amount,
    "Gross Amount": item.gross_amount,
    Description: item.description,
    "Invoice Date": formatDate(item.invoice_date),
    "Due Date": formatDate(item.due_date),
    Agent: item.agent,
    "W/O EWT": item.wo_ewt,
  }));
}

function lastFile({ data }) {
  return data.map((item) => ({
    "Company Name": item.company_name,
    "PO Number": item.po_number,
    "Item Description": item.description,
    "Net Amount": item.net_amount,
    "SI Number": item.si_number,
    "Invoice Date": formatDate(item.invoice_date),
    Cost: "",
    "Invoice Amount": item.gross_amount,
    "Given Amount": item.given_amount,
    Agent: item.agent,
    fs: item.field_sales,
    "Form 2307": item.form_2307,
    "Commi Rate": "",
    "Date Collected": formatDate(item.date_collected),
    "OR Number": item.or_number,
    "Bank Deposited": item.bank_deposited,
    EWT: item.ewt,
    "Counterchecking (EWT)": item.counterchecking_ewt,
  }));
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function fillMissingRecords(data) {
  const siSet = new Set(
    data.map((item) => parseInt(item.si_number)).filter(Boolean)
  );
  const minSI = Math.min(...siSet);
  const maxSI = Math.max(...siSet);
  const roundedMaxSI = Math.ceil(maxSI / 1000) * 1000;

  const filledData = [];

  for (let si = minSI; si <= roundedMaxSI; si++) {
    if (siSet.has(si)) {
      const record = data.find((item) => parseInt(item.si_number) === si);
      filledData.push(record);
    } else {
      filledData.push({
        company_name: "",
        po_number: "",
        si_number: si.toString(),
        dr_number: "",
        net_amount: "",
        gross_amount: "",
        description: "",
        tin_number: "",
        address: "",
        invoice_date: "",
        due_date: "",
        agent: "",
      });
    }
  }

  return filledData;
}
