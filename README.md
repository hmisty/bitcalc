# BitCalc — Offline Bitcoin Address Calculator

**Offline Bitcoin Address Calculator · Cold Wallet Bitcoin Address Generator**

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

A fully offline single-page HTML tool for securely generating Bitcoin addresses in your browser. No internet, no server required.

[中文](README.zh.md)

---

## Rationale

### Why another address generator?

Existing cold wallet tools (e.g. bitaddress.org) only support Legacy P2PKH addresses (starting with `1`) and lack Native SegWit (bech32, starting with `bc1`). Furthermore, they only export raw private keys (WIF), not BIP-39 mnemonics.

### Quantum Preparedness (BIP-361)

[BIP-361](https://www.bip361.org/) proposes a phased quantum migration plan. Phase C plans to allow users to recover funds from quantum-vulnerable UTXOs by submitting a **zero-knowledge proof of possession of a BIP-39 seed phrase**. This means **mnemonics are the key credential for proving ownership in future quantum migration** — raw private keys alone are insufficient.

Without a mnemonic, you cannot participate in BIP-361's Phase C recovery mechanism. Once a cryptographically-relevant quantum computer matures, addresses that have exposed their public keys on-chain could be stolen.

> *Phase C: Users with frozen quantum vulnerable funds and a HD wallet seed phrase can construct a quantum safe proof to recover funds.* — BIP-361

**BitCalc supports both raw addresses (Legacy + SegWit) and BIP-39 mnemonic paths** — meeting today's needs while preparing for future quantum migration.

---

## Features

| Feature | Description |
|---------|-------------|
| **Brain Wallet** | Password → SHA256ⁿ → entropy, optional iterations; live password-entropy meter with low-entropy warnings (never blocks generation) |
| **Random Wallet** | OS-level CSPRNG (`crypto.getRandomValues`) + passive entropy mixing (always 256-bit keys) |
| **Entropy Indicator** | Live counter next to the generate button showing passively mixed entropy bytes (pulsing dot) |
| **Crypto RNG Indicator** | Banner shows whether `window.crypto.getRandomValues` is available; warns when it is not |
| **Classical Path** | Compressed P2PKH + Native SegWit + uncompressed P2PKH (collapsed, bitaddress.org compatible) |
| **Mnemonic Path** | BIP39 12/24 words → PBKDF2 → BIP32 HD → m/84'/0'/0'/0/0 |
| **Mnemonic Recovery** | Input mnemonic → recover entropy, seed, HD address list |
| **Verify** | Validate mnemonic checksum, WIF private key, address format |
| **Self Test** | 25 built-in test vectors against known values |
| **Password Strength** | Creation mode enforces ≥30 chars + upper/lower/digit/special |
| **Danger Guard** | Advanced options disabled by default, enabled via checkbox |
| **Auto-fill Recovery** | Generated mnemonic auto-filled to recovery tab |
| **Loading Animation** | Spinner overlay during computation |
| **QR Code** | QR codes for addresses and private keys |
| **Sensitive Mask** | Mnemonics, WIF private keys and entropy/seed hex are blur-masked until clicked (shoulder-surfing protection) |
| **Mobile Friendly** | Viewport-driven single-column layout with enlarged touch targets |
| **Dark Mode** | Follows the system light/dark theme automatically (`prefers-color-scheme`, zero JS) |
| **Bilingual** | Chinese / English UI toggle |
| **Fully Offline** | Single HTML file, open in any browser |

## Changelog

### 2026-08-03 — Dark Mode (Follows System Theme)

- **System light/dark mode**: Every color is now a CSS custom property; a `@media (prefers-color-scheme: dark)` block switches the entire page automatically when the OS/browser is in dark mode — no toggle, no JavaScript, no reload
- **Dark palette**: Dark navy surfaces (`#12141d` page / `#1b1f2b` cards) harmonizing with the always-dark header; the Bitcoin-orange accent is preserved; status banners, crypto indicators, form controls and the loading overlay all get dark variants
- **Theme-aware QR codes**: QR canvases read `--qr-fg`/`--qr-bg` CSS variables at draw time — light modules on a dark background in dark mode
- **Inline style cleanup**: ~20 inline color styles in the template converted to variables; `color-scheme` is set per theme so native scrollbars/form controls follow; `theme-color` metas added for mobile browser chrome

### 2026-08-02 — UI Polish & Mobile Support

- **BC badge**: Logo restored to "BitCalc" with an orange "BC" abbreviation badge; subtitle no longer repeats the brand name, and drops below the logo on narrow screens (inline on desktop)
- **Sensitive output masks**: Mnemonics, WIF private keys, entropy and seed hex (12 fields) are blur-masked by default and revealed on click — shoulder-surfing protection (values stay in the DOM; this is not encryption)
- **Mobile support**: Added the viewport meta (root cause of tiny rendering — pages were laid out at 980px and scaled down); narrow screens switch to a single-column layout: tabs split the row evenly, form rows stack vertically, QR codes one per row, buttons full width; 16px inputs also prevent iOS auto-zoom
- **Footer**: Usage tip added (download and use offline in a private/incognito window); version line "当前版本 2026.08.02" (release-date versioning); donation moved into its own section under a divider with a coffee icon

### 2026-08-01 — Random Number Security Hardening

- **Crypto RNG availability banner**: Random wallet tab shows a green ✔ / red ⚠ banner indicating whether `window.crypto.getRandomValues` is available. When unavailable (plain-HTTP or legacy browser) it warns that private key generation security is greatly reduced
- **Removed `Math.random()` from security-sensitive paths**: `Crypto.util.randomBytes` now uses the SecureRandom generator (`crypto.getRandomValues` XOR pooled ArcFour PRNG, same as bitaddress.org's core); ISO 10126 padding and AES-CBC IV generation are secure as a result. `seedLimit` is derived from secure `randomBytes` like bitaddress.org's `ninja.seeder.js`
- **Always 256-bit private keys**: Random wallet now always generates 32 bytes (256 bits) for the legacy-path private key (P2PKH/SegWit/WIF). 12-word mnemonics use the first 16 bytes (128-bit entropy, per BIP39); 24-word mnemonics use all 32 bytes
- **Pool reseeding (poolDirty)**: The ArcFour PRNG state is re-keyed from the entropy pool before every output whenever new entropy has been seeded — mouse/keyboard seeding can no longer be silently ignored after an early RNG use (fixes a latent flaw that bitaddress.org leaves as a TODO)
- **No more forced seeding gate**: The mandatory "shake the mouse" progress bar is removed — the generate button works immediately. Key material comes from the OS-level CSPRNG (`crypto.getRandomValues`); mouse/keyboard/`performance.now()` entropy is still mixed passively into the pool as a zero-cost extra layer (XOR-mixed, harmless when the CSPRNG is sound, a fallback layer if it ever isn't)
- **Fail-closed without a secure RNG**: `SecureRandom.nextBytes` now throws when `window.crypto.getRandomValues` is unavailable — generation is refused instead of silently falling back to the weak ArcFour/Math.random path. `randomBytes` only falls back to Math.random for non-key-material usage (e.g. the seedLimit counter)
- **High-resolution timing entropy**: passive `seedRandom`/`seedKeyPress` mix `performance.now()` — one absolute microsecond timestamp plus the inter-event delta since the previous call (real scheduling jitter; the naive two-samples-XOR approach was dead code, both samples being quantized to the same value)
- **Entropy mixing indicator**: pulsing dot + live byte counter next to the generate button, showing how much mouse/keyboard/timing entropy has been passively mixed into the pool (throttled DOM updates, survives language switch)
- **Brain-wallet password entropy meter**: live entropy estimate shown above the password field (charset × length minus pattern penalties: repeated runs, ascending/descending sequences, keyboard-row sequences, weak-passwords blacklist). Shows password length + entropy bits, grades <60 bits weak / 60-127 fair / ≥128 strong; empty password is flagged immediately
- **Low-entropy address warnings**: after generation, a red/orange banner on the output warns when the addresses were derived from a <128-bit password (warning only — generation is never blocked). Passwords shorter than 30 chars (matching the complexity hint) can never rate strong
- **Disclaimer**: Footer disclaimer changed to black text and marked "Preview version"

### 2026-06-24

- **Classical path restructured**: Added compressed P2PKH for bitaddress.org compatibility; split compressed/uncompressed into two groups, uncompressed collapsed by default
- **Compressed P2PKH**: New display of compressed public key P2PKH address
- **Password strength**: Creation mode enforces ≥30 chars + upper/lower/digit/special
- **Danger guard**: Iterations and passphrase inputs disabled by default, require checkbox confirmation
- **Default 12 words**: Mnemonic defaults to 12 words (was 24)
- **Auto-fill recovery**: Generated mnemonic auto-fills the recovery tab and clears old results
- **Test vectors**: Added 14 new test vectors (12-word + 9999 iterations), totaling 25 self-tests
- **Loading animation**: All action buttons show a spinner overlay during computation
- **bech32 bug fix**: Fixed `decodeSegwit` operator precedence issue
- **Password field**: `autocomplete="new-password"` prevents browser save-password prompts
- **CI/CD**: GitHub Actions workflow for automatic build and GitHub Pages deployment

## Usage

### Open & Use

Open `bitcalc.html` directly in a browser — no server needed.

### Build

```bash
git clone https://github.com/<your>/bitcalc.git
cd bitcalc
npm install
npm run build
```

Output: `bitcalc.html` — a portable single-file HTML.

## Security Notes

- **Use offline only**: Disconnect from the internet before generating wallets. Verify your browser cannot reach any network.
- **Use a secure context**: Generate wallets over HTTPS (or a local file). On plain HTTP, `window.crypto.getRandomValues` is unavailable and generation is refused (fail-closed) — the tool shows a red warning banner in that case
- **Keys are ephemeral**: This tool stores nothing. Refreshing or closing the page will permanently lose the generated keys.
- **Paper backup**: Print and seal your wallet. Never store private keys digitally.
- **Verify integrity**: Check the SHA256 hash of `bitcalc.html` before use.

## Technical Details

### Architecture

```
src/
├── biginteger.js          ← from bitaddress.org (BigInteger arithmetic)
├── cryptojs.*.js          ← from bitaddress.org (SHA256, RIPEMD160, HMAC, PBKDF2, AES)
├── ellipticcurve.js       ← from bitaddress.org (secp256k1 elliptic curve)
├── bitcoinjs-lib.*.js     ← from bitaddress.org (Base58, ECKey, address encoding)
├── securerandom.js        ← from bitaddress.org, hardened (poolDirty reseeding: ArcFour state is re-keyed from the entropy pool before every output once new entropy is seeded)
├── qrcode.js              ← from bitaddress.org (QR code generation)
├── cryptojs.sha512.js     ★ New (SHA-512, required by BIP39 PBKDF2)
├── bech32.js              ★ New (Bech32 encoding for Native SegWit addresses)
├── bip39-wordlist-en.js   ★ New (BIP39 English 2048-word list)
├── bip39.js               ★ New (BIP39: entropy→mnemonic, validate, mnemonic→entropy)
├── bip32.js               ★ New (BIP32 HD wallet: master key, child key derivation)
├── bitcalc.js             ★ New (main logic: UI interaction, bilingual labels, self-test)
├── bitcalc.css            ★ New (styles)
└── bitcalc-ui.html        ★ New (HTML template, grunt-combine entry point)
```

### Derivation Path

| Type | Path |
|------|------|
| BIP84 Native SegWit | `m/84'/0'/0'/0/{0..9}` |

### Test Vectors

| Input | Output |
|-------|--------|
| password `test`, iterations=1 | P2PKH: `1HKqKTMpBTZZ8H5zcqYEWYBaaWELrDEXeE` |
| | P2WPKH: `bc1qtmrl9526rusw4dnavrcfal72tz6ram5lqzutru` |
| | 24-word mnemonic: `panel custom call ... bargain` |
| | BIP84 #0: `bc1qquzeycp8sfh6jwdm9pq92m6zp8vgv3p0l5fuyz` |
| | BIP84 #1: `bc1qv5u53h298fh3htgyxe32fwuvt9huz8e4rjjqnh` |
| | BIP84 #2: `bc1qcfk9m6m87068jcqtxhqrsssp478x9grjjcssqs` |
| | 12-word mnemonic: `panel custom call ... clay` |
| | BIP84 #0 (12-word): `bc1qlhycuafdegfkcdx435t2glqkyrrrrqfpdjd2nq` |
| | BIP84 #1 (12-word): `bc1qn6y5jfdf5069w9mxcwjp3qeazqrvr8vltfkv4n` |
| | BIP84 #2 (12-word): `bc1q9urqudztnhffup66l8hs4zzcm3a3e2v63w06fe` |
| password `test`, iterations=9999 | P2PKH: `1Mig3mSpDzbkfZ91UJsTjDnF7QJtxWtmoN` |
| | P2WPKH: `bc1qvktvghw9veesuucxaqmsh2u20na7gedhh9f86s` |
| | 24-word mnemonic: `alley few pudding ... disease` |
| | BIP84 #0 (24-word): `bc1qh67chfkpnmtp5qvs9zh9xm5meff7h4s5xcg4gn` |
| | 12-word mnemonic: `alley few pudding ... nasty` |
| | BIP84 #0 (12-word): `bc1qudnacy6s0dp5zxy4qfe38dn58kdnk8pcfw5pyx` |

## Dependencies (build only)

- [grunt](https://gruntjs.com/) + [grunt-combine](https://github.com/bret/grunt-combine) — Merges JS/CSS into a single HTML file

No runtime dependencies.

## Disclaimer

**This software is provided "as is", without warranty of any kind.** The algorithms and data implementations may contain errors. Always cross-verify generated addresses and private keys using independent tools before use. The developer shall not be held liable for any financial loss resulting from the use of this software. **Use at your own risk.**

## License

MIT License. (c) 2026 hmisty@gmail.com

Portions sourced from [bitaddress.org](https://github.com/pointbiz/bitaddress.org) under MIT/BSD License.

---

**Donation:** `bc1qq5eqsmqmlkrjnd6y7hwhyuv73vrkrp2pg8ma2s`

