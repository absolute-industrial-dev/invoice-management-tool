import { useEffect, useRef, useState } from "react";
import { addNewInvoice } from "../../lib/invoiceService";
import "./AddModal.css";

export default function AddModal({
  isOpen,
  onClose,
  statuses,
  reloadInvoices,
}) {
  const [formState, setFormState] = useState({});
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setFormState({});

      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 0);

      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await addNewInvoice(formState);
    if (success) {
      reloadInvoices();
      onClose();
    }
  };

  const inputDate = formState.invoice_date
    ? new Date(formState.invoice_date).toISOString().split("T")[0]
    : "";

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className="modal-container"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="modal-title">Add New Invoice</h2>
        <div className="modal-scroll-content">
          <form onSubmit={handleSubmit} className="form">
            <label htmlFor="status">
              Status:
              <select
                id="status"
                name="status"
                value={formState.status || ""}
                onChange={handleChange}
                aria-required="true"
                aria-label="File Status"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>

            <label htmlFor="po_number">
              PO Number:
              <input
                id="po_number"
                type="text"
                name="po_number"
                value={formState.po_number || ""}
                onChange={handleChange}
                ref={firstInputRef}
                aria-required="true"
                aria-label="Purchase Order Number"
              />
            </label>

            <label htmlFor="si_number">
              SI Number:
              <input
                id="si_number"
                type="text"
                name="si_number"
                value={formState.si_number || ""}
                onChange={handleChange}
                aria-required="true"
                aria-label="Sales Invoice Number"
              />
            </label>

            <label htmlFor="dr_number">
              DR Number:
              <input
                id="dr_number"
                type="text"
                name="dr_number"
                value={formState.dr_number || ""}
                onChange={handleChange}
                aria-required="true"
                aria-label="Debit Number"
              />
            </label>

            <label htmlFor="net_amount">
              Net Amount:
              <input
                id="net_amount"
                type="text"
                name="net_amount"
                value={formState.net_amount || ""}
                onChange={handleChange}
                aria-required="true"
                aria-label="Net Amount"
              />
            </label>

            <label htmlFor="gross_amount">
              Gross Amount:
              <input
                id="gross_amount"
                type="text"
                name="gross_amount"
                value={formState.gross_amount || ""}
                onChange={handleChange}
                aria-required="true"
                aria-label="Gross Amount"
              />
            </label>

            <label htmlFor="invoice_date">
              Invoice Date:
              <input
                id="invoice_date"
                type="date"
                name="invoice_date"
                value={inputDate}
                onChange={handleChange}
                aria-required="true"
                aria-label="Invoice Date"
              />
            </label>

            <label htmlFor="company_name">
              Company Name:
              <input
                id="company_name"
                type="text"
                name="company_name"
                value={formState.company_name || ""}
                onChange={handleChange}
                aria-required="true"
                aria-label="Company Name"
              />
            </label>

            <label htmlFor="description">
              Description:
              <textarea
                id="description"
                name="description"
                value={formState.description || ""}
                onChange={handleChange}
                aria-label="Purchase Description"
              />
            </label>

            <div className="form-buttons">
              <button type="submit" className="sub-btn">
                Save
              </button>
              <button type="cancel" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
