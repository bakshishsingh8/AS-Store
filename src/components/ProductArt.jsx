import { useId } from 'react'

/**
 * ProductArt
 * ----------
 * Renders a product pack as inline SVG so the storefront ships with
 * consistent, on-brand product imagery and makes no external image requests.
 *
 * A product describes its pack with `{ shape, tone, short, sub }`:
 *
 *   shape  tub | jar | sack | bottle | bar | shaker | steelBottle
 *          gloves | dumbbell | kettlebell
 *   tone   ink | graphite | emerald | blue | red | amber | purple | teal
 *          steel | cream
 *   short  the text printed on the label, e.g. "GOLD ISO"
 *   variant studio | label | flat | duo   (used by the detail-page gallery)
 *
 * To use real photography instead, set `image.src` on a product — see
 * <ProductImage />, which prefers a photo whenever one is available.
 */

const TONES = {
  ink: { body1: '#242A33', body2: '#0E1218', hi: '#39414D', cap: '#0A0D11', ink: '#FFFFFF', accent: '#3BC885' },
  graphite: { body1: '#3B4350', body2: '#1C2129', hi: '#525C6B', cap: '#14181E', ink: '#FFFFFF', accent: '#72DFA6' },
  emerald: { body1: '#0C8A5B', body2: '#044A31', hi: '#25B37C', cap: '#033B27', ink: '#FFFFFF', accent: '#A9EEC7' },
  blue: { body1: '#2264AE', body2: '#123A6A', hi: '#3F86D6', cap: '#0E2C52', ink: '#FFFFFF', accent: '#9FD0FF' },
  red: { body1: '#C4402F', body2: '#7A1E14', hi: '#E05A45', cap: '#5E150E', ink: '#FFFFFF', accent: '#FFC9A3' },
  amber: { body1: '#DE9318', body2: '#8C550A', hi: '#F0AB3C', cap: '#6D4007', ink: '#1B1204', accent: '#FFE7B0' },
  purple: { body1: '#6C41A6', body2: '#3B2162', hi: '#8759C4', cap: '#2D184D', ink: '#FFFFFF', accent: '#D9C4FF' },
  teal: { body1: '#0F7F8A', body2: '#06474E', hi: '#22A0AC', cap: '#053A40', ink: '#FFFFFF', accent: '#A8F0F5' },
  steel: { body1: '#C9D0D8', body2: '#8B95A2', hi: '#F3F6F8', cap: '#2B323B', ink: '#0A0D11', accent: '#058A57' },
  cream: { body1: '#F2E8D6', body2: '#CFBFA3', hi: '#FFFBF2', cap: '#8A7A5E', ink: '#1B1710', accent: '#058A57' },
}

const VARIANT_TRANSFORMS = {
  studio: 'translate(0 0)',
  label: 'translate(-93.5 -114.7) scale(1.85)',
  flat: 'translate(22 26) scale(0.8)',
}

/** Keeps long labels from overflowing the printed panel. */
function labelFontSize(text, base = 20) {
  const length = String(text || '').length
  if (length <= 5) return base
  if (length <= 7) return base * 0.85
  if (length <= 9) return base * 0.72
  if (length <= 12) return base * 0.6
  return base * 0.52
}

/* ------------------------------------------------------------------ */
/* Shared building blocks                                              */
/* ------------------------------------------------------------------ */

function Backdrop({ uid, dark }) {
  return (
    <>
      <rect width="220" height="220" fill={`url(#${uid}-bg)`} />
      <circle cx="54" cy="40" r="96" fill={`url(#${uid}-glow)`} />
      <rect width="220" height="220" fill={`url(#${uid}-vignette)`} opacity={dark ? 0.3 : 0.5} />
    </>
  )
}

function FloorShadow({ uid, wide = false }) {
  return (
    <ellipse
      cx="110"
      cy={wide ? 194 : 192}
      rx={wide ? 78 : 54}
      ry={wide ? 9 : 10}
      fill={`url(#${uid}-shadow)`}
    />
  )
}

