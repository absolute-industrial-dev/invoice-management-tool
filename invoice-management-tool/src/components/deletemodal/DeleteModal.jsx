import toast from "react-hot-toast";
import { deleteInvoice } from "../../lib/invoiceService";
import "./DeleteModal.css";
export default function DeleteModal({
  isOpen,
  setIsOpen,
  invoice,
  setSelectedInvoice,
  reloadInvoices,
}) {
  if (!isOpen) return null;
  const invoiceId = invoice.id;

  const handleClose = () => {
    setSelectedInvoice(null);
    setIsOpen(false);
  };

  const handleDelete = async () => {
    const response = await deleteInvoice(invoiceId);

    if (!response) {
      toast.error(`Error deleting invoice: ${response.message}`);
    }

    toast.success("Deleted invoice successfully.");
    reloadInvoices();
  };

  return (
    <div
      className="modal-overlay-2"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={handleClose}
    >
      <div className="modal-container-2">
        <span>
          This will delete all existing records for this invoice.
        </span>
        <span>
          Are you sure you want to delete?
        </span>

        <div className="modal-buttons-2">
          <button className="delete" onClick={handleDelete}>Delete</button>
          <button onClick={handleClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
