export function normalizeBookingForm(formValues) {
  const date = String(formValues?.date ?? '').trim();
  const time = String(formValues?.time ?? '').trim();
  const occasion = String(formValues?.occasion ?? '').trim();
  const notes = String(formValues?.notes ?? '').trim();
  const guestsRaw = String(formValues?.guests ?? '').trim();
  const guests = Number(guestsRaw);

  if (!date) {
    throw new Error('Booking date is required.');
  }

  if (!time) {
    throw new Error('Booking time is required.');
  }

  if (!Number.isInteger(guests) || guests < 1 || guests > 20) {
    throw new Error('Guests must be a number between 1 and 20.');
  }

  return {
    date,
    time,
    guests,
    occasion: occasion || 'General dining',
    notes: notes || '',
  };
}
