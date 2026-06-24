var L = {
	zh: {
		title: "BitCalc 比特币地址计算器",
		tabBrain: "脑钱包", tabRandom: "随机钱包", tabMnemonic: "助记词", tabVerify: "验证", tabTest: "自检",
		langZh: "中文", langEn: "English",
		brainTitle: "脑钱包 - 从密码生成地址",
		enterPassword: "输入密码", confirmPassword: "确认密码", pwPlaceholder: "至少30字符, 需含大小写字母+数字+特殊符号", 		confirmHint: "留空=恢复模式", pwMismatch: "两次输入的密码不匹配",
		dangerCb: "危险（我确信我知道我在干什么）",
		pwErrLen: "密码长度需至少30个字符", pwErrUpper: "密码需包含大写字母", pwErrLower: "密码需包含小写字母",
		pwErrDigit: "密码需包含数字", pwErrSpecial: "密码需包含特殊字符", iterations: "迭代次数",
		generate: "生成", showPw: "显示?", wordCount: "单词数",
		randomTitle: "随机钱包 - 安全随机生成地址",
		moveMouse: "移动鼠标收集随机种子...",
		orType: "或在此输入随机字符:",
		seeded: "随机种子已收集",
		mnemonicTitle: "助记词恢复 - 从助记词计算地址",
		segwitDerivation: "派生路径",
		verifyTitle: "验证",
		verifyPlaceholder: "输入助记词、私钥(WIF)或地址进行验证...",
		verifyBtn: "验证",
		supportedFormats: "支持格式: 助记词(12/24词)、私钥WIF、P2PKH地址、SegWit地址",
		entropyLabel: "熵 (Hex)", mnemonicLabel: "助记词", seedLabel: "种子 (Hex)",
		legacyTitle: "经典路径",
		p2pkhLabel: "P2PKH 地址", p2pkhComp: "P2PKH 地址 (压缩公钥)", p2wpkhLabel: "原生 SegWit 地址",
		wifUncomp: "私钥 WIF (非压缩)", wifComp: "私钥 WIF (压缩)",
		wifUncompShort: "WIF (非压缩)", wifCompShort: "WIF (压缩)",
		mnemonicOutput: "助记词路径",
		derivedSegwit: "派生 SegWit 地址 #0 (m/84'/0'/0'/0/0)",
		verifyResult: "验证结果",
		mnemonicValid: "助记词校验和有效", mnemonicInvalid: "助记词校验和无效",
		addressMatch: "地址匹配", addressNoMatch: "地址不匹配",
		privkeyValid: "私钥有效", privkeyInvalid: "私钥无效",
		addressValid: "地址格式有效", addressInvalid: "地址格式无效",
		selfTest: "自检",
		selfTestDesc: "使用已知测试向量验证核心功能",
		runTest: "运行测试",
		testPass: "通过", testFail: "失败",
		passphrase: "助记词口令 (可选)",
		mnemonicPassphrase: "助记词口令 (可选)",
		passphrasePlaceholder: "不设置则使用空口令",
		advOptions: "高级选项",
		iterDesc: "次数=1: entropy= SHA256(密码); 次数=N: 做N次 SHA256, 即 SHA256ⁿ(密码)",
		verifyMnemonic: "助记词验证",
		verifyAddress: "地址/私钥验证",
		segwitPath: "BIP84 原生 SegWit",
		recoverBtn: "恢复",
		mnemonicPlaceholder: "输入12或24个助记词，用空格分隔...",
		mneStatusValid: "助记词有效",
		mneStatusInvalid: "助记词无效",
		mneWordCount: "单词数",
		mneDetected: "检测到",
		techDetails: "技术详情 (Hex)",
		loading: "计算中...",
		donate: "捐赠",
		disclaimer: "无担保，使用风险自负。No warranty, use at your own risk.",
	},
	en: {
		title: "BitCalc Bitcoin Address Calculator",
		tabBrain: "Brain Wallet", tabRandom: "Random Wallet", tabMnemonic: "Mnemonic", tabVerify: "Verify", tabTest: "Self Test",
		langZh: "中文", langEn: "English",
		brainTitle: "Brain Wallet - Address from Password",
		enterPassword: "Enter Password", confirmPassword: "Confirm Password", pwPlaceholder: "≥30 chars, upper+lower+digit+special", 		confirmHint: "leave empty = recovery", pwMismatch: "Passwords do not match",
		dangerCb: "DANGER (I know what I'm doing)",
		pwErrLen: "Password must be at least 30 characters", pwErrUpper: "Password must contain uppercase letters",
		pwErrLower: "Password must contain lowercase letters", pwErrDigit: "Password must contain digits",
		pwErrSpecial: "Password must contain special characters", iterations: "Iterations",
		generate: "Generate", showPw: "Show?", wordCount: "Words",
		randomTitle: "Random Wallet - Secure Random Address",
		moveMouse: "Move mouse to collect randomness...",
		orType: "Or type random characters here:",
		seeded: "Randomness collected",
		mnemonicTitle: "Mnemonic Recovery - Address from Mnemonic",
		segwitDerivation: "Derivation Path",
		verifyTitle: "Verify",
		verifyPlaceholder: "Enter mnemonic, private key (WIF) or address to verify...",
		verifyBtn: "Verify",
		supportedFormats: "Supported: Mnemonic(12/24 words), WIF Private Key, P2PKH Address, SegWit Address",
		entropyLabel: "Entropy (Hex)", mnemonicLabel: "Mnemonic", seedLabel: "Seed (Hex)",
		legacyTitle: "Legacy Path",
		p2pkhLabel: "P2PKH Address", p2pkhComp: "P2PKH Address (Compressed)", p2wpkhLabel: "Native SegWit Address",
		wifUncomp: "Private Key WIF (Uncompressed)", wifComp: "Private Key WIF (Compressed)",
		wifUncompShort: "WIF (UNCOMPRESSED)", wifCompShort: "WIF (COMPRESSED)",
		mnemonicOutput: "Mnemonic Path",
		derivedSegwit: "Derived SegWit Address #0 (m/84'/0'/0'/0/0)",
		verifyResult: "Verification Result",
		mnemonicValid: "Mnemonic checksum valid", mnemonicInvalid: "Mnemonic checksum invalid",
		addressMatch: "Address matches", addressNoMatch: "Address does not match",
		privkeyValid: "Private key valid", privkeyInvalid: "Invalid private key",
		addressValid: "Address format valid", addressInvalid: "Invalid address format",
		selfTest: "Self Test",
		selfTestDesc: "Verify core functions against known test vectors",
		runTest: "Run Tests",
		testPass: "Pass", testFail: "Fail",
		passphrase: "Passphrase (optional)",
		mnemonicPassphrase: "Mnemonic Passphrase (optional)",
		passphrasePlaceholder: "leave empty = no passphrase",
		advOptions: "Advanced Options",
		iterDesc: "Iterations=1: entropy= SHA256(pw); Iterations=N: SHA256ⁿ(pw)",
		verifyMnemonic: "Mnemonic Verification",
		verifyAddress: "Address/Key Verification",
		segwitPath: "BIP84 Native SegWit",
		recoverBtn: "Recover",
		mnemonicPlaceholder: "Enter 12 or 24 mnemonic words, space separated...",
		mneStatusValid: "Valid mnemonic",
		mneStatusInvalid: "Invalid mnemonic",
		mneWordCount: "Words",
		mneDetected: "Detected",
		techDetails: "Technical Details (Hex)",
		loading: "Computing...",
		donate: "Donation",
		disclaimer: "No warranty, use at your own risk. 无担保，使用风险自负。",
	}
};
var LANG = 'zh';