/** Curved left-edge highlight that sells the "studio photo" look. */
function Sheen({ uid, d, opacity = 0.4 }) {
  return <path d={d} fill={`url(#${uid}-sheen)`} opacity={opacity} />
}

/** The printed label panel shared by every bottle-style pack. */
function LabelPanel({ tone, short, sub, x, y, width, height }) {
  const cx = x + width / 2
  const panelFill = tone.ink === '#FFFFFF' ? '#0A0D11' : '#FFFFFF'
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx="9" fill={panelFill} />
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="9"
        fill="none"
        stroke={tone.accent}
        strokeOpacity="0.35"
      />
      <text x={cx} y={y + 17} textAnchor="middle" fontSize="7.5" fontWeight="700" letterSpacing="1.5" fill={tone.accent}>
        AS STORE
      </text>
      <line x1={x + 9} y1={y + 23} x2={x + width - 9} y2={y + 23} stroke={tone.accent} strokeOpacity="0.35" />
      <text x={cx} y={y + 45} textAnchor="middle" fontSize={labelFontSize(short)} fontWeight="800" letterSpacing="0.4" fill={tone.ink}>
        {short}
      </text>
      <text
        x={cx}
        y={y + 57}
        textAnchor="middle"
        fontSize="6.2"
        letterSpacing="0.9"
        fill={tone.ink}
        fillOpacity="0.6"
      >
        {sub}
      </text>
      <rect x={cx - 28} y={y + height - 13} width="56" height="7" rx="3.5" fill={tone.accent} />
    </g>
  )
}

/* ------------------------------------------------------------------ */
/* Pack shapes                                                         */
/* ------------------------------------------------------------------ */

function TubPack({ uid, tone, short, sub }) {
  return (
    <g>
      <rect x="58" y="42" width="104" height="20" rx="7" fill={tone.cap} />
      <rect x="54" y="59" width="112" height="12" rx="5" fill={tone.body1} />
      <rect x="58" y="44" width="104" height="5" rx="2.5" fill="#FFFFFF" opacity="0.14" />
      <path d="M58 71 H162 L166 170 Q167 186 152 186 H68 Q53 186 54 170 Z" fill={`url(#${uid}-body)`} />
      <path d="M64 78 L61 176" stroke="#FFFFFF" strokeOpacity="0.08" strokeWidth="1.5" />
      <path d="M156 78 L159 176" stroke="#000000" strokeOpacity="0.16" strokeWidth="1.5" />
      <Sheen uid={uid} d="M68 77 L80 77 L73 182 L62 182 Z" opacity="0.34" />
      <LabelPanel tone={tone} short={short} sub={sub} x="68" y="94" width="84" height="74" />
    </g>
  )
}

function JarPack({ uid, tone, short, sub }) {
  return (
    <g>
      <rect x="50" y="60" width="120" height="22" rx="8" fill={tone.cap} />
      <rect x="54" y="78" width="112" height="10" rx="4" fill={tone.body1} />
      <rect x="52" y="62" width="116" height="5" rx="2.5" fill="#FFFFFF" opacity="0.14" />
      <path d="M50 86 H170 L166 170 Q165 186 148 186 H72 Q55 186 54 170 Z" fill={`url(#${uid}-body)`} />
      <path d="M56 92 L53 176" stroke="#FFFFFF" strokeOpacity="0.08" strokeWidth="1.5" />
      <path d="M164 92 L167 176" stroke="#000000" strokeOpacity="0.16" strokeWidth="1.5" />
      <Sheen uid={uid} d="M60 92 L72 92 L66 182 L56 182 Z" opacity="0.3" />
      <LabelPanel tone={tone} short={short} sub={sub} x="64" y="104" width="92" height="66" />
    </g>
  )
}

