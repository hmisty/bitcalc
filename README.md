# BitCalc — Offline Bitcoin Address Calculator

**Offline Bitcoin Address Calculator · Cold Wallet Bitcoin Address Generator**

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
| **Brain Wallet** | Password → SHA256ⁿ → entropy, optional iterations |
| **Random Wallet** | Mouse + keyboard entropy collection → SecureRandom PRNG |
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
| **Bilingual** | Chinese / English UI toggle |
| **Fully Offline** | Single HTML file, open in any browser |

## Changelog

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
├── securerandom.js        ← from bitaddress.org (ArcFour PRNG secure random)
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

**Donation:** `bc1q4yt2sa60sx38u40msye936hst6fadqxw70vhzv`