function showLoading() {
	document.getElementById('loading-overlay').classList.add('active');
}
function hideLoading() {
	document.getElementById('loading-overlay').classList.remove('active');
}

function t(key) { return L[LANG][key] || key; }

function setLang(lang) {
	LANG = lang;
	var els = document.querySelectorAll('[data-i18n]');
	for (var i = 0; i < els.length; i++) {
		var key = els[i].getAttribute('data-i18n');
		els[i].textContent = t(key);
	}
	els = document.querySelectorAll('[data-i18n-placeholder]');
	for (var i = 0; i < els.length; i++) {
		var key = els[i].getAttribute('data-i18n-placeholder');
		els[i].placeholder = t(key);
	}
	document.querySelectorAll('.lang-btn').forEach(function(b) {
		b.classList.toggle('active', b.getAttribute('data-lang') === lang);
	});
}

function showTab(name) {
	document.querySelectorAll('.tab-content').forEach(function(t) { t.classList.remove('active'); });
	document.querySelectorAll('.tab').forEach(function(t) { t.classList.remove('active'); });
	document.getElementById('tab-' + name).classList.add('active');
	document.getElementById('content-' + name).classList.add('active');
}

function showQrCode(containerId, text) {
	var container = document.getElementById(containerId);
	if (!container) return;
	container.innerHTML = '';
	if (!text) return;
	try {
		var typeNumber = 1;
		var len = text.length * 8 + 12;
		if (len > 72) typeNumber = 2;
		if (len > 128) typeNumber = 3;
		if (len > 208) typeNumber = 4;
		if (len > 288) typeNumber = 5;
		if (len > 368) typeNumber = 6;
		if (len > 480) typeNumber = 7;
		if (len > 528) typeNumber = 8;
		if (len > 688) typeNumber = 9;
		if (len > 800) typeNumber = 10;
		var qr = new QRCode(typeNumber, QRCode.ErrorCorrectLevel.H);
		qr.addData(text);
		qr.make();
		var size = qr.getModuleCount() * 3;
		var canvas = document.createElement('canvas');
		canvas.width = size * 4; canvas.height = size * 4;
		canvas.style.width = size + 'px'; canvas.style.height = size + 'px';
		var ctx = canvas.getContext('2d');
		ctx.scale(4, 4);
		var tileW = size / qr.getModuleCount();
		var tileH = size / qr.getModuleCount();
		for (var row = 0; row < qr.getModuleCount(); row++) {
			for (var col = 0; col < qr.getModuleCount(); col++) {
				ctx.fillStyle = qr.isDark(row, col) ? '#000' : '#fff';
				ctx.fillRect(col * tileW, row * tileH, tileW, tileH);
			}
		}
		container.appendChild(canvas);
	} catch(e) {}
}

