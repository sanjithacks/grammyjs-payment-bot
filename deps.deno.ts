export * from "https://deno.land/x/grammy@v1.11.2/mod.ts";
export * from "https://deno.land/x/grammy_conversations@v1.0.3/mod.ts";
//export { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
export {
  MongoClient,
  ObjectId,
} from "https://deno.land/x/mongo@v0.31.1/mod.ts";

export async function SHA256(message: string) {
  const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  return hashHex;
}
