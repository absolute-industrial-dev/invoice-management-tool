import { useEffect, useState } from "react";
import { addNewInvoice } from "../../lib/invoiceService";
import "./AddModal.css";

export default function AddModal({ isOpen, onClose, statuses, reloadInvoices }) {
  const [formState, setFormState] = useState({});

  useEffect(() => {
    if (isOpen) {
      setFormState({});
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
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Add New Invoice</h2>
        <div className="modal-scroll-content">
          <form onSubmit={handleSubmit} className="form">
            <label>
              Status:
              <select
                name="status"
                value={formState.status || ""}
                onChange={handleChange}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>

            <label>
              PO Number:
              <input
                type="text"
                name="po_number"
                value={formState.po_number || ""}
                onChange={handleChange}
              />
            </label>

            <label>
              SI Number:
              <input
                type="text"
                name="si_number"
                value={formState.si_number || ""}
                onChange={handleChange}
              />
            </label>

            <label>
              DR Number:
              <input
                type="text"
                name="dr_number"
                value={formState.dr_number || ""}
                onChange={handleChange}
              />
            </label>

            <label>
              Net Amount:
              <input
                type="text"
                name="net_amount"
                value={formState.net_amount || ""}
                onChange={handleChange}
              />
            </label>

            <label>
              Gross Amount:
              <input
                type="text"
                name="gross_amount"
                value={formState.gross_amount || ""}
                onChange={handleChange}
              />
            </label>

            <label>
              Invoice Date:
              <input
                type="date"
                name="invoice_date"
                value={inputDate}
                onChange={handleChange}
              />
            </label>

            <label>
              Company Name:
              <input
                type="text"
                name="company_name"
                value={formState.company_name || ""}
                onChange={handleChange}
              />
            </label>

            <label>
              Description:
              <textarea
                name="description"
                value={formState.description || ""}
                onChange={handleChange}
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
