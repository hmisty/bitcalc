var bip39 = {};

bip39.entropyToMnemonic = function (entropyBytes, wordCount) {
	wordCount = wordCount || 12;
	if (entropyBytes.length !== 16 && entropyBytes.length !== 32) {
		throw "Entropy must be 16 or 32 bytes";
	}
	if ((wordCount === 12 && entropyBytes.length !== 16) ||
		(wordCount === 24 && entropyBytes.length !== 32)) {
		throw "12 words require 16 bytes entropy, 24 words require 32 bytes entropy";
	}

	var ent = entropyBytes.slice();
	var hash = Crypto.SHA256(ent, { asBytes: true });

	var entBits = ent.length * 8;
	var csBits = entBits / 32;
	var totalBits = entBits + csBits;

	var bits = [];
	for (var i = 0; i < ent.length; i++) {
		for (var b = 7; b >= 0; b--) {
			bits.push((ent[i] >> b) & 1);
		}
	}
	for (var i = 0; i < csBits; i++) {
		bits.push((hash[i >> 3] >> (7 - (i % 8))) & 1);
	}

	var words = [];
	for (var i = 0; i < totalBits; i += 11) {
		var idx = 0;
		for (var j = 0; j < 11; j++) {
			idx = (idx << 1) | bits[i + j];
		}
		words.push(BIP39_WORDLIST_EN[idx]);
	}

	return words.join(' ');
};

bip39.mnemonicToSeed = function (mnemonic, passphrase) {
	passphrase = passphrase || '';
	var mnemonicBytes = mnemonic;
	if (typeof mnemonic === 'string') {
		var m = [];
		for (var i = 0; i < mnemonic.length; i++) {
			m.push(mnemonic.charCodeAt(i) & 0xFF);
		}
		mnemonicBytes = m;
	}
	var salt = "mnemonic" + passphrase;
	return Crypto.PBKDF2(mnemonicBytes, salt, 64, {
		hasher: Crypto.SHA512,
		iterations: 2048,
		asBytes: true
	});
};

bip39.validateMnemonic = function (mnemonic) {
	var words = mnemonic.trim().split(/\s+/);
	if (words.length !== 12 && words.length !== 24) return false;

	var wordIndexes = [];
	for (var i = 0; i < words.length; i++) {
		var idx = -1;
		for (var j = 0; j < BIP39_WORDLIST_EN.length; j++) {
			if (BIP39_WORDLIST_EN[j] === words[i]) {
				idx = j;
				break;
			}
		}
		if (idx === -1) return false;
		wordIndexes.push(idx);
	}

	var bits = [];
	for (var i = 0; i < wordIndexes.length; i++) {
		for (var b = 10; b >= 0; b--) {
			bits.push((wordIndexes[i] >> b) & 1);
		}
	}

	var entBits = (words.length === 12) ? 128 : 256;
	var csBits = entBits / 32;

	var entBytes = [];
	for (var i = 0; i < entBits; i += 8) {
		var byte = 0;
		for (var j = 0; j < 8; j++) {
			byte = (byte << 1) | bits[i + j];
		}
		entBytes.push(byte);
	}

	var csBitsFromMnemonic = [];
	for (var i = entBits; i < entBits + csBits; i++) {
		csBitsFromMnemonic.push(bits[i]);
	}

	var hash = Crypto.SHA256(entBytes, { asBytes: true });
	for (var i = 0; i < csBits; i++) {
		if (csBitsFromMnemonic[i] !== ((hash[i >> 3] >> (7 - (i % 8))) & 1)) {
			return false;
		}
	}

	return true;
};

bip39.mnemonicToEntropy = function (mnemonic) {
	var words = mnemonic.trim().split(/\s+/);
	if (words.length !== 12 && words.length !== 24) return null;

	var wordIndexes = [];
	for (var i = 0; i < words.length; i++) {
		var idx = -1;
		for (var j = 0; j < BIP39_WORDLIST_EN.length; j++) {
			if (BIP39_WORDLIST_EN[j] === words[i]) {
				idx = j;
				break;
			}
		}
		if (idx === -1) return null;
		wordIndexes.push(idx);
	}

	var bits = [];
	for (var i = 0; i < wordIndexes.length; i++) {
		for (var b = 10; b >= 0; b--) {
			bits.push((wordIndexes[i] >> b) & 1);
		}
	}

	var entBits = (words.length === 12) ? 128 : 256;
	var entBytes = [];
	for (var i = 0; i < entBits; i += 8) {
		var byte = 0;
		for (var j = 0; j < 8; j++) {
			byte = (byte << 1) | bits[i + j];
		}
		entBytes.push(byte);
	}

	return entBytes;
};