function SackPack({ uid, tone, short, sub }) {
  return (
    <g>
      <path d="M76 62 Q110 26 144 62" fill="none" stroke={tone.cap} strokeWidth="9" strokeLinecap="round" />
      <rect x="50" y="56" width="120" height="20" rx="6" fill={tone.cap} />
      <rect x="54" y="58" width="112" height="4" rx="2" fill="#FFFFFF" opacity="0.16" />
      <path
        d="M56 74 Q56 66 66 64 H154 Q164 66 164 74 L168 168 Q169 188 148 188 H72 Q51 188 52 168 Z"
        fill={`url(#${uid}-body)`}
      />
      <path d="M76 70 L74 186" stroke="#000000" strokeOpacity="0.12" strokeWidth="1.5" />
      <path d="M144 70 L146 186" stroke="#000000" strokeOpacity="0.12" strokeWidth="1.5" />
      <path d="M62 84 L59 178" stroke="#FFFFFF" strokeOpacity="0.07" strokeWidth="2" />
      <Sheen uid={uid} d="M64 80 L76 80 L70 184 L60 184 Z" opacity="0.2" />
      <LabelPanel tone={tone} short={short} sub={sub} x="70" y="92" width="80" height="66" />
    </g>
  )
}

function BottlePack({ uid, tone, short, sub }) {
  return (
    <g>
      <rect x="74" y="38" width="72" height="26" rx="7" fill={tone.cap} />
      <rect x="78" y="42" width="64" height="4" rx="2" fill="#FFFFFF" opacity="0.18" />
      {[86, 96, 106, 116, 126, 136].map((x) => (
        <line key={x} x1={x} y1="40" x2={x} y2="62" stroke="#000000" strokeOpacity="0.18" strokeWidth="1.6" />
      ))}
      <rect x="86" y="62" width="48" height="10" rx="3" fill={tone.body2} />
      <path d="M74 72 H146 L146 170 Q146 188 128 188 H92 Q74 188 74 170 Z" fill={`url(#${uid}-body)`} />
      <path d="M80 80 L80 176" stroke="#FFFFFF" strokeOpacity="0.09" strokeWidth="1.5" />
      <path d="M140 80 L140 176" stroke="#000000" strokeOpacity="0.18" strokeWidth="1.5" />
      <Sheen uid={uid} d="M82 78 L92 78 L92 182 L82 182 Z" opacity="0.28" />
      <LabelPanel tone={tone} short={short} sub={sub} x="78" y="100" width="64" height="66" />
    </g>
  )
}

function BarPack({ uid, tone, short, sub }) {
  return (
    <g>
      <g transform="rotate(-7 110 128) translate(0 16)">
        <rect x="40" y="102" width="140" height="46" rx="12" fill={tone.body2} opacity="0.9" />
      </g>
      <g transform="rotate(-7 110 118)">
        <rect x="34" y="94" width="152" height="50" rx="13" fill={`url(#${uid}-body)`} />
        <rect x="34" y="94" width="152" height="50" rx="13" fill="none" stroke="#000000" strokeOpacity="0.12" />
        <rect x="34" y="94" width="20" height="50" rx="12" fill={tone.body2} opacity="0.85" />
        <rect x="166" y="94" width="20" height="50" rx="12" fill={tone.body2} opacity="0.85" />
        <rect x="54" y="96" width="2" height="46" fill="#000000" opacity="0.15" />
        <rect x="164" y="96" width="2" height="46" fill="#000000" opacity="0.15" />
        <rect x="60" y="98" width="100" height="42" rx="8" fill={tone.cap} />
        <text x="110" y="113" textAnchor="middle" fontSize="7" fontWeight="700" letterSpacing="1.4" fill={tone.accent}>
          AS STORE
        </text>
        <text
          x="110"
          y="128"
          textAnchor="middle"
          fontSize={labelFontSize(short, 11)}
          fontWeight="800"
          fill="#FFFFFF"
        >
          {short}
        </text>
        <text x="110" y="136" textAnchor="middle" fontSize="5.2" letterSpacing="0.7" fill="#FFFFFF" fillOpacity="0.65">
          {sub}
        </text>
        <rect x="66" y="99" width="88" height="8" rx="4" fill="#FFFFFF" opacity="0.12" />
      </g>
    </g>
  )
}

