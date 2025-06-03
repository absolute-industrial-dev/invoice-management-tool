import { supabase } from "./supabase";

export async function fetchInvoices(
  currentPage,
  searchQuery,
  searchBy,
  columnOrder = true
) {
  const from = (currentPage - 1) * 5;
  const to = from + 5;
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

  const hasMore = data.length > 5;

  return {
    data: data.slice(0, 5),
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
    return false;
  }

  return true;
}

export async function fetchExcelInvoices(status, startDate, endDate) {
  try {
    const offset = 0;
    const limit = 1000;
    const invoices = [];

    while (true) {
      const { data, error } = await supabase
        .from("invoices")
        .select("*")
        .eq("status", status)
        .gte("invoice_date", startDate)
        .lte("invoice_date", endDate)
        .range(offset, offset + limit - 1);

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
