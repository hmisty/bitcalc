module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		combine: {
			single: {
				input: "./src/bitcalc-ui.html",
				output: "./bitcalc.html",
				tokens: [
					{ token: "//biginteger.js", file: "./src/biginteger.js" },
					{ token: "//cryptojs.js", file: "./src/cryptojs.js" },
					{ token: "//cryptojs.sha256.js", file: "./src/cryptojs.sha256.js" },
					{ token: "//cryptojs.ripemd160.js", file: "./src/cryptojs.ripemd160.js" },
					{ token: "//cryptojs.hmac.js", file: "./src/cryptojs.hmac.js" },
					{ token: "//cryptojs.pbkdf2.js", file: "./src/cryptojs.pbkdf2.js" },
					{ token: "//cryptojs.aes.js", file: "./src/cryptojs.aes.js" },
					{ token: "//cryptojs.blockmodes.js", file: "./src/cryptojs.blockmodes.js" },
					{ token: "//cryptojs.sha512.js", file: "./src/cryptojs.sha512.js" },
					{ token: "//securerandom.js", file: "./src/securerandom.js" },
					{ token: "//ellipticcurve.js", file: "./src/ellipticcurve.js" },
					{ token: "//bitcoinjs-lib.js", file: "./src/bitcoinjs-lib.js" },
					{ token: "//bitcoinjs-lib.base58.js", file: "./src/bitcoinjs-lib.base58.js" },
					{ token: "//bitcoinjs-lib.address.js", file: "./src/bitcoinjs-lib.address.js" },
					{ token: "//bitcoinjs-lib.ecdsa.js", file: "./src/bitcoinjs-lib.ecdsa.js" },
					{ token: "//bitcoinjs-lib.eckey.js", file: "./src/bitcoinjs-lib.eckey.js" },
					{ token: "//bitcoinjs-lib.util.js", file: "./src/bitcoinjs-lib.util.js" },
					{ token: "//qrcode.js", file: "./src/qrcode.js" },
					{ token: "//bech32.js", file: "./src/bech32.js" },
					{ token: "//bip39-wordlist-en.js", file: "./src/bip39-wordlist-en.js" },
					{ token: "//bip39.js", file: "./src/bip39.js" },
					{ token: "//bip32.js", file: "./src/bip32.js" },
					{ token: "//bitcalc.js", file: "./src/bitcalc.js" },
					{ token: "//main.css", file: "./src/bitcalc.css" }
				]
			}
		},
		lineending: {
			dist: {
				options: { eol: 'lf' },
				files: { './bitcalc.html': ['./bitcalc.html'] }
			}
		}
	});

	grunt.file.defaultEncoding = 'utf-8';
	grunt.loadNpmTasks("grunt-combine");
	grunt.loadNpmTasks('grunt-lineending');
	grunt.registerTask("default", ["combine:single", "lineending"]);
};
