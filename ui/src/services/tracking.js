/**
 * Simulated consignment-tracking service.
 *
 * There is no backend yet, so this module fakes a network lookup and returns a
 * multi-step timeline for recognised IDs. Swap `lookupConsignment` for a real
 * `fetch()` later - the component contract (Promise) stays the same.
 */

/** Canonical, ordered pipeline every consignment moves through. */
export const TRACKING_PIPELINE = [
  {
    key: 'order-received',
    label: 'Order Received',
    description: 'Consignment booked and bilty generated.',
  },
  {
    key: 'in-transit',
    label: 'In Transit',
    description: 'On the move across the regional network.',
  },
  {
    key: 'near-hub',
    label: 'Near Indore Hub',
    description: 'Arriving at the destination hub for final dispatch.',
  },
  {
    key: 'delivered',
    label: 'Delivered',
    description: 'Handed over to the consignee. Thank you!',
  },
];

export class TrackingError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TrackingError';
  }
}

/** Accepts IDs like "SNT-12345" (2-4 letters, hyphen, 4-6 digits). */
const VALID_ID = /^[A-Z]{2,4}-\d{4,6}$/;

/** Deterministic mock dataset so demos are stable (no random flicker). */
const MOCK_DB = {
  'SNT-12345': {
    currentStageIndex: 1,
    estimatedDelivery: 'Tomorrow, by 6:00 PM',
    origin: 'Indore',
    destination: 'Shajapur',
  },
  'DN-67890': {
    currentStageIndex: 3,
    estimatedDelivery: 'Delivered',
    origin: 'Indore',
    destination: 'Susner',
  },
};

export function normalizeId(raw) {
  return raw.trim().toUpperCase();
}

/**
 * Resolves with a tracking result, or rejects with a friendly TrackingError.
 * Simulated latency keeps the loading state visible and realistic.
 */
export function lookupConsignment(rawId) {
  const trackingId = normalizeId(rawId);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!trackingId) {
        reject(new TrackingError('Please enter a Bilty / Consignment number.'));
        return;
      }
      if (!VALID_ID.test(trackingId)) {
        reject(
          new TrackingError(
            'Invalid format. Try a number like "SNT-12345" or call us for help.',
          ),
        );
        return;
      }
      const record = MOCK_DB[trackingId];
      if (!record) {
        reject(
          new TrackingError(
            `No consignment found for "${trackingId}". Please check the number or contact support.`,
          ),
        );
        return;
      }
      resolve({ trackingId, ...record });
    }, 700);
  });
}
