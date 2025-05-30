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
