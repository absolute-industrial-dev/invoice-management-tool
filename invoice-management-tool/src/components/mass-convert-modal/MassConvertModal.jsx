import { useState } from "react";
import "./MassConvertModal.css";
import { massConvert } from "../../lib/invoiceService";
import toast from "react-hot-toast";
const statuses = ["Sales Log", "Collectibles", "Last File"];

export default function MassConvertModal({ isOpen, setIsOpen }) {
  if (!isOpen) return null;

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [initialStatus, setInitialStatus] = useState("Sales Log");
  const [finalStatus, setFinalStatus] = useState("Collectibles");
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleMassConvert = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await massConvert(
      startDate,
      endDate,
      initialStatus,
      finalStatus
    );
    if (!response.success) {
      setIsLoading(false);
      return toast.error(`${response.error}`);
    }

    setIsLoading(false);
    return toast.success(`Updated ${response.count} invoices successfully.`);
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="massconvert-modal-title"
      onClick={handleClose}
    >
      <form
        className="massconvert-modal-container"
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => handleMassConvert(e)}
      >
        <h2 id="modal-title">Select Invoice Dates to Convert</h2>
        <div className="date-range-container">
          <input
            required
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          ></input>
          <label> To </label>
          <input
            required
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          ></input>
        </div>

        <div className="status-range-container">
          <label>From</label>
          <select onChange={(e) => setInitialStatus(e.target.value)} className="select-modal">
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <label>To</label>
          <select onChange={(e) => setFinalStatus(e.target.value)} className="select-modal">
            {statuses
              .filter((status) => status !== initialStatus)
              .map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
          </select>
        </div>
        <div className="massconvert-modal-buttons">
          {" "}
          <button type="submit" disabled={isLoading}>
            Convert
          </button>
          <button type="cancel" onClick={handleClose} disabled={isLoading}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
