import toast from "react-hot-toast";
import { supabase } from "./supabase";

export async function fetchInvoices(
  currentPage,
  searchQuery,
  searchBy,
  columnOrder = true
) {
  const from = (currentPage - 1) * 10;
  const to = from + 10;
  const column = searchBy.toLowerCase().split(" ").join("_");

  let query = supabase.from("invoices").select("*");

  if (column) {
    query = query.order(column, { ascending: columnOrder });
  }

  if (searchQuery) {
    const numericColumns = [
      "po_number",
      "si_number",
      "dr_number",
      "net_amount",
      "gross_amount",
    ];

    if (numericColumns.includes(column)) {
      query = query.eq(column, searchQuery);
    } else {
      query = query.ilike(column, `%${searchQuery}%`);
    }
  }

  query = query.range(from, to);

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching invoices: ", error);
    return { data: [], hasMore: false };
  }

  const hasMore = data.length > 10;

  return {
    data: data.slice(0, 10),
    hasMore,
  };
}

export async function updateInvoiceStatus(invoiceId, newStatus) {
  const { error } = await supabase
    .from("invoices")
    .update({ status: newStatus })
    .eq("id", invoiceId);

  if (error) {
    console.error("Error updating status: ", error);
    return false;
  }

  return true;
}

export async function updateInvoiceData(invoiceId, updatedInvoice) {
  const { error } = await supabase
    .from("invoices")
    .update(updatedInvoice)
    .eq("id", invoiceId);

  if (error) {
    console.error("Error updating invoice data: ", error);
    return false;
  }

  return true;
}

export async function updateIsPaid(invoiceId, newBoolean) {
  const { error } = await supabase
    .from("invoices")
    .update({ is_paid: newBoolean })
    .eq("id", invoiceId);

  if (error) {
    console.error("Error updating invoice paid status: ", error);
    return false;
  }

  return true;
}

export async function addNewInvoice(formStateData) {
  const { error } = await supabase.from("invoices").insert([formStateData]);

  if (error) {
    console.error("Error updating new invoice: ", error);

    if (error.code === "23505") {
      return {
        message: "Sales Invoice Number already exists.",
        success: false,
        error,
      };
    }
    return {
      message: "Error while saving invoice.",
      success: false,
      error,
    };
  }

  return {
    message: "Invoice added successfully!",
    success: true,
  };
}

export async function fetchExcelInvoices(status, startDate, endDate) {
  try {
    const offset = 0;
    const limit = 1000;
    const invoices = [];

    while (true) {
      let query = supabase
        .from("invoices")
        .select("*")
        .eq("status", status)
        .gte("invoice_date", startDate)
        .lte("invoice_date", endDate);

      if (status === "Collectibles") {
        query = query.order("company_name", { ascending: true });
      } else if (status === "Last File") {
        query = query.order("date_collected", { ascending: true });
      } else {
        query = query.order("si_number", { ascending: true });
      }

      const { data, error } = await query.range(offset, offset + limit - 1);

      if (error) throw error;

      if (!data || data.length === 0) break;

      data.forEach((invoice) => {
        invoices.push(invoice);
      });

      if (data.length < limit) break;
    }

    return { data: invoices };
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function monitorDueDate() {
  try {
    const { data, error } = await supabase.rpc("monitor_due_date");

    if (error) throw error;

    return;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function deleteInvoice(invoiceId) {
  try {
    const { error } = await supabase.rpc("delete_invoice", {
      inv_id: invoiceId,
    });

    if (error) throw error;

    return {
      success: true,
      message: "Deleted invoice successfully.",
    };
  } catch (error) {
    console.error(error.message);
    return { success: false, message: error.message };
  }
}
