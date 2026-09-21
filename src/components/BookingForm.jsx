"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

const initialState = {
  c_name: "",
  c_phone: "",
  no_of_guest: "2",
  date: "",
  notes: "",
};

export default function BookingForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (status.type !== "idle") {
      setStatus({ type: "idle", message: "" });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: "idle", message: "" });

    try {
      const guestCount = Number(form.no_of_guest);

      if (!form.c_name?.trim()) {
        throw new Error("Customer name is required.");
      }

      if (!form.c_phone?.trim()) {
        throw new Error("Phone number is required.");
      }

      if (!form.date) {
        throw new Error("Booking date is required.");
      }

      if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 20) {
        throw new Error("Guests must be a number between 1 and 20.");
      }

      const { error } = await supabase.from("Bookings").insert([
        {
          c_name: form.c_name.trim(),
          c_phone: form.c_phone.trim(),
          no_of_guest: guestCount,
          date: form.date,
          notes: form.notes?.trim() || "",
          status: "Pending",
        },
      ]);

      if (error) {
        throw new Error(error.message);
      }

      setStatus({
        type: "success",
        message: `Reservation booked for ${guestCount} guest(s) on ${form.date}.`,
      });
      setForm(initialState);
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Booking could not be saved.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="booking-grid">
        <label>
          <span>Customer name</span>
          <input
            type="text"
            name="c_name"
            value={form.c_name}
            onChange={handleChange}
            placeholder="John Smith"
            required
          />
        </label>

        <label>
          <span>Phone number</span>
          <input
            type="tel"
            name="c_phone"
            value={form.c_phone}
            onChange={handleChange}
            placeholder="+1 (555) 123-4567"
            required
          />
        </label>

        <label>
          <span>Date</span>
          <input type="date" name="date" value={form.date} onChange={handleChange} required />
        </label>

        <label>
          <span>Guests</span>
          <input
            type="number"
            name="no_of_guest"
            min="1"
            max="20"
            value={form.no_of_guest}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <label className="full-width">
        <span>Notes</span>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={4}
          placeholder="Any accessibility requests, occasion, or dining preferences?"
        />
      </label>

      <div className="booking-actions">
        <button className="primary-button" type="submit" disabled={loading}>
          {loading ? "Saving booking..." : "Request reservation"}
        </button>
      </div>

      {status.message ? (
        <p className={`booking-status ${status.type}`} role="status" aria-live="polite">
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
