import { useEffect, useState } from "react";
import "./EditModal.css";

export default function EditModal({
  isOpen,
  onClose,
  invoiceData,
  onSave,
  statuses,
}) {
  const [formState, setFormState] = useState({});

  const form2307 = ["With 2307", "Without 2307", "On Hold"];

  useEffect(() => {
    if (invoiceData) {
      setFormState(invoiceData);
    }
  }, [invoiceData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formState);
  };

  /* const formattedDate = new Date(formState.date_collected)
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    })
    .replace(/\s/g, "-"); */

  const inputDate = formState.date_collected
    ? new Date(formState.date_collected).toISOString().split("T")[0]
    : "";

  if (!isOpen) return null;

  return (
    <div>
      <div>
        <h2>Edit Invoice</h2>
        <form onSubmit={handleSubmit}>
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
            Date Collected:
            <input
              type="date"
              name="date_collected"
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

          <label>
            EWT
            <input
              type="text"
              name="ewt"
              value={formState.ewt || ""}
              onChange={handleChange}
            />
          </label>

          <label>
            Without EWT
            <input
              type="text"
              name="wo_ewt"
              value={formState.wo_ewt || ""}
              onChange={handleChange}
            />
          </label>

          <label>
            Counterchecking EWT
            <input
              type="text"
              name="counterchecking_ewt"
              value={formState.counterchecking_ewt || ""}
              onChange={handleChange}
            />
          </label>

          <label>
            Is Service?
            <input
              type="checkbox"
              name="is_service"
              checked={!!formState.is_service}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  is_service: e.target.checked,
                }))
              }
            />
          </label>

          <label>
            Agent Name
            <input
              type="text"
              name="agent"
              value={formState.agent || ""}
              onChange={handleChange}
            />
          </label>

          <label>
            Field Sales
            <input
              type="text"
              name="field_sales"
              value={formState.field_sales || ""}
              onChange={handleChange}
            />
          </label>

          <label>
            Form 2307
            <select
              name="form_2307"
              value={formState.form_2307 || ""}
              onChange={handleChange}
            >
              {form2307.map((formOption) => (
                <option key={formOption} value={formOption}>
                  {formOption}
                </option>
              ))}
            </select>
          </label>

          <label>
            Bank Deposited
            <input
              type="text"
              name="bank_deposited"
              value={formState.bank_deposited || ""}
              onChange={handleChange}
            />
          </label>

          <div>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
