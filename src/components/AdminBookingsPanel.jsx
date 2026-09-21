"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

const PAGE_SIZE = 8;
const STATUS_OPTIONS = ["Pending", "Confirmed", "Cancelled", "Completed"];

function formatDisplayDate(value) {
  if (!value) return "—";

  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function AdminBookingsPanel() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [hasStatusColumn, setHasStatusColumn] = useState(true);

  async function fetchBookings() {
    setLoading(true);
    setError("");

    try {
      let query = supabase
        .from("Bookings")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false });

      if (filterDate) {
        query = query.eq("date", filterDate);
      }

      if (statusFilter !== "all" && hasStatusColumn) {
        query = query.eq("status", statusFilter);
      }

      const { data, error: queryError, count } = await query;

      if (queryError) {
        if (String(queryError.message).toLowerCase().includes("status")) {
          setHasStatusColumn(false);
          setStatusFilter("all");
        }
        throw queryError;
      }

      const normalized = (data || []).map((item) => ({
        ...item,
        status: item.status || "Pending",
      }));

      setBookings(normalized);
      setPage((current) => Math.min(current, Math.max(1, Math.ceil((count || normalized.length) / PAGE_SIZE)) || 1));
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load bookings.");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterDate, statusFilter, hasStatusColumn]);

  const filteredBookings = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return bookings.slice(start, start + PAGE_SIZE);
  }, [bookings, page]);

  const totalPages = Math.max(1, Math.ceil(bookings.length / PAGE_SIZE));

  async function updateBookingStatus(id, nextStatus) {
    try {
      const { error: updateError } = await supabase
        .from("Bookings")
        .update({ status: nextStatus })
        .eq("id", id);

      if (updateError) {
        if (String(updateError.message).toLowerCase().includes("status")) {
          setHasStatusColumn(false);
          setError(
            'The status column is missing. Run the migration in supabase-bookings.sql before updating statuses.',
          );
          return;
        }
        throw updateError;
      }

      setBookings((current) =>
        current.map((item) => (item.id === id ? { ...item, status: nextStatus } : item)),
      );
    } catch (updateFailure) {
      setError(
        updateFailure instanceof Error
          ? updateFailure.message
          : "The booking status could not be updated.",
      );
    }
  }

  return (
    <div className="admin-panel admin-table-panel">
      <div className="admin-panel-header">
        <div>
          <p className="auth-kicker">Booking queue</p>
          <h2>Bookings</h2>
        </div>
        <div className="admin-filters">
          <label>
            <span>Date</span>
            <input type="date" value={filterDate} onChange={(event) => setFilterDate(event.target.value)} />
          </label>
          <label>
            <span>Status</span>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} disabled={!hasStatusColumn}>
              <option value="all">All</option>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {!hasStatusColumn ? (
        <div className="table-warning">
          Status is not enabled yet. Add the status column from the SQL migration before using manual updates.
        </div>
      ) : null}

      {error ? <div className="table-warning error">{error}</div> : null}

      {loading ? (
        <div className="table-empty">Loading bookings...</div>
      ) : filteredBookings.length === 0 ? (
        <div className="table-empty">No bookings found for the selected filters.</div>
      ) : (
        <div className="bookings-table-wrap">
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Guests</th>
                <th>Date</th>
                <th>Notes</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>
                    <strong>{booking.c_name || "Guest"}</strong>
                  </td>
                  <td>{booking.c_phone || "—"}</td>
                  <td>{booking.no_of_guest ?? 0}</td>
                  <td>{formatDisplayDate(booking.date)}</td>
                  <td className="notes-cell">{booking.notes || "—"}</td>
                  <td>
                    <select
                      className="status-select"
                      value={booking.status}
                      onChange={(event) => updateBookingStatus(booking.id, event.target.value)}
                      disabled={!hasStatusColumn}
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="pagination-row">
        <button
          type="button"
          className="secondary-button small-button"
          onClick={() => setPage((current) => Math.max(1, current - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          type="button"
          className="secondary-button small-button"
          onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
