var bip32 = {};

bip32.fromSeed = function (seed) {
	if (typeof seed === 'string') {
		seed = Crypto.util.hexToBytes(seed);
	}
	var I = Crypto.HMAC(Crypto.SHA512, seed, "Bitcoin seed", { asBytes: true });
	var IL = I.slice(0, 32);
	var IR = I.slice(32, 64);
	return {
		key: BigInteger.fromByteArrayUnsigned(IL),
		chainCode: IR,
		depth: 0,
		index: 0
	};
};

bip32.ckdPriv = function (parent, index) {
	var ecparams = EllipticCurve.getSECCurveByName("secp256k1");
	var n = ecparams.getN();

	var data;
	if (index >= 0x80000000) {
		var keyBytes = parent.key.toByteArrayUnsigned();
		while (keyBytes.length < 32) keyBytes.unshift(0x00);
		data = [0x00].concat(keyBytes).concat([
			(index >>> 24) & 0xFF,
			(index >>> 16) & 0xFF,
			(index >>> 8) & 0xFF,
			index & 0xFF
		]);
	} else {
		var pubPoint = ecparams.getG().multiply(parent.key);
		var pubKeyBytes = pubPoint.getEncoded(1);
		data = pubKeyBytes.concat([
			(index >>> 24) & 0xFF,
			(index >>> 16) & 0xFF,
			(index >>> 8) & 0xFF,
			index & 0xFF
		]);
	}

	var I = Crypto.HMAC(Crypto.SHA512, data, parent.chainCode, { asBytes: true });
	var IL = I.slice(0, 32);
	var IR = I.slice(32, 64);

	var parse256 = BigInteger.fromByteArrayUnsigned(IL);
	var childKey = parse256.add(parent.key).mod(n);

	if (childKey.equals(BigInteger.ZERO)) {
		throw "Invalid private key (k=0), should derive with next index";
	}

	return {
		key: childKey,
		chainCode: IR,
		depth: parent.depth + 1,
		index: index
	};
};

bip32.derivePath = function (node, path) {
	if (path === 'm' || path === 'M') return node;

	var parts = path.split('/');
	if (parts[0] !== 'm' && parts[0] !== 'M') throw "Invalid path: must start with m/";

	var current = node;
	for (var i = 1; i < parts.length; i++) {
		var part = parts[i];
		var hardened = false;
		if (part.length > 0 && part[part.length - 1] === "'") {
			hardened = true;
			part = part.slice(0, -1);
		}
		if (part.length === 0 || isNaN(part)) {
			throw "Invalid path segment: " + parts[i];
		}
		var index = parseInt(part, 10);
		if (hardened) index += 0x80000000;
		current = bip32.ckdPriv(current, index);
	}
	return current;
};

bip32.nodeToPubKeyBytes = function (node) {
	var ecparams = EllipticCurve.getSECCurveByName("secp256k1");
	var pubPoint = ecparams.getG().multiply(node.key);
	return pubPoint.getEncoded(1);
};

bip32.nodeToPubKeyHash = function (node) {
	var pubBytes = bip32.nodeToPubKeyBytes(node);
	return Bitcoin.Util.sha256ripe160(pubBytes);
};

bip32.nodeToSegwitAddress = function (node, network) {
	network = network || 'bc';
	var pubKeyHash = bip32.nodeToPubKeyHash(node);
	return bech32.encodeSegwit(network, 0, pubKeyHash);
};