function ShakerPack({ uid, tone, short, sub }) {
  return (
    <g>
      <rect x="70" y="66" width="80" height="24" rx="8" fill={tone.cap} />
      <rect x="94" y="46" width="32" height="22" rx="7" fill={tone.cap} />
      <rect x="100" y="50" width="20" height="5" rx="2.5" fill="#FFFFFF" opacity="0.18" />
      <rect x="74" y="69" width="72" height="5" rx="2.5" fill="#FFFFFF" opacity="0.13" />
      <path d="M76 90 H144 L135 178 Q134 190 122 190 H98 Q86 190 85 178 Z" fill={`url(#${uid}-body)`} />
      {[112, 128, 144, 160].map((y, index) => (
        <line
          key={y}
          x1={index % 2 === 0 ? 96 : 102}
          y1={y}
          x2={index % 2 === 0 ? 110 : 116}
          y2={y}
          stroke={tone.ink}
          strokeOpacity="0.32"
          strokeWidth="1.6"
        />
      ))}
      <Sheen uid={uid} d="M86 96 L96 96 L92 184 L84 184 Z" opacity="0.28" />
      <rect x="82" y="166" width="56" height="14" rx="7" fill={tone.cap} opacity="0.92" />
      <text x="110" y="176" textAnchor="middle" fontSize="6.4" fontWeight="700" letterSpacing="1.2" fill={tone.accent}>
        AS STORE
      </text>
      <rect x="80" y="106" width="60" height="52" rx="8" fill={tone.cap} />
      <text x="110" y="121" textAnchor="middle" fontSize="6.4" fontWeight="700" letterSpacing="1.2" fill={tone.accent}>
        AS STORE
      </text>
      <text x="110" y="136" textAnchor="middle" fontSize={labelFontSize(short, 14)} fontWeight="800" fill="#FFFFFF">
        {short}
      </text>
      <text x="110" y="148" textAnchor="middle" fontSize="5.2" letterSpacing="0.7" fill="#FFFFFF" fillOpacity="0.6">
        {sub}
      </text>
    </g>
  )
}

function SteelBottlePack({ uid, tone, short, sub }) {
  return (
    <g>
      <rect x="90" y="34" width="40" height="16" rx="6" fill={tone.cap} />
      <rect x="94" y="48" width="32" height="22" rx="4" fill={tone.body1} />
      <rect x="80" y="68" width="60" height="8" rx="4" fill={tone.body2} />
      <path d="M80 74 H140 L140 170 Q140 188 124 188 H96 Q80 188 80 170 Z" fill={`url(#${uid}-metal)`} />
      {[92, 108, 124, 140, 156].map((y) => (
        <line key={y} x1="80" y1={y} x2="140" y2={y} stroke="#000000" strokeOpacity="0.07" strokeWidth="1" />
      ))}
      <Sheen uid={uid} d="M86 80 L94 80 L94 184 L86 184 Z" opacity="0.45" />
      <rect x="88" y="104" width="44" height="42" rx="7" fill={tone.cap} />
      <text x="110" y="117" textAnchor="middle" fontSize="6" fontWeight="700" letterSpacing="1.1" fill={tone.accent}>
        AS STORE
      </text>
      <text x="110" y="130" textAnchor="middle" fontSize={labelFontSize(short, 11)} fontWeight="800" fill="#FFFFFF">
        {short}
      </text>
      <text x="110" y="139" textAnchor="middle" fontSize="4.8" letterSpacing="0.6" fill="#FFFFFF" fillOpacity="0.6">
        {sub}
      </text>
    </g>
  )
}

