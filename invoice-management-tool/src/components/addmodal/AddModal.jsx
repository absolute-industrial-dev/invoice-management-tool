import { useEffect, useRef, useState } from "react";
import { addNewInvoice } from "../../lib/invoiceService";
import "./AddModal.css";
import Loading from "../../utilities/loading/loading";
import toast, { Toaster } from "react-hot-toast";

export default function AddModal({ isOpen, onClose, reloadInvoices }) {
  const [formState, setFormState] = useState({});
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormState({});

      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 0);

      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          toast("Invoice not added.", { icon: "⚠️" });
          onClose();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const numericFields = [
      "po_number",
      "si_number",
      "dr_number",
      "net_amount",
      "gross_amount",
    ];

    if (numericFields.includes(name)) {
      const isValid = /^\d*\.?\d*$/.test(value);
      if (!isValid) {
        toast.error("Only numbers are allowed in this field.");
        return;
      }
    }

    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    try {
      const success = await addNewInvoice(formState);
      if (success) {
        reloadInvoices();
        setisLoading(false);
        onClose();
        toast.success("Saved successfully!");
      }
    } catch (err) {
      toast.error("Failed to save.");
    } finally {
      setisLoading(false);
    }
  };

  const handleBackdropClick = () => {
    toast("Invoice not added.", { icon: "⚠️" });
    onClose();
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
      onClick={handleBackdropClick}
    >
      <div
        className="modal-container"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="modal-title">Add New Invoice</h2>
        <div className="modal-scroll-content">
          <form onSubmit={handleSubmit} className="form">
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
                required
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
                required
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
                required
              />
            </label>

            <label htmlFor="tin_number">
              TIN:
              <input
                id="tin_number"
                type="text"
                name="tin_number"
                value={formState.tin_number || ""}
                onChange={handleChange}
                aria-required="true"
                aria-label="Tax Identification Number"
                required
              />
            </label>

            <label htmlFor="address">
              Address:
              <textarea
                id="address"
                name="address"
                value={formState.address || ""}
                onChange={handleChange}
                aria-required="true"
                aria-label="Address"
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
                required
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
                required
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
                required
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
                required
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
                {isLoading ? <Loading /> : <>Save</>}
              </button>
              <button type="cancel" onClick={handleBackdropClick}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
