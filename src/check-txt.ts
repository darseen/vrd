import { resolveTxt } from "node:dns/promises";
import { isDNSError } from "./utils/index.js";

export default async function checkTxt(domain: string) {
  const railwayDomain = `_railway-verify.${domain}`;
  const messages: string[] = [];
  try {
    const txtRecords = await resolveTxt(railwayDomain);
    const formattedTxt = txtRecords.map((chunk) => chunk.join("")).join(", ");
    messages.push(
      `[SUCCESS] TXT Record: ${formattedTxt} (at ${railwayDomain})`,
    );
  } catch (error: unknown) {
    if (
      isDNSError(error) &&
      (error.code === "ENODATA" || error.code === "ENOTFOUND")
    ) {
      messages.push(`[INFO] TXT Record: Not found (at ${railwayDomain})`);

      messages.push(
        `[INFO] You need to add a TXT record at _railway-verify.${domain}.`,
      );
      messages.push(
        "[INFO] If you are using the API to add your custom domain, you can find it in verificationStatus under status",
      );
    } else if (error instanceof Error) {
      messages.push(`[Error] TXT Error: ${error.message}`);
    } else {
      messages.push(`[Error] TXT Error: Unknown Error`);
    }
  }

  return { messages };
}