function GlovesPack({ uid, tone }) {
  return (
    <g>
      <g transform="translate(46 30) rotate(-8 60 90)" opacity="0.82">
        <rect x="30" y="96" width="52" height="58" rx="18" fill={tone.body2} />
        {[34, 46, 58, 70].map((x) => (
          <rect key={x} x={x} y="78" width="10" height="26" rx="5" fill={tone.body2} />
        ))}
        <rect x="72" y="112" width="26" height="12" rx="6" fill={tone.body2} transform="rotate(26 85 118)" />
      </g>
      <g transform="translate(10 6)">
        <rect x="36" y="98" width="56" height="62" rx="19" fill={`url(#${uid}-body)`} />
        {[40, 53, 66, 79].map((x, index) => (
          <rect key={x} x={x} y={78 - index} width="11" height="28" rx="5.5" fill={`url(#${uid}-body)`} />
        ))}
        <rect x="84" y="112" width="28" height="13" rx="6.5" fill={tone.body1} transform="rotate(26 98 118)" />
        <rect x="42" y="118" width="44" height="24" rx="9" fill={tone.cap} opacity="0.88" />
        <path d="M47 125 H81 M47 133 H81" stroke={tone.accent} strokeOpacity="0.65" strokeWidth="2" />
        <rect x="30" y="152" width="68" height="20" rx="8" fill={tone.cap} />
        <rect x="34" y="156" width="60" height="5" rx="2.5" fill={tone.accent} opacity="0.85" />
        <Sheen uid={uid} d="M40 106 L48 106 L48 152 L40 152 Z" opacity="0.2" />
      </g>
    </g>
  )
}

function DumbbellPack({ uid, tone }) {
  return (
    <g>
      <rect x="52" y="88" width="16" height="48" rx="6" fill={tone.cap} />
      <rect x="152" y="88" width="16" height="48" rx="6" fill={tone.cap} />
      <rect x="34" y="78" width="18" height="68" rx="7" fill={tone.body2} />
      <rect x="168" y="78" width="18" height="68" rx="7" fill={tone.body2} />
      <rect x="70" y="104" width="80" height="16" rx="8" fill={`url(#${uid}-metal)`} />
      {[86, 100, 114, 128].map((x) => (
        <line key={x} x1={x} y1="105" x2={x} y2="119" stroke="#000000" strokeOpacity="0.14" strokeWidth="1.4" />
      ))}
      <rect x="40" y="82" width="6" height="60" rx="3" fill="#FFFFFF" opacity="0.16" />
      <rect x="174" y="82" width="6" height="60" rx="3" fill="#FFFFFF" opacity="0.16" />
      <rect x="74" y="107" width="72" height="4" rx="2" fill="#FFFFFF" opacity="0.38" />
      <rect x="90" y="140" width="40" height="15" rx="7.5" fill={tone.accent} opacity="0.92" />
      <text x="110" y="151" textAnchor="middle" fontSize="8" fontWeight="800" letterSpacing="1" fill="#0A0D11">
        AS
      </text>
    </g>
  )
}

function KettlebellPack({ uid, tone }) {
  return (
    <g>
      <path
        d="M84 104 Q84 62 110 62 Q136 62 136 104"
        fill="none"
        stroke={tone.cap}
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d="M84 104 Q84 62 110 62 Q136 62 136 104"
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity="0.12"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M110 100 A46 46 0 0 1 156 172 H64 A46 46 0 0 1 110 100 Z" fill={`url(#${uid}-body)`} />
      <ellipse cx="92" cy="126" rx="20" ry="13" fill="#FFFFFF" opacity="0.09" transform="rotate(-24 92 126)" />
      <rect x="62" y="170" width="96" height="8" rx="4" fill={tone.cap} />
      <rect x="82" y="140" width="56" height="16" rx="8" fill={tone.accent} opacity="0.92" />
      <text x="110" y="152" textAnchor="middle" fontSize="8.4" fontWeight="800" letterSpacing="1.2" fill="#0A0D11">
        AS
      </text>
    </g>
  )
}