function entropyToLegacy(entropy) { var e=entropy.slice(); return {
	entropyHex: Crypto.util.bytesToHex(e).toUpperCase(), entropyBytes: e,
	ecKeyUncomp: function(){var k=new Bitcoin.ECKey(e);k.setCompressed(false);return k;}(),
	ecKeyComp: function(){var k=new Bitcoin.ECKey(e);k.setCompressed(true);return k;}()
};}

function getP2WPKH(ecKeyComp) {
	var pubHash = ecKeyComp.getPubKeyHash();
	return bech32.encodeSegwit('bc', 0, pubHash);
}

function fillMnemonicRecovery(mnemonic, passphrase) {
	document.getElementById('mnemonic-input').value = mnemonic;
	document.getElementById('mnemonic-passphrase-recover').value = passphrase || '';
	document.getElementById('mnemonic-output').style.display = 'none';
	document.getElementById('mnemonic-status').innerHTML = '';
}

function checkPasswordComplexity(pw) {
	if (pw.length < 30) return t('pwErrLen');
	if (!/[A-Z]/.test(pw)) return t('pwErrUpper');
	if (!/[a-z]/.test(pw)) return t('pwErrLower');
	if (!/[0-9]/.test(pw)) return t('pwErrDigit');
	if (!/[^A-Za-z0-9]/.test(pw)) return t('pwErrSpecial');
	return null;
}

function generateBrainWallet() {
	showLoading();
	setTimeout(function() {
	var pw = document.getElementById('brain-pw').value;
	var pwConfirm = document.getElementById('brain-confirm').value;
	var showChecked = document.getElementById('brain-show').checked;

	var isCreation = !showChecked && pwConfirm.length > 0;
	if (isCreation) {
		if (pw !== pwConfirm) { hideLoading(); alert(t('pwMismatch')); return; }
		var pwErr = checkPasswordComplexity(pw);
		if (pwErr) { hideLoading(); alert(pwErr); return; }
	}

	var iters = parseInt(document.getElementById('brain-iters').value) || 1;
	var entropy = iters === 1 ? Crypto.SHA256(pw, {asBytes: true}) : function(){var b=Crypto.SHA256(pw,{asBytes:true});for(var i=1;i<iters;i++){b=Crypto.SHA256(b,{asBytes:true})}return b;}();
	showBrainResults(entropy);
	hideLoading();
	}, 30);
}

