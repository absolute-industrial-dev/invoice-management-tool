import { useEffect, useState } from "react";
import Searchbar from "../searchbar/Searchbar";
import Searchby from "../searchby/Searchby";
import "./Table.css";
import { fetchInvoices, updateInvoiceStatus } from "../../lib/invoiceService";

export default function Table() {
  const [invoices, setInvoices] = useState([]);

  const headers = [
    "PO Number",
    "SI Number",
    "DR Number",
    "Net Amount",
    "Gross Amount",
    "Date Collected",
    "Company Name",
    "Description",
    "Status",
    "Actions",
  ];
  const statuses = ["Sales Log", "Collectibles", "Last File"];

  const handleStatusChange = async (invoiceId, newStatus) => {
    const success = await updateInvoiceStatus(invoiceId, newStatus);
    if (success) {
      setInvoices((prev) =>
        prev.map((invoice) =>
          invoice.id === invoiceId ? { ...invoice, status: newStatus } : invoice
        )
      );
    }
  };

  const openEditComponent = async () => {
    alert("Opened Edit component.");
  };

  useEffect(() => {
    const loadInvoices = async () => {
      const data = await fetchInvoices();
      setInvoices(data);
    };

    loadInvoices();
  }, []);

  return (
    <div className="main-container">
      <div className="contain">
        <Searchbar className="searchb" />
        <Searchby />
      </div>
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.po_number}</td>
              <td>{invoice.si_number}</td>
              <td>{invoice.dr_number}</td>
              <td>{invoice.net_amount}</td>
              <td>{invoice.gross_amount}</td>
              <td>
                {new Date(invoice.date_collected)
                  .toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "2-digit",
                  })
                  .replace(/\s/g, "-")}
              </td>

              <td>{invoice.company_name}</td>
              <td>{invoice.description}</td>
              <td>
                <select
                  value={invoice.status}
                  onChange={(e) =>
                    handleStatusChange(invoice.id, e.target.value)
                  }
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <button onClick={openEditComponent}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
