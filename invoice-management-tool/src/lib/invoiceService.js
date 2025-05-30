import { supabase } from "./supabase";

export async function fetchInvoices() {
  const { data, error } = await supabase
    .schema("finance")
    .from("invoices")
    .select("*");

  if (error) {
    console.error("Error fetching invoices: ", error);
    return [];
  }

  return data;
}

export async function updateInvoiceStatus(invoiceId, newStatus) {
  const { error } = await supabase
    .schema("finance")
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
    .schema("finance")
    .from("invoices")
    .update(updatedInvoice)
    .eq("id", invoiceId);

  if (error) {
    console.error("Error updating invoice data: ", error);
    return false;
  }

  return true;
}