function showBrainResults(entropy) {
	var legacy = entropyToLegacy(entropy);
	var p2wpkh = getP2WPKH(legacy.ecKeyComp);
	document.getElementById('brain-output').style.display = 'block';
	document.querySelector('#brain-output [data-field="entropyHex"] .output-value').textContent = legacy.entropyHex;
	document.querySelector('#brain-output [data-field="p2pkh"] .output-value').textContent = legacy.ecKeyUncomp.getBitcoinAddress();
	document.querySelector('#brain-output [data-field="p2wpkh"] .output-value').textContent = p2wpkh;
	document.querySelector('#brain-output [data-field="p2pkhComp"] .output-value').textContent = legacy.ecKeyComp.getBitcoinAddress();
	document.querySelector('#brain-output [data-field="wifUncomp"] .output-value').textContent = legacy.ecKeyUncomp.getBitcoinWalletImportFormat();
	document.querySelector('#brain-output [data-field="wifComp"] .output-value').textContent = legacy.ecKeyComp.getBitcoinWalletImportFormat();
	showQrCode('brain-qr-p2pkh', legacy.ecKeyUncomp.getBitcoinAddress());
	showQrCode('brain-qr-p2wpkh', p2wpkh);
	showQrCode('brain-qr-wif', legacy.ecKeyUncomp.getBitcoinWalletImportFormat());
	showQrCode('brain-qr-p2pkh-comp', legacy.ecKeyComp.getBitcoinAddress());
	showQrCode('brain-qr-wif-comp', legacy.ecKeyComp.getBitcoinWalletImportFormat());

	var wc = parseInt(document.getElementById('brain-words').value) || 12;
	var entForMnem = wc === 12 ? entropy.slice(0, 16) : entropy.slice();
	try {
		var mnemonic = bip39.entropyToMnemonic(entForMnem, wc);
		fillMnemonicRecovery(mnemonic, document.getElementById('brain-passphrase').value);
		var passphrase = document.getElementById('brain-passphrase').value || '';
		var seed = bip39.mnemonicToSeed(mnemonic, passphrase);
		var master = bip32.fromSeed(seed);
		var node = bip32.derivePath(master, "m/84'/0'/0'/0/0");
		var segwitAddr = bip32.nodeToSegwitAddress(node, 'bc');
		document.querySelector('#brain-output [data-field="mnemonic"] .output-value').textContent = mnemonic;
		document.querySelector('#brain-output [data-field="seedHex"] .output-value').textContent = Crypto.util.bytesToHex(seed).toUpperCase();
		document.querySelector('#brain-output [data-field="bip84"] .output-value').textContent = segwitAddr;
		showQrCode('brain-qr-segwit', segwitAddr);
	} catch(e) {
		document.querySelector('#brain-output [data-field="mnemonic"] .output-value').textContent = 'Error: ' + e.message;
	}
}

var seedCount = 0, seedLimit = 0, isSeeding = true, lastInputTime = 0;

function initRandom() {
	seedLimit = 200 + Math.floor(Math.random() * 100);
	seedCount = 0; isSeeding = true;
	document.getElementById('random-seed-info').textContent = '0%';
	document.getElementById('random-seed-fill').style.width = '0%';
	document.getElementById('random-generate').disabled = true;
}

function seedRandom(evt) {
	if (!isSeeding) return;
	var ts = new Date().getTime();
	if (seedCount >= seedLimit) {
		isSeeding = false;
		document.getElementById('random-generate').disabled = false;
		document.getElementById('random-seed-info').textContent = t('seeded') + ' 100%';
		return;
	}
	if (evt && evt.clientX !== undefined && (ts - lastInputTime) > 40) {
		SecureRandom.seedTime();
		SecureRandom.seedInt16((evt.clientX * evt.clientY));
		seedCount++;
		var pct = Math.round((seedCount / seedLimit) * 100);
		document.getElementById('random-seed-info').textContent = pct + '%';
		document.getElementById('random-seed-fill').style.width = pct + '%';
		lastInputTime = ts;
	}
}

function seedKeyPress(evt) {
	if (!isSeeding) return;
	if (seedCount >= seedLimit) { isSeeding = false; document.getElementById('random-generate').disabled = false; return; }
	if (evt.which) {
		var ts = new Date().getTime();
		SecureRandom.seedTime();
		SecureRandom.seedInt8(evt.which);
		SecureRandom.seedInt8(ts - lastInputTime);
		seedCount++;
		var pct = Math.round((seedCount / seedLimit) * 100);
		document.getElementById('random-seed-info').textContent = pct + '%';
		document.getElementById('random-seed-fill').style.width = pct + '%';
		lastInputTime = ts;
	}
}

function generateRandom() {
	showLoading();
	setTimeout(function() {
	var sr = new SecureRandom();
	var entropyLen = parseInt(document.getElementById('random-words').value) === 12 ? 16 : 32;
	var entropy = new Array(entropyLen);
	sr.nextBytes(entropy);
	showRandomResults(entropy);
	hideLoading();
	}, 30);
}

