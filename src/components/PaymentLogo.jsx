/**
 * Payment network "flags" for the footer payment row.
 *
 * Every mark is drawn in its official brand colours on the caller's light
 * tile (the footer background is near-black, so the marks need a light
 * surface to sit on). Keys mirror `paymentMethods` in `src/data/site.js`.
 */

/** Apple glyph — used by the Apple Pay lockup. */
const APPLE_PATH =
  'M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z'

const PAYMENT_MARKS = {
  Visa: (
    <span className="font-display text-[0.8rem] font-extrabold leading-none tracking-[0.04em] text-[#1A1F71] italic">
      VISA
    </span>
  ),
  Mastercard: (
    <svg viewBox="0 0 64 40" className="h-4 w-auto" focusable="false">
      <circle cx="24" cy="20" r="17" fill="#EB001B" />
      <circle cx="40" cy="20" r="17" fill="#F79E1B" />
      {/* Lens where the two circles overlap */}
      <path d="M32 5A17 17 0 0 1 32 35 17 17 0 0 1 32 5Z" fill="#FF5F00" />
    </svg>
  ),
  Amex: (
    <span className="rounded-[3px] bg-[#006FCF] px-2 py-[4px] text-[0.6rem] font-extrabold leading-none tracking-[0.06em] text-white">
      AMEX
    </span>
  ),
  PayPal: (
    <span className="font-display text-[0.8rem] font-extrabold leading-none tracking-tight italic">
      <span className="text-[#003087]">Pay</span>
      <span className="text-[#009CDE]">Pal</span>
    </span>
  ),
  'Apple Pay': (
    <span className="flex items-center gap-[2px] leading-none">
      <svg
        viewBox="0 0 384 512"
        className="h-[0.9rem] w-auto"
        fill="#0A0D11"
        focusable="false"
      >
        <path d={APPLE_PATH} />
      </svg>
      <span className="text-[0.78rem] font-semibold tracking-tight text-[#0A0D11]">
        Pay
      </span>
    </span>
  ),
}

/**
 * Renders the brand mark for a payment method.
 *
 * The mark is decorative — callers are expected to expose the method name to
 * assistive tech themselves (e.g. with an `sr-only` span).
 */
export function PaymentLogo({ name, className = '' }) {
  const mark = PAYMENT_MARKS[name]
  if (!mark) return null

  return (
    <span className={`flex items-center ${className}`.trim()} aria-hidden="true">
      {mark}
    </span>
  )
}

export default PaymentLogo
