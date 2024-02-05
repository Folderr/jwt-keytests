import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import fs from "node:fs/promises";

const args = process.argv.slice(2);
if (args.length < 2) {
	console.log("Folderr JWT Keytest Minimal Reproduction Interface\n");
	console.log(
		"Usage: node index.js <path_to_private_key> <path_to_public_key>\n\n"
	);
	console.log("ERROR: Required arguments were not provided");
	process.exit(1);
}

let debug = process.env.DEBUG ?? false;

if (debug === true) {
	console.debug("Reading keys");
}

let privateKey;
let publicKey;
try {
	privateKey = await fs.readFile(args[0]);
	publicKey = await fs.readFile(args[1]);
} catch (error) {
	console.log("Error occurred reading the keys. See below");
	console.error(error);
	process.exit(1);
}

const content = "I'm a test!";
try {
	const _jwt = jwt.sign(content, privateKey, { algorithm: "PS256" });

	const verify = jwt.verify(_jwt, publicKey, { algorithms: ["PS256"] });
	if (debug) {
		console.debug("JWT:", _jwt);
		console.debug("jwt.verify output:", verify);
	}

	if (typeof verify === "string" && verify === content) {
		console.log("Status: Test success, your keys workwith Folderr version 2");
	}
} catch (error) {
	if (error.message && error.message.includes("must be an asymmetric key")) {
		console.log(
			"Status: Keys failed. They will NOT work with Folderr version 2"
		);
	} else {
		console.error(
			"Something went wrong while verifying your keys, I've included the error below"
		);
		console.error(error);
	}
}
