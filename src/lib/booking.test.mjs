import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeBookingForm } from './booking.mjs';

test('normalizeBookingForm keeps required values and trims optional notes', () => {
  const result = normalizeBookingForm({
    date: '2026-10-14',
    time: '19:30',
    guests: '4',
    occasion: 'Anniversary',
    notes: '  Please seat near the window.  ',
  });

  assert.equal(result.date, '2026-10-14');
  assert.equal(result.time, '19:30');
  assert.equal(result.guests, 4);
  assert.equal(result.occasion, 'Anniversary');
  assert.equal(result.notes, 'Please seat near the window.');
});

test('normalizeBookingForm rejects invalid guest counts', () => {
  assert.throws(
    () => normalizeBookingForm({ date: '2026-10-14', time: '19:30', guests: '0' }),
    /guests/i,
  );
});