function showRandomResults(entropy) {
	var legacy = entropyToLegacy(entropy);
	var p2wpkh = getP2WPKH(legacy.ecKeyComp);
	document.getElementById('random-output').style.display = 'block';
	document.querySelector('#random-output [data-field="entropyHex"] .output-value').textContent = legacy.entropyHex;
	document.querySelector('#random-output [data-field="p2pkh"] .output-value').textContent = legacy.ecKeyUncomp.getBitcoinAddress();
	document.querySelector('#random-output [data-field="p2wpkh"] .output-value').textContent = p2wpkh;
	document.querySelector('#random-output [data-field="p2pkhComp"] .output-value').textContent = legacy.ecKeyComp.getBitcoinAddress();
	document.querySelector('#random-output [data-field="wifUncomp"] .output-value').textContent = legacy.ecKeyUncomp.getBitcoinWalletImportFormat();
	document.querySelector('#random-output [data-field="wifComp"] .output-value').textContent = legacy.ecKeyComp.getBitcoinWalletImportFormat();
	showQrCode('random-qr-p2pkh', legacy.ecKeyUncomp.getBitcoinAddress());
	showQrCode('random-qr-p2wpkh', p2wpkh);
	showQrCode('random-qr-p2pkh-comp', legacy.ecKeyComp.getBitcoinAddress());
	showQrCode('random-qr-wif', legacy.ecKeyUncomp.getBitcoinWalletImportFormat());
	showQrCode('random-qr-wif-comp', legacy.ecKeyComp.getBitcoinWalletImportFormat());

	var wc = parseInt(document.getElementById('random-words').value) || 12;
	var entForMnem = wc === 12 ? entropy.slice(0, 16) : entropy.slice();
	try {
		var mnemonic = bip39.entropyToMnemonic(entForMnem, wc);
		fillMnemonicRecovery(mnemonic, document.getElementById('mnemonic-passphrase').value);
		var passphrase = document.getElementById('mnemonic-passphrase').value || '';
		var seed = bip39.mnemonicToSeed(mnemonic, passphrase);
		var master = bip32.fromSeed(seed);
		var node = bip32.derivePath(master, "m/84'/0'/0'/0/0");
		var segwitAddr = bip32.nodeToSegwitAddress(node, 'bc');
		document.querySelector('#random-output [data-field="mnemonic"] .output-value').textContent = mnemonic;
		document.querySelector('#random-output [data-field="seedHex"] .output-value').textContent = Crypto.util.bytesToHex(seed).toUpperCase();
		document.querySelector('#random-output [data-field="bip84"] .output-value').textContent = segwitAddr;
		showQrCode('random-qr-segwit', segwitAddr);
	} catch(e) {
		document.querySelector('#random-output [data-field="mnemonic"] .output-value').textContent = 'Error: ' + e.message;
	}
}

function recoverFromMnemonic() {
	showLoading();
	setTimeout(function() {
	var input = document.getElementById('mnemonic-input').value.trim();
	var statusEl = document.getElementById('mnemonic-status');
	if (!input) { statusEl.innerHTML = '<span class="status-bad">\u2716 ' + t('mnemonicInvalid') + '</span>'; hideLoading(); return; }

	var words = input.split(/\s+/);
	if (words.length !== 12 && words.length !== 24) {
		statusEl.innerHTML = '<span class="status-bad">\u2716 ' + t('mneWordCount') + ': ' + words.length + ' (' + t('mnemonicInvalid') + ')</span>';
		hideLoading(); return;
	}

	var valid = bip39.validateMnemonic(input);
	statusEl.innerHTML = valid ?
		'<span class="status-ok">\u2705 ' + t('mneStatusValid') + ' (' + t('mneDetected') + ': ' + words.length + ' ' + t('mneWordCount') + ')</span>' :
		'<span class="status-bad">\u2716 ' + t('mneStatusInvalid') + ' (' + t('mneDetected') + ': ' + words.length + ' ' + t('mneWordCount') + ')</span>';

	if (!valid) { hideLoading(); return; }

	var passphrase = document.getElementById('mnemonic-passphrase-recover').value || '';

	try {
		var entropy = bip39.mnemonicToEntropy(input);
		var seed = bip39.mnemonicToSeed(input, passphrase);

		document.getElementById('mnemonic-output').style.display = 'block';

		document.querySelector('#mnemonic-output [data-field="entropyHex"] .output-value').textContent = Crypto.util.bytesToHex(entropy).toUpperCase();
		document.querySelector('#mnemonic-output [data-field="seedHex"] .output-value').textContent = Crypto.util.bytesToHex(seed).toUpperCase();

		var master = bip32.fromSeed(seed);
		for (var i = 0; i <= 9; i++) {
			var node = bip32.derivePath(master, "m/84'/0'/0'/0/" + i);
			var addr = bip32.nodeToSegwitAddress(node, 'bc');
			var field = 'bip84_' + i;
			var cell = document.querySelector('#mnemonic-output [data-field="' + field + '"] .output-value');
			if (cell) cell.textContent = addr;
		}
		showQrCode('mnemonic-qr-hd', bip32.nodeToSegwitAddress(bip32.derivePath(master,"m/84'/0'/0'/0/0"),'bc'));
	} catch(e) {
		statusEl.innerHTML += '<br><span class="status-bad">Error: ' + e.message + '</span>';
	}
	hideLoading();
}, 30);
}

