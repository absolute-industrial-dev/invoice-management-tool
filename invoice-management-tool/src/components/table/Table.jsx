import { useEffect, useState } from "react";
import Searchbar from "../searchbar/Searchbar";
import Searchby from "../searchby/Searchby";
import "./Table.css";
import {
  fetchInvoices,
  updateInvoiceStatus,
  updateInvoiceData,
  updateIsPaid,
} from "../../lib/invoiceService";
import EditModal from "../editmodal/EditModal";
import ExportToExcel from "../export-to-excel/ExportToExcel";

export default function Table() {
  const [invoices, setInvoices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState("PO Number");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [columnOrder, setColumnOrder] = useState(true);
  const [paidStatus, setPaidStatus] = useState({});

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
  const searchByFilters = [
    "PO Number",
    "SI Number",
    "DR Number",
    "Net Amount",
    "Gross Amount",
    "Company Name",
    "Description",
    "Status",
  ];

  useEffect(() => {
    loadInvoices();
  }, [currentPage, searchQuery, searchBy, columnOrder]);

  const loadInvoices = async () => {
    const result = await fetchInvoices(
      currentPage,
      searchQuery,
      searchBy,
      columnOrder
    );
    setInvoices(result.data);
    setHasMore(result.hasMore);
  };

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

  const openEditModal = (invoice) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedInvoice(null);
    setIsModalOpen(false);
  };

  const handleSaveInvoice = async (updatedInvoice) => {
    const success = await updateInvoiceData(updatedInvoice.id, updatedInvoice);
    if (success) {
      setInvoices((prev) =>
        prev.map((invoice) =>
          invoice.id === updatedInvoice.id ? updatedInvoice : invoice
        )
      );
      handleCloseModal();
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (hasMore) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleColumnOrder = (newColumnOrder) => {
    if (newColumnOrder === searchBy) {
      setColumnOrder((previousOrder) => !previousOrder);
    } else {
      setSearchBy(newColumnOrder);
      setColumnOrder(true);
    }
  };

  const toggleIsPaid = async (invoiceId, newBoolean) => {
    const success = await updateIsPaid(invoiceId, newBoolean);
    if (success) {
      setPaidStatus((prev) => ({ ...prev, [invoiceId]: newBoolean }));

      const newStatus = newBoolean ? "Last File" : "Collectibles";
      await updateInvoiceStatus(invoiceId, newStatus);
    }

    loadInvoices();
  };

  return (
    <div className="main-container">
      <div className="contain">
        <Searchbar
          className="searchb"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <Searchby
          searchByFilters={searchByFilters}
          searchBy={searchBy}
          setSearchBy={setSearchBy}
          className="searchby"
        />
        <div className="pagination">
          <button onClick={() => handleColumnOrder(searchBy)}>
            {" "}
            Set Order: {columnOrder ? "Ascending" : "Descending"}
          </button>
          <button onClick={previousPage} disabled={currentPage === 1}>
            Previous Page
          </button>
          <span className="page-num">{currentPage}</span>
          <button onClick={nextPage} disabled={!hasMore}>
            Next Page
          </button>
        </div>

        <ExportToExcel />
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
                <button onClick={() => openEditModal(invoice)}>Edit</button>
                {invoice.status !== "Sales Log" && (
                  <>
                    <input
                      type="checkbox"
                      checked={paidStatus[invoice.id] ?? invoice.is_paid}
                      onChange={(e) =>
                        toggleIsPaid(invoice.id, e.target.checked)
                      }
                    />
                    <label htmlFor="is_paid">Is Paid?</label>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <EditModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          invoiceData={selectedInvoice}
          onSave={handleSaveInvoice}
          statuses={statuses}
        />
      )}
    </div>
  );
}
