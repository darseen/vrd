#!/usr/bin/env node
import checkCname from "./check-cname.js";
import checkTxt from "./check-txt.js";

async function main() {
  const domain = process.argv[2];

  if (!domain) {
    console.error("Error: Please provide a domain name.");
    console.log("Usage: vrd <domain.com>");
    process.exit(1);
  }

  console.log(`Checking records for: ${domain}`);
  const [cnameResult, txtResult] = await Promise.all([
    checkCname(domain),
    checkTxt(domain),
  ]);

  cnameResult.messages.forEach((message) => console.log(message));
  txtResult.messages.forEach((message) => console.log(message));

  console.log("Done!");
}

main();
