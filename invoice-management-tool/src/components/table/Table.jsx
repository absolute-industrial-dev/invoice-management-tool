import { useEffect, useState } from "react";
import Searchbar from "../searchbar/Searchbar";
import Searchby from "../searchby/Searchby";
import "./Table.css";
import {
  fetchInvoices,
  updateInvoiceStatus,
  updateInvoiceData,
} from "../../lib/invoiceService";
import EditModal from "../editmodal/EditModal";

export default function Table() {
  const [invoices, setInvoices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState("PO Number");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

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
    const loadInvoices = async () => {
      const result = await fetchInvoices(currentPage, searchQuery, searchBy);
      setInvoices(result.data);
      setHasMore(result.hasMore);
    };

    loadInvoices();
  }, [currentPage, searchQuery, searchBy]);

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
        />
        <button onClick={previousPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <span>{currentPage}</span>
        <button onClick={nextPage} disabled={!hasMore}>
          Next Page
        </button>
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
