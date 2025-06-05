import { useEffect, useMemo, useRef, useState } from "react";
import "./EditModal.css";
import Loading from "../../utilities/loading/loading";
import toast, { Toaster } from "react-hot-toast";

export default function EditModal({
  isOpen,
  onClose,
  invoiceData,
  onSave,
  statuses,
  reloadInvoices,
}) {
  const [formState, setFormState] = useState({});
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);
  const [isLoading, setisLoading] = useState(false);

  const form2307 = useMemo(
    () => ["Without 2307", "With 2307", "Did not Withhold"],
    []
  );

  useEffect(() => {
    if (invoiceData) {
      setFormState(invoiceData);

      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 0);

      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          toast("Edits were not saved.", { icon: "⚠️" });
          onClose();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [invoiceData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericField = ["net_amount", "gross_amount"];

    if (numericField.includes(name)) {
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
      await onSave(formState);
      toast.success("Saved successfully!");
      onClose();
      reloadInvoices();
    } catch (err) {
      toast.error("Failed to save.");
    } finally {
      setisLoading(false);
    }
  };

  const handleBackdropClick = () => {
    toast("Edits were not saved.", { icon: "⚠️" });
    onClose();
  };

  const invoiceDate = formState.invoice_date
    ? new Date(formState.invoice_date).toISOString().split("T")[0]
    : "";

  const dueDate = formState.due_date
    ? new Date(formState.due_date).toISOString().split("T")[0]
    : "";

  const dateCollected = formState.date_collected
    ? new Date(formState.date_collected).toISOString().split("T")[0]
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
        <h2 id="modal-title">Edit Invoice</h2>
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

            <label htmlFor="invoice_date">
              Invoice Date:
              <input
                id="invoice_date"
                type="date"
                name="invoice_date"
                value={invoiceDate}
                onChange={handleChange}
                aria-required="true"
                aria-label="Invoice Date"
              />
            </label>

            <label htmlFor="due_date">
              Due Date:
              <input
                id="due_date"
                type="date"
                name="due_date"
                value={dueDate}
                onChange={handleChange}
                disabled="true"
                aria-required="true"
                aria-label="Due Date"
              />
            </label>

            <label htmlFor="date_collected">
              Date Collected:
              <input
                id="date_collected"
                type="date"
                name="date_collected"
                value={dateCollected}
                onChange={handleChange}
                aria-required="true"
                aria-label="Date Collected"
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

            <label htmlFor="agent">
              Agent Name
              <input
                id="agent"
                type="text"
                name="agent"
                value={formState.agent || ""}
                onChange={handleChange}
                aria-label="Agent Name"
              />
            </label>

            <label htmlFor="field_sales">
              Field Sales
              <input
                id="field_sales"
                type="text"
                name="field_sales"
                value={formState.field_sales || ""}
                onChange={handleChange}
                aria-label="field_sales"
              />
            </label>

            <label htmlFor="form_2307">
              Form 2307
              <select
                id="form_2307"
                name="form_2307"
                value={formState.form_2307 || ""}
                onChange={handleChange}
                aria-required="true"
                aria-label="Form 2307"
              >
                {form2307.map((formOption) => (
                  <option key={formOption} value={formOption}>
                    {formOption}
                  </option>
                ))}
              </select>
            </label>

            <label htmlFor="is_service">
              Is Service?
              <div className="check-container">
                <input
                  id="is_service"
                  type="checkbox"
                  name="is_service"
                  checked={!!formState.is_service}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      is_service: e.target.checked,
                    }))
                  }
                  aria-label="Is Service"
                />
              </div>
            </label>

            <label htmlFor="ewt">
              EWT
              <input
                id="ewt"
                type="text"
                name="ewt"
                value={formState.ewt || ""}
                onChange={handleChange}
                disabled="true"
                aria-label="EWT"
              />
            </label>

            <label htmlFor="counterchecking_ewt">
              Counterchecking EWT
              <input
                id="counterchecking_ewt"
                type="text"
                name="counterchecking_ewt"
                value={formState.counterchecking_ewt || ""}
                onChange={handleChange}
                disabled="true"
                aria-label="Counterchecking EWT"
              />
            </label>

            <label htmlFor="given_amount">
              Given Amount:
              <input
                id="given_amount"
                type="text"
                name="given_amount"
                value={formState.given_amount || ""}
                onChange={handleChange}
                disabled="true"
                aria-required="true"
                aria-label="Given Amount"
                required
              />
            </label>

            <label htmlFor="bank_deposited">
              Bank Deposited
              <input
                id="bank_deposited"
                type="text"
                name="bank_deposited"
                value={formState.bank_deposited || ""}
                onChange={handleChange}
                aria-label="Bank Deposited"
              />
            </label>

            <label htmlFor="or_number">
              OR Number:
              <input
                id="or_number"
                type="text"
                name="or_number"
                value={formState.or_number || ""}
                onChange={handleChange}
                aria-label="Official Receipt Number"
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

            <label htmlFor="description">
              Description:
              <textarea
                id="description"
                name="description"
                value={formState.description || ""}
                onChange={handleChange}
                aria-required="true"
                aria-label="Description"
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