function doVerify() {
	showLoading();
	setTimeout(function() {
	var input = document.getElementById('verify-input').value.trim();
	if (!input) { hideLoading(); return; }
	document.getElementById('verify-output').style.display = 'block';
	var results = [];

	var words = input.split(/\s+/);
	if (words.length === 12 || words.length === 24) {
		var valid = bip39.validateMnemonic(input);
		results.push({ label: t('verifyMnemonic'), status: valid, msg: valid ? t('mnemonicValid') : t('mnemonicInvalid') });
		if (valid) {
			var ent = bip39.mnemonicToEntropy(input);
			if (ent) {
				var legacy = entropyToLegacy(ent);
				var p2wpkh = getP2WPKH(legacy.ecKeyComp);
				results.push({ label: 'P2PKH', status: true, msg: legacy.ecKeyUncomp.getBitcoinAddress() });
				results.push({ label: 'P2WPKH', status: true, msg: p2wpkh });
			}
		}
	} else if ((input[0] === '5' && input.length === 51) || ((input[0] === 'K' || input[0] === 'L') && input.length === 52)) {
		try {
			var ecKey = new Bitcoin.ECKey(input);
			if (ecKey.priv) {
				results.push({ label: t('privkeyValid'), status: true, msg: '' });
				ecKey.setCompressed(false);
				results.push({ label: 'P2PKH (' + t('wifUncomp') + ')', status: true, msg: ecKey.getBitcoinAddress() });
				ecKey.setCompressed(true);
				results.push({ label: 'P2WPKH (' + t('wifComp') + ')', status: true, msg: getP2WPKH(ecKey) });
			} else results.push({ label: t('privkeyInvalid'), status: false, msg: '' });
		} catch(e) { results.push({ label: t('privkeyInvalid'), status: false, msg: e.message }); }
	} else if (input.slice(0, 2) === 'bc' || input[0] === '1') {
		if (input[0] === '1') {
			try { var addr = Bitcoin.Address.decodeString(input); results.push({ label: t('addressValid'), status: true, msg: 'P2PKH' }); } catch(e) { results.push({ label: t('addressInvalid'), status: false, msg: e.message }); }
		} else {
			var dec = bech32.decodeSegwit(input);
			if (dec) results.push({ label: t('addressValid'), status: true, msg: 'SegWit v' + dec.version + ', program: ' + dec.program.length + ' bytes' });
			else results.push({ label: t('addressInvalid'), status: false, msg: '' });
		}
	} else results.push({ label: t('verifyResult'), status: false, msg: t('supportedFormats') });

	var html = '';
	for (var i = 0; i < results.length; i++) {
		html += '<div class="test-item ' + (results[i].status ? 'ok' : 'fail') + '">' +
			(results[i].status ? '\u2705 ' : '\u274C ') + results[i].label + ': ' + results[i].msg + '</div>';
	}
	document.getElementById('verify-results').innerHTML = html;
	hideLoading();
	}, 30);
}

var TESTS = {
	entropy: '9F86D081884C7D659A2FEAA0C55AD015A3BF4F1B2B0B822CD15D6C15B0F00A08',
	entropy12: '9F86D081884C7D659A2FEAA0C55AD015',
	entropy9999: '068AB2B4A069C2CCBA8267FCE87433C9E259A509009B781B661C7F3E6932C521',
	p2pkh: '1HKqKTMpBTZZ8H5zcqYEWYBaaWELrDEXeE',
	p2pkh9999: '1Mig3mSpDzbkfZ91UJsTjDnF7QJtxWtmoN',
	segwit: 'bc1qtmrl9526rusw4dnavrcfal72tz6ram5lqzutru',
	segwit9999: 'bc1qvktvghw9veesuucxaqmsh2u20na7gedhh9f86s',
	mnemonic: 'panel custom call awesome sick ready hamster wool patch client reduce clip desk pole hole gesture lion grief firm subway force job choice bargain',
	mnemonic12: 'panel custom call awesome sick ready hamster wool patch client reduce clay',
	mnemonic9999: 'alley few pudding dolphin order green tube erupt woman dry artefact need cereal spoon catch beach job swamp mandate wrist track offer behind disease',
	mnemonic12_9999: 'alley few pudding dolphin order green tube erupt woman dry artefact nasty',
	bip84_0: 'bc1qquzeycp8sfh6jwdm9pq92m6zp8vgv3p0l5fuyz',
	bip84_0_12: 'bc1qlhycuafdegfkcdx435t2glqkyrrrrqfpdjd2nq',
	bip84_0_9999: 'bc1qh67chfkpnmtp5qvs9zh9xm5meff7h4s5xcg4gn',
	bip84_0_9999_12: 'bc1qudnacy6s0dp5zxy4qfe38dn58kdnk8pcfw5pyx',
	bip84_1_12: 'bc1qn6y5jfdf5069w9mxcwjp3qeazqrvr8vltfkv4n',
	bip84_2_12: 'bc1q9urqudztnhffup66l8hs4zzcm3a3e2v63w06fe',
	privkeyUncomp: '5K2YUVmWfxbmvsNxCsfvArXdGXm7d5DC9pn4yD75k2UaSYgkXTh',
	privkeyComp: 'L2ZovMyTxxQVJmMtfQemgVcB5YmiEDapDwsvX6RqvuWibgUNRiHz',
	privkeyUncomp9999: '5HsAgYyyKzhH45Axx4P7umAkcRXM2DuyKJGaP87CjzZJjLZUZxo',
	privkeyComp9999: 'KwSRjaATcqemrZQyx1vdVsx3VMEwNPzoZmDkLeNNpm3bFmeUD3Dr'
};