const SHAPES = {
  tub: TubPack,
  jar: JarPack,
  sack: SackPack,
  bottle: BottlePack,
  bar: BarPack,
  shaker: ShakerPack,
  steelBottle: SteelBottlePack,
  gloves: GlovesPack,
  dumbbell: DumbbellPack,
  kettlebell: KettlebellPack,
}

export const productArtShapes = Object.keys(SHAPES)

/**
 * @param {object}  props
 * @param {string}  props.shape    pack silhouette (see SHAPES)
 * @param {string}  props.tone     palette key (see TONES)
 * @param {string}  props.short    label headline, e.g. "GOLD ISO"
 * @param {string}  props.sub      small line under the headline
 * @param {string}  props.variant  studio | label | flat | duo
 * @param {boolean} props.dark     dark studio backdrop (for dark sections)
 * @param {string}  props.title    accessible name; omit to render decorative
 */
export function ProductArt({
  shape = 'tub',
  tone = 'ink',
  short = 'AS STORE',
  sub = 'PREMIUM SERIES',
  variant = 'studio',
  dark = false,
  className = '',
  title,
}) {
  const rawId = useId()
  const uid = `as${rawId.replace(/[^a-zA-Z0-9]/g, '')}`
  const palette = TONES[tone] ?? TONES.ink
  const Pack = SHAPES[shape] ?? TubPack
  const headline = String(short || 'AS STORE').toUpperCase()
  const subline = String(sub || 'PREMIUM SERIES').toUpperCase()
  const packProps = { uid, tone: palette, short: headline, sub: subline }
  const transform = VARIANT_TRANSFORMS[variant] ?? VARIANT_TRANSFORMS.studio

  return (
    <svg
      viewBox="0 0 220 220"
      className={className}
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="0.55" y2="1">
          <stop offset="0%" stopColor={dark ? '#252C36' : '#FFFFFF'} />
          <stop offset="100%" stopColor={dark ? '#0A0D11' : '#E7ECF0'} />
        </linearGradient>
        <radialGradient id={`${uid}-glow`}>
          <stop offset="0%" stopColor={dark ? palette.accent : '#FFFFFF'} stopOpacity={dark ? 0.2 : 0.95} />
          <stop offset="100%" stopColor={dark ? palette.accent : '#FFFFFF'} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${uid}-vignette`}>
          <stop offset="55%" stopColor="#0A0D11" stopOpacity="0" />
          <stop offset="100%" stopColor="#0A0D11" stopOpacity="0.1" />
        </radialGradient>
        <radialGradient id={`${uid}-shadow`}>
          <stop offset="0%" stopColor="#0A0D11" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#0A0D11" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}-sheen`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id={`${uid}-body`} x1="0" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor={palette.hi} />
          <stop offset="45%" stopColor={palette.body1} />
          <stop offset="100%" stopColor={palette.body2} />
        </linearGradient>
        <linearGradient id={`${uid}-metal`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={palette.body2} />
          <stop offset="28%" stopColor={palette.body1} />
          <stop offset="46%" stopColor={palette.hi} />
          <stop offset="72%" stopColor={palette.body1} />
          <stop offset="100%" stopColor={palette.body2} />
        </linearGradient>
      </defs>

      <Backdrop uid={uid} dark={dark} />

      {variant === 'duo' ? (
        <>
          <g transform="translate(-32 24) scale(0.6)">
            <Pack {...packProps} />
          </g>
          <g transform="translate(54 -8) scale(0.68)">
            <Pack {...packProps} />
          </g>
          <FloorShadow uid={uid} wide />
        </>
      ) : (
        <>
          <FloorShadow uid={uid} wide={variant === 'flat'} />
          <g transform={transform}>
            <Pack {...packProps} />
          </g>
        </>
      )}
    </svg>
  )
}

export default ProductArt




