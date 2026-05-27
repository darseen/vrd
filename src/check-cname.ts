import { resolveCname } from "node:dns/promises";
import { isDNSError } from "./utils/index.js";

export default async function checkCname(domain: string) {
  const messages: string[] = [];

  try {
    const cnames = await resolveCname(domain);
    cnames.forEach((cname) => {
      if (cname.includes("up.railway.app")) {
        messages.push(`[SUCCESS] CNAME Record : ${cname}`);
      }
    });
    if (messages.length === 0) throw new Error("CNAME Record not found");
  } catch (error: unknown) {
    if (
      isDNSError(error) &&
      (error.code === "ENODATA" || error.code === "ENOTFOUND")
    ) {
      messages.push(`[INFO] CNAME Record : Not found`);
      messages.push(`[INFO] You need to add a CNAME record at ${domain}.`);
    } else if (error instanceof Error) {
      messages.push(`[ERROR] CNAME Error: ${error.message}`);
    } else {
      messages.push(`[ERROR] CNAME Error: Unknown Error`);
    }
  }

  return { messages };
}