function runSelfTest() {
	showLoading();
	setTimeout(function() {
	var results = document.getElementById('test-results');
	results.innerHTML = '';
	var testLog = [];

	function check(name, actual, expected) {
		var pass = actual === expected;
		testLog.push({ name: name, pass: pass, expected: expected, actual: actual });
	}

	var entropy = Crypto.util.hexToBytes(TESTS.entropy);
	check('entropy length', entropy.length.toString(), '32');

	try {
		var eckU = new Bitcoin.ECKey(entropy); eckU.setCompressed(false);
		check('p2pkh address', eckU.getBitcoinAddress(), TESTS.p2pkh);
		check('privkey WIF uncomp', eckU.getBitcoinWalletImportFormat(), TESTS.privkeyUncomp);
	} catch(e) { testLog.push({ name: 'p2pkh test', pass: false, expected: '', actual: e.message }); }

	try {
		var eckC = new Bitcoin.ECKey(entropy); eckC.setCompressed(true);
		check('privkey WIF comp', eckC.getBitcoinWalletImportFormat(), TESTS.privkeyComp);
		var p2wpkh = getP2WPKH(eckC);
		check('segwit address', p2wpkh, TESTS.segwit);
	} catch(e) { testLog.push({ name: 'segwit test', pass: false, expected: '', actual: e.message }); }

	try {
		var mnemonic = bip39.entropyToMnemonic(entropy, 24);
		check('mnemonic', mnemonic, TESTS.mnemonic);
	} catch(e) { testLog.push({ name: 'mnemonic test', pass: false, expected: '', actual: e.message }); }

	try {
		var isValid = bip39.validateMnemonic(TESTS.mnemonic);
		check('mnemonic validation', isValid ? 'true' : 'false', 'true');
		var isInvalid = bip39.validateMnemonic('abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon');
		check('invalid mnemonic rejected', isInvalid ? 'false' : 'true', 'true');
	} catch(e) { testLog.push({ name: 'mnemonic validation', pass: false, expected: '', actual: e.message }); }

	try {
		var seed = bip39.mnemonicToSeed(TESTS.mnemonic, '');
		if (seed.length === 64) {
			var master = bip32.fromSeed(seed);
			var node = bip32.derivePath(master, "m/84'/0'/0'/0/0");
			var addr = bip32.nodeToSegwitAddress(node, 'bc');
			check('bip84/0/0/0/0', addr, TESTS.bip84_0);
		} else { testLog.push({ name: 'bip84 derivation', pass: false, expected: '', actual: 'seed length: ' + seed.length }); }
	} catch(e) { testLog.push({ name: 'bip84 derivation', pass: false, expected: '', actual: e.message }); }

	try {
		var ent12 = Crypto.util.hexToBytes(TESTS.entropy12);
		var mne12 = bip39.entropyToMnemonic(ent12, 12);
		check('mnemonic 12-word', mne12, TESTS.mnemonic12);
		check('mnemonic 12 validation', bip39.validateMnemonic(mne12) ? 'true' : 'false', 'true');
		var seed12 = bip39.mnemonicToSeed(mne12, '');
		if (seed12.length === 64) {
			var master12 = bip32.fromSeed(seed12);
			check('bip84/0/0/0/0 (12-word)', bip32.nodeToSegwitAddress(bip32.derivePath(master12,"m/84'/0'/0'/0/0"),'bc'), TESTS.bip84_0_12);
			check('bip84/0/0/0/1 (12-word)', bip32.nodeToSegwitAddress(bip32.derivePath(master12,"m/84'/0'/0'/0/1"),'bc'), TESTS.bip84_1_12);
			check('bip84/0/0/0/2 (12-word)', bip32.nodeToSegwitAddress(bip32.derivePath(master12,"m/84'/0'/0'/0/2"),'bc'), TESTS.bip84_2_12);
		} else { testLog.push({ name: '12-word seed', pass: false, expected: '64', actual: seed12.length.toString() }); }
	} catch(e) { testLog.push({ name: '12-word tests', pass: false, expected: '', actual: e.message }); }

	try {
		var ent9999 = Crypto.SHA256('test', {asBytes: true});
		for (var i = 1; i < 9999; i++) ent9999 = Crypto.SHA256(ent9999, {asBytes: true});
		var hex9999 = ''; for (var j = 0; j < ent9999.length; j++) hex9999 += ('0' + ent9999[j].toString(16)).slice(-2);
		check('entropy 9999 iterations', hex9999.toUpperCase(), TESTS.entropy9999);
		var ek9999 = new Bitcoin.ECKey(ent9999); ek9999.setCompressed(false);
		check('p2pkh 9999', ek9999.getBitcoinAddress(), TESTS.p2pkh9999);
		check('wif uncomp 9999', ek9999.getBitcoinWalletImportFormat(), TESTS.privkeyUncomp9999);
		var ekc9999 = new Bitcoin.ECKey(ent9999); ekc9999.setCompressed(true);
		check('wif comp 9999', ekc9999.getBitcoinWalletImportFormat(), TESTS.privkeyComp9999);
		check('segwit 9999', bech32.encodeSegwit('bc', 0, ekc9999.getPubKeyHash()), TESTS.segwit9999);
		var mne9999 = bip39.entropyToMnemonic(ent9999, 24);
		check('mnemonic 9999', mne9999, TESTS.mnemonic9999);
		check('mnemonic 9999 validation', bip39.validateMnemonic(mne9999) ? 'true' : 'false', 'true');
		var seed9999 = bip39.mnemonicToSeed(mne9999, '');
		if (seed9999.length === 64) {
			var master9999 = bip32.fromSeed(seed9999);
			check('bip84/0/0/0/0 (9999)', bip32.nodeToSegwitAddress(bip32.derivePath(master9999,"m/84'/0'/0'/0/0"),'bc'), TESTS.bip84_0_9999);
		} else { testLog.push({ name: '9999 seed', pass: false, expected: '64', actual: seed9999.length.toString() }); }
		var ent9999_12 = ent9999.slice(0, 16);
		var mne9999_12 = bip39.entropyToMnemonic(ent9999_12, 12);
		check('mnemonic12 9999', mne9999_12, TESTS.mnemonic12_9999);
		check('mnemonic12 9999 validation', bip39.validateMnemonic(mne9999_12) ? 'true' : 'false', 'true');
		var seed9999_12 = bip39.mnemonicToSeed(mne9999_12, '');
		if (seed9999_12.length === 64) {
			var master9999_12 = bip32.fromSeed(seed9999_12);
			check('bip84/0/0/0/0 (9999-12)', bip32.nodeToSegwitAddress(bip32.derivePath(master9999_12,"m/84'/0'/0'/0/0"),'bc'), TESTS.bip84_0_9999_12);
		} else { testLog.push({ name: '9999-12 seed', pass: false, expected: '64', actual: seed9999_12.length.toString() }); }
	} catch(e) { testLog.push({ name: '9999 iteration tests', pass: false, expected: '', actual: e.message }); }

	var html = '';
	var passCount = 0, failCount = 0;
	for (var i = 0; i < testLog.length; i++) {
		if (testLog[i].pass) passCount++; else failCount++;
		html += '<div class="test-item ' + (testLog[i].pass ? 'ok' : 'fail') + '">' +
			(testLog[i].pass ? '\u2705 ' : '\u274C ') + testLog[i].name + ': ' +
			(testLog[i].pass ? t('testPass') : t('testFail') + ' (expected: ' + testLog[i].expected + ', got: ' + testLog[i].actual + ')') +
			'</div>';
	}
	html += '<div style="margin-top:8px;font-weight:600">' + passCount + '/' + (passCount + failCount) + ' ' + t('testPass') + '</div>';
	results.innerHTML = html;
	hideLoading();
	}, 30);
}

function toggleAdv(el) {
	var content = el.nextElementSibling;
	var arrow = el.querySelector('.adv-arrow');
	if (content.style.display === 'none') {
		content.style.display = 'block';
		arrow.innerHTML = '&#9660;';
	} else {
		content.style.display = 'none';
		arrow.innerHTML = '&#9654;';
	}
}

function toggleBrainShow(el) {
	var pw = document.getElementById('brain-pw');
	var confirm = document.getElementById('brain-confirm');
	if (el.checked) {
		pw.type = 'text'; confirm.style.display = 'none';
		document.getElementById('brain-confirm-label').style.display = 'none';
	} else {
		pw.type = 'password'; confirm.style.display = '';
		document.getElementById('brain-confirm-label').style.display = '';
	}
}

function toggleDanger(cb, inputId) {
	document.getElementById(inputId).disabled = !cb.checked;
}
