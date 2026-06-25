# BitCalc — 离线比特币地址计算器

**离线比特币地址计算器 · 比特币冷钱包生成器**

一个完全离线的单页 HTML 工具，在浏览器中安全生成比特币地址，无需联网，无需服务器。

[English](README.md)

---

## 设计动机

### 为什么需要 BitCalc？

现有冷钱包生成工具（如 bitaddress.org）只支持经典 P2PKH 地址（以 `1` 开头），缺少现代钱包普遍使用的 Native SegWit 地址（bech32，以 `bc1` 开头）。此外，它们仅导出裸私钥（WIF），而不生成 BIP-39 助记词。

### 量子计算威胁 (BIP-361)

[BIP-361](https://www.bip361.org/) 提出了一个分阶段的量子迁移方案。其中 Phase C 计划允许用户通过**零知识证明持有 BIP-39 助记词**来恢复量子脆弱地址中的资金——这意味着**助记词是将来的量子迁移中证明所有权的关键凭证**，光有裸私钥是不够的。

没有助记词，就无法参与 BIP-361 的 Phase C 恢复机制；一旦量子计算机成熟，在链上暴露过公钥的地址可能被窃取。

> *Phase C: Users with frozen quantum vulnerable funds and a HD wallet seed phrase can construct a quantum safe proof to recover funds.* — BIP-361

**BitCalc 同时支持裸地址（经典 + SegWit）和 BIP-39 助记词路径**，既可以满足当前的使用需求，也为未来的量子迁移做好了前置准备。

---

## 功能

| 功能 | 说明 |
|------|------|
| **脑钱包** | 密码 → SHA256ⁿ → 熵，可选迭代次数 |
| **随机钱包** | 鼠标/键盘收集熵 → SecureRandom |
| **经典路径** | 压缩 P2PKH + 原生 SegWit + 非压缩 P2PKH（折叠，兼容 bitaddress.org） |
| **助记词路径** | BIP39 12/24 词 → BIP32 HD → m/84'/0'/0'/0/0 |
| **助记词恢复** | 输入助记词 → 恢复熵、种子、HD 地址列表 |
| **验证** | 验证助记词校验和、私钥 WIF、地址格式 |
| **自检** | 25 项内置测试向量验证核心功能 |
| **密码复杂度** | 创建模式下要求 ≥30 字符 + 大小写字母 + 数字 + 特殊符号 |
| **危险保护** | 高级选项默认禁用，勾选后方可编辑 |
| **自动填充** | 生成助记词后自动填入恢复页 |
| **加载动画** | 计算时显示旋转动画遮罩 |
| **QR Code** | 地址和私钥旁显示二维码 |
| **中英双语** | 中文 / English 界面切换 |
| **完全离线** | 单 HTML 文件，浏览器直接打开 |

## 更新日志

### 2026-06-24

- **经典路径重构**: 新增压缩 P2PKH 地址，与 bitaddress.org 保持兼容；分离压缩/非压缩为两组，非压缩卡片默认折叠
- **压缩 P2PKH**: 新增压缩公钥 P2PKH 地址显示
- **密码保护**: 创建模式强制密码复杂度检查（≥30字符+大小写+数字+特殊符号）
- **危险开关**: 迭代次数和助记词口令默认禁用，需勾选「危险」checkbox 方可编辑
- **默认 12 词**: 助记词默认生成 12 词（而非 24 词）
- **自动填充**: 生成的助记词自动填入恢复页，并清除旧结果
- **测试向量**: 新增 12 词 + 9999 次迭代 SHA256 共 14 组测试向量（自检达 25 项）
- **加载动画**: 所有操作按钮添加旋转动画遮罩
- **bech32 bug 修复**: `decodeSegwit` 运算符优先级问题修复
- **密码框优化**: `autocomplete="new-password"` 阻止浏览器弹出保存密码提示
- **CI/CD**: 新增 GitHub Actions 工作流，推送自动构建并发布到 GitHub Pages

## 使用方法

### 打开方式

直接用浏览器打开 `bitcalc.html` 即可，无需任何服务端。

### 构建

```bash
git clone https://github.com/<your>/bitcalc.git
cd bitcalc
npm install
npm run build
```

输出为 `bitcalc.html`，可离线使用。

## 安全说明

- **必须离线使用**：请在断开网络的机器上生成冷钱包。确认浏览器无法访问互联网后再操作。
- **关闭后密钥不可恢复**：本工具不保存任何数据。刷新或关闭页面后，当前生成的密钥将永久丢失（除非已抄写备份）。
- **打印纸质备份**：建议将生成的地址和私钥打印出来，密封保存（冷存储）。请勿以电子形式存储私钥。
- **验证完整性**：使用前可通过 SHA256 校验 `bitcalc.html` 的完整性。

## 技术细节

### 架构

```
src/
├── biginteger.js          ← 来自 bitaddress.org (BigInteger 运算)
├── cryptojs.*.js          ← 来自 bitaddress.org (SHA256, RIPEMD160, HMAC, PBKDF2, AES)
├── ellipticcurve.js       ← 来自 bitaddress.org (secp256k1 椭圆曲线)
├── bitcoinjs-lib.*.js     ← 来自 bitaddress.org (Base58, ECKey, 地址编码)
├── securerandom.js        ← 来自 bitaddress.org (ArcFour PRNG 安全随机数)
├── qrcode.js              ← 来自 bitaddress.org (QR 码生成)
├── cryptojs.sha512.js     ★ 新增 (SHA-512, BIP39 PBKDF2 所需)
├── bech32.js              ★ 新增 (Bech32 编码, 原生 SegWit 地址)
├── bip39-wordlist-en.js   ★ 新增 (BIP39 英文 2048 词表)
├── bip39.js               ★ 新增 (BIP39 助记词: 生成/验证/熵恢复)
├── bip32.js               ★ 新增 (BIP32 HD 钱包: 主密钥/子密钥派生)
├── bitcalc.js             ★ 新增 (主逻辑: 界面交互/双语标签/自检)
├── bitcalc.css            ★ 新增 (样式)
└── bitcalc-ui.html        ★ 新增 (HTML 模板, grunt-combine 入口)
```

### 派生路径

| 类型 | 路径 |
|------|------|
| BIP84 Native SegWit | `m/84'/0'/0'/0/{0..9}` |

### 测试向量

| 输入 | 输出 |
|------|------|
| 密码 `test`, 迭代次数=1 | P2PKH: `1HKqKTMpBTZZ8H5zcqYEWYBaaWELrDEXeE` |
| | P2WPKH: `bc1qtmrl9526rusw4dnavrcfal72tz6ram5lqzutru` |
| | 24 词助记词: `panel custom call ... bargain` |
| | BIP84 #0: `bc1qquzeycp8sfh6jwdm9pq92m6zp8vgv3p0l5fuyz` |
| | BIP84 #1: `bc1qv5u53h298fh3htgyxe32fwuvt9huz8e4rjjqnh` |
| | BIP84 #2: `bc1qcfk9m6m87068jcqtxhqrsssp478x9grjjcssqs` |
| | 12 词助记词: `panel custom call ... clay` |
| | BIP84 #0 (12-word): `bc1qlhycuafdegfkcdx435t2glqkyrrrrqfpdjd2nq` |
| | BIP84 #1 (12-word): `bc1qn6y5jfdf5069w9mxcwjp3qeazqrvr8vltfkv4n` |
| | BIP84 #2 (12-word): `bc1q9urqudztnhffup66l8hs4zzcm3a3e2v63w06fe` |
| 密码 `test`, 9999 次迭代 | P2PKH: `1Mig3mSpDzbkfZ91UJsTjDnF7QJtxWtmoN` |
| | P2WPKH: `bc1qvktvghw9veesuucxaqmsh2u20na7gedhh9f86s` |
| | 24 词助记词: `alley few pudding ... disease` |
| | BIP84 #0 (24-word): `bc1qh67chfkpnmtp5qvs9zh9xm5meff7h4s5xcg4gn` |
| | 12 词助记词: `alley few pudding ... nasty` |
| | BIP84 #0 (12-word): `bc1qudnacy6s0dp5zxy4qfe38dn58kdnk8pcfw5pyx` |

## 依赖（仅构建需要）

- [grunt](https://gruntjs.com/) + [grunt-combine](https://github.com/bret/grunt-combine) — 将 JS/CSS 合并为单 HTML 文件

运行时无外部依赖。

## 免责声明

**本工具按"现状"提供，无任何明示或暗示的保证。** 算法和数据实现均可能存在错误，使用前请务必通过其他独立工具交叉验证生成的地址和私钥的正确性。因使用本工具而造成的任何财产损失，开发者不承担任何责任。**使用风险自负。**

## 许可

MIT License. (c) 2026 hmisty@gmail.com

部分代码来自 [bitaddress.org](https://github.com/pointbiz/bitaddress.org) (MIT/BSD License).

---

**捐赠:** `bc1q4yt2sa60sx38u40msye936hst6fadqxw70vhzv`
