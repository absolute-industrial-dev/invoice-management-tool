import { useEffect, useState, useRef } from "react";
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
import AddModal from "../addmodal/AddModal";
import FilterByDate from "../filterby-date/FilterByDate";
import FilterByStatus from "../filterby-status/FilterByStatus";
import {
  ArrowDownIcon,
  ArrowsUpDownIcon,
  ArrowUpIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";

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
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [closeDropdownTimeout, setCloseDropdownTimeout] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const headers = [
    "PO Number",
    "SI Number",
    "DR Number",
    "Net Amount",
    "Gross Amount",
    "Invoice Date",
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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, searchBy]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  return (
    <div className="main-container">
      <div className="contain">
        <div className="right-container">
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
          <button aria-label="Add Invoice" onClick={() => setIsModalOpen(true)}>
            {" "}
            <PlusIcon className="icon" />
          </button>
          <button
            onClick={() => handleColumnOrder(searchBy)}
            className="sortBy-container"
          >
            {" "}
            Sort By:{" "}
            {columnOrder ? (
              <ArrowUpIcon className="icon" />
            ) : (
              <ArrowDownIcon className="icon" />
            )}
          </button>
        </div>
        <div className="export-dropdown-container" ref={dropdownRef}>
          <div className="export-dropdown">
            <button
              className="export-main-button"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span>Export</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`dropdown-arrow ${isOpen ? "open" : ""}`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {isOpen && (
              <div className="export-dropdown-content">
                <div
                  className="dropdown-option"
                  onClick={(e) => e.stopPropagation()}
                  onMouseEnter={() => setShowStatusFilter(true)}
                  onMouseLeave={() => {
                    const timeout = setTimeout(
                      () => setShowStatusFilter(false),
                      300
                    );
                    setCloseDropdownTimeout(timeout);
                  }}
                >
                  <FilterByStatus
                    onBlur={() => setIsOpen(false)}
                    status={status}
                    setStatus={setStatus}
                  />
                </div>

                <div
                  className="dropdown-option"
                  onClick={(e) => e.stopPropagation()}
                  onMouseEnter={() => setShowDateFilter(true)}
                  onMouseLeave={() => {
                    const timeout = setTimeout(
                      () => setShowDateFilter(false),
                      300
                    );
                    setCloseDropdownTimeout(timeout);
                  }}
                >
                  <FilterByDate
                    onBlur={() => setIsOpen(false)}
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <ExportToExcel
          status={status}
          startDate={startDate}
          endDate={endDate}
        />
        <div className="pagination">
          <button
            onClick={previousPage}
            disabled={currentPage === 1}
            className="next-size"
          >
            <div>
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                transform="rotate(180)"
                width={24}
                height={24}
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z"></path>{" "}
                </g>
              </svg>
            </div>
          </button>
          <span className="page-num">{currentPage}</span>
          <button onClick={nextPage} disabled={!hasMore} className="next-size">
            <div>
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z"></path>{" "}
                </g>
              </svg>
            </div>
          </button>
        </div>
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
                {new Date(invoice.invoice_date)
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
                  className="searchby"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <div className="actions-container">
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
                      <label htmlFor="is_paid" className="isPaid-label">
                        Is Paid?
                      </label>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedInvoice ? (
        <EditModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          invoiceData={selectedInvoice}
          onSave={handleSaveInvoice}
          statuses={statuses}
        />
      ) : (
        <AddModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          reloadInvoices={loadInvoices}
        />
      )}
    </div>
  );
}
