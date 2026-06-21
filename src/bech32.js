var bech32 = {};

bech32.CHARSET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';

bech32.CHARSET_INV = {};
for (var i = 0; i < bech32.CHARSET.length; i++) {
	bech32.CHARSET_INV[bech32.CHARSET[i]] = i;
}

bech32.GENERATOR = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3];

bech32.polymod = function (values) {
	var chk = 1;
	for (var i = 0; i < values.length; i++) {
		var top = chk >>> 25;
		chk = ((chk & 0x1ffffff) << 5) ^ values[i];
		for (var j = 0; j < 5; j++) {
			if ((top >>> j) & 1) chk ^= bech32.GENERATOR[j];
		}
	}
	return chk;
};

bech32.hrpExpand = function (hrp) {
	var ret = [];
	for (var i = 0; i < hrp.length; i++) {
		ret.push(hrp.charCodeAt(i) >>> 5);
	}
	ret.push(0);
	for (var i = 0; i < hrp.length; i++) {
		ret.push(hrp.charCodeAt(i) & 31);
	}
	return ret;
};

bech32.verifyChecksum = function (hrp, data) {
	return bech32.polymod(bech32.hrpExpand(hrp).concat(data)) === 1;
};

bech32.createChecksum = function (hrp, data) {
	var values = bech32.hrpExpand(hrp).concat(data).concat([0, 0, 0, 0, 0, 0]);
	var polymod = bech32.polymod(values) ^ 1;
	var checksum = [];
	for (var i = 0; i < 6; i++) {
		checksum.push((polymod >>> (5 * (5 - i))) & 31);
	}
	return checksum;
};

bech32.encode = function (hrp, data) {
	var combined = data.concat(bech32.createChecksum(hrp, data));
	var ret = hrp + '1';
	for (var i = 0; i < combined.length; i++) {
		ret += bech32.CHARSET[combined[i]];
	}
	return ret;
};

bech32.decode = function (str) {
	var hasLower = false, hasUpper = false;
	for (var i = 0; i < str.length; i++) {
		var c = str.charCodeAt(i);
		if (c >= 97 && c <= 122) hasLower = true;
		if (c >= 65 && c <= 90) hasUpper = true;
	}
	if (hasLower && hasUpper) return null;

	str = str.toLowerCase();
	var pos = str.lastIndexOf('1');
	if (pos < 1 || pos + 7 > str.length || str.length > 90) return null;

	var hrp = str.slice(0, pos);
	var data = [];
	for (var i = pos + 1; i < str.length; i++) {
		var d = bech32.CHARSET_INV[str[i]];
		if (d === undefined) return null;
		data.push(d);
	}
	if (!bech32.verifyChecksum(hrp, data)) return null;

	return { hrp: hrp, data: data.slice(0, data.length - 6) };
};

bech32.fromWords = function (words) {
	var acc = 0, bits = 0, ret = [];
	for (var i = 0; i < words.length; i++) {
		acc = (acc << 5) | words[i];
		bits += 5;
		while (bits >= 8) {
			bits -= 8;
			ret.push((acc >>> bits) & 0xFF);
		}
	}
	return ret;
};

bech32.toWords = function (bytes) {
	var acc = 0, bits = 0, ret = [];
	for (var i = 0; i < bytes.length; i++) {
		acc = (acc << 8) | bytes[i];
		bits += 8;
		while (bits >= 5) {
			bits -= 5;
			ret.push((acc >>> bits) & 31);
		}
	}
	if (bits > 0) ret.push((acc << (5 - bits)) & 31);
	return ret;
};

bech32.encodeSegwit = function (hrp, version, program) {
	var data = [version].concat(bech32.toWords(program));
	return bech32.encode(hrp, data);
};

bech32.decodeSegwit = function (addr) {
	var dec = bech32.decode(addr);
	if (!dec) return null;
	if (dec.hrp !== 'bc' && dec.hrp !== 'tb' && dec.hrp !== 'bcrt') return null;
	if (dec.data.length < 1 || dec.data[0] > 16) return null;
	var program = bech32.fromWords(dec.data);
	if (dec.data[0] === 0 && program.length !== 20 && program.length !== 32) return null;
	if (dec.data[0] !== 0 && (program.length < 2 || program.length > 40)) return null;
	return { hrp: dec.hrp, version: dec.data[0], program: program };
};
