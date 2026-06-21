# BitCalc — Offline Bitcoin Address Calculator

**离线比特币地址计算器 · 比特币冷钱包生成器**
**Offline Bitcoin Address Calculator · Cold Wallet Bitcoin Address Generator**

一个完全离线的单页 HTML 工具，在浏览器中安全生成比特币地址，无需联网，无需服务器。

A fully offline single-page HTML tool for securely generating Bitcoin addresses in your browser. No internet, no server required.

---

## 设计动机 Rationale

### 为什么需要 BitCalc？

现有冷钱包生成工具（如 bitaddress.org）只支持 Legacy P2PKH 地址（以 `1` 开头），缺少现代钱包普遍使用的 Native SegWit 地址（bech32，以 `bc1` 开头）。此外，它们仅导出裸私钥（WIF），而不生成 BIP-39 助记词。

### Why another address generator?

Existing cold wallet tools (e.g. bitaddress.org) only support Legacy P2PKH addresses (starting with `1`) and lack Native SegWit (bech32, starting with `bc1`). Furthermore, they only export raw private keys (WIF), not BIP-39 mnemonics.

### 量子计算威胁 Quantum Preparedness (BIP-361)

[BIP-361](https://www.bip361.org/) 提出了一个分阶段的量子迁移方案。其中 Phase C 计划允许用户通过**零知识证明持有 BIP-39 助记词**来恢复量子脆弱地址中的资金——这意味着**助记词是将来的量子迁移中证明所有权的关键凭证**，光有裸私钥是不够的。

没有助记词，就无法参与 BIP-361 的 Phase C 恢复机制；一旦量子计算机成熟，在链上暴露过公钥的地址可能被窃取。

[BIP-361](https://www.bip361.org/) proposes a phased quantum migration plan. Phase C plans to allow users to recover funds from quantum-vulnerable UTXOs by submitting a **zero-knowledge proof of possession of a BIP-39 seed phrase**. This means **mnemonics are the key credential for proving ownership in future quantum migration** — raw private keys alone are insufficient.

Without a mnemonic, you cannot participate in BIP-361's Phase C recovery mechanism. Once a cryptographically-relevant quantum computer matures, addresses that have exposed their public keys on-chain could be stolen.

> *Phase C: Users with frozen quantum vulnerable funds and a HD wallet seed phrase can construct a quantum safe proof to recover funds.* — BIP-361

**BitCalc 同时支持裸地址（Legacy + SegWit）和 BIP-39 助记词路径**，既可以满足当前的使用需求，也为未来的量子迁移做好了前置准备。

**BitCalc supports both raw addresses (Legacy + SegWit) and BIP-39 mnemonic paths** — meeting today's needs while preparing for future quantum migration.

---

## 功能 Features

| 功能 | Feature | 说明 |
|------|---------|------|
| **脑钱包** | Brain Wallet | 密码 → SHA256ⁿ → 熵，可选迭代次数 / password → entropy, optional iterations |
| **随机钱包** | Random Wallet | 鼠标/键盘收集熵 → SecureRandom / mouse + keyboard entropy collection |
| **Legacy 路径** | Legacy Path | P2PKH (非压缩公钥) + 原生 SegWit (压缩公钥) / uncompressed + compressed keys |
| **助记词路径** | Mnemonic Path | BIP39 12/24 词 → BIP32 HD → m/84'/0'/0'/0/0 / mnemonic → HD wallet |
| **助记词恢复** | Mnemonic Recovery | 输入助记词 → 恢复熵、种子、HD 地址列表 / recover addresses from mnemonic |
| **验证** | Verify | 验证助记词校验和、私钥 WIF、地址格式 / validate mnemonic, WIF, addresses |
| **QR Code** | QR Code | 地址和私钥旁显示二维码 / display QR codes for addresses and keys |
| **中英双语** | Bilingual | 中文 / English 界面切换 / switch between Chinese and English |
| **完全离线** | Fully Offline | 单 HTML 文件，浏览器直接打开 / single HTML, open in any browser |

## 使用方法 Usage

### 在线使用 / 本地打开 Open & Use

直接用浏览器打开 `bitcalc.html` 即可，无需任何服务端。

Open `bitcalc.html` directly in a browser — no server needed.

### 构建 Build

```bash
git clone https://github.com/<your>/bitcalc.git
cd bitcalc
npm install
npm run build
```

输出为 `bitcalc.html`，可离线使用。

Output: `bitcalc.html` — a portable single-file HTML.

## 安全说明 Security Notes

- **必须离线使用**：请在断开网络的机器上生成冷钱包。确认浏览器无法访问互联网后再操作。
- **Use offline only**: Disconnect from the internet before generating wallets. Verify your browser cannot reach any network.
- **关闭后密钥不可恢复**：本工具不保存任何数据。刷新或关闭页面后，当前生成的密钥将永久丢失（除非已抄写备份）。
- **Keys are ephemeral**: This tool stores nothing. Refreshing or closing the page will permanently lose the generated keys.
- **打印纸质备份**：建议将生成的地址和私钥打印出来，密封保存（冷存储）。请勿以电子形式存储私钥。
- **Paper backup**: Print and seal your wallet. Never store private keys digitally.
- **验证完整性**：使用前可通过 SHA256 校验 `bitcalc.html` 的完整性。
- **Verify integrity**: Check the SHA256 hash of `bitcalc.html` before use.

## 技术细节 Technical Details

### 架构 Architecture

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

### 派生路径 Derivation Path

| 类型 | 路径 |
|------|------|
| BIP84 Native SegWit | `m/84'/0'/0'/0/{0..9}` |

### 测试向量 Test Vectors

| 输入/Input | 输出/Output |
|-----------|------------|
| 密码 `test`, 迭代次数=1 / password `test`, iterations=1 | P2PKH: `1HKqKTMpBTZZ8H5zcqYEWYBaaWELrDEXeE` |
| | P2WPKH: `bc1qtmrl9526rusw4dnavrcfal72tz6ram5lqzutru` |
| | 24词助记词 / 24-word mnemonic: `panel custom call ... bargain` |
| | BIP84 #0: `bc1qquzeycp8sfh6jwdm9pq92m6zp8vgv3p0l5fuyz` |
| | BIP84 #1: `bc1qv5u53h298fh3htgyxe32fwuvt9huz8e4rjjqnh` |
| | BIP84 #2: `bc1qcfk9m6m87068jcqtxhqrsssp478x9grjjcssqs` |

## 依赖 Dependencies (build only)

- [grunt](https://gruntjs.com/) + [grunt-combine](https://github.com/bret/grunt-combine) — 将 JS/CSS 合并为单 HTML 文件
- Merges JS/CSS into a single HTML file

运行时无外部依赖。No runtime dependencies.

## 免责声明 Disclaimer

**本工具按"现状"提供，无任何明示或暗示的保证。** 算法和数据实现均可能存在错误，使用前请务必通过其他独立工具交叉验证生成的地址和私钥的正确性。因使用本工具而造成的任何财产损失，开发者不承担任何责任。**Use at your own risk.**

**This software is provided "as is", without warranty of any kind.** The algorithms and data implementations may contain errors. Always cross-verify generated addresses and private keys using independent tools before use. The developer shall not be held liable for any financial loss resulting from the use of this software. **Use at your own risk.**

## 许可 License

MIT License. (c) 2026 hmisty@gmail.com

部分代码来自 [bitaddress.org](https://github.com/pointbiz/bitaddress.org) (MIT/BSD License).
Portions sourced from [bitaddress.org](https://github.com/pointbiz/bitaddress.org) under MIT/BSD License.

---

**Donation:** `bc1q4yt2sa60sx38u40msye936hst6fadqxw70vhzv`
