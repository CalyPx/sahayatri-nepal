import crypto from "crypto";

const isProd = process.env.ESEWA_ENV === "production";

export const ESEWA_FORM_URL = isProd
  ? "https://epay.esewa.com.np/api/epay/main/v2/form"
  : "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

const ESEWA_STATUS_URL = isProd
  ? "https://epay.esewa.com.np/api/epay/transaction/status/"
  : "https://rc.esewa.com.np/api/epay/transaction/status/";

function sign(message: string): string {
  const secretKey = process.env.ESEWA_SECRET_KEY!;
  return crypto.createHmac("sha256", secretKey).update(message).digest("base64");
}

export interface EsewaFormFields {
  amount: string;
  tax_amount: string;
  total_amount: string;
  transaction_uuid: string;
  product_code: string;
  product_service_charge: string;
  product_delivery_charge: string;
  success_url: string;
  failure_url: string;
  signed_field_names: string;
  signature: string;
}

/** Builds the signed field set eSewa's v2 /form endpoint expects, auto-submitted client-side. */
export function buildEsewaFormFields(params: {
  amount: number;
  transactionUuid: string;
  successUrl: string;
  failureUrl: string;
}): EsewaFormFields {
  const productCode = process.env.ESEWA_MERCHANT_CODE!;
  const signedFieldNames = "total_amount,transaction_uuid,product_code";
  const message = `total_amount=${params.amount},transaction_uuid=${params.transactionUuid},product_code=${productCode}`;

  return {
    amount: String(params.amount),
    tax_amount: "0",
    total_amount: String(params.amount),
    transaction_uuid: params.transactionUuid,
    product_code: productCode,
    product_service_charge: "0",
    product_delivery_charge: "0",
    success_url: params.successUrl,
    failure_url: params.failureUrl,
    signed_field_names: signedFieldNames,
    signature: sign(message),
  };
}

export interface EsewaCallbackPayload {
  transaction_code: string;
  status: string;
  total_amount: string;
  transaction_uuid: string;
  product_code: string;
  signed_field_names: string;
  signature: string;
  [key: string]: string;
}

/** eSewa redirects back with a base64-encoded `data` query param containing this JSON. */
export function decodeEsewaCallback(data: string): EsewaCallbackPayload {
  return JSON.parse(Buffer.from(data, "base64").toString("utf-8"));
}

export function verifyEsewaSignature(payload: EsewaCallbackPayload): boolean {
  const fields = payload.signed_field_names.split(",");
  const message = fields.map((f) => `${f}=${payload[f]}`).join(",");
  return sign(message) === payload.signature;
}

/** Authoritative check — always confirm via this API rather than trusting the redirect alone. */
export async function checkEsewaStatus(params: {
  totalAmount: number;
  transactionUuid: string;
}): Promise<{ status: string; [key: string]: unknown }> {
  const productCode = process.env.ESEWA_MERCHANT_CODE!;
  const url = new URL(ESEWA_STATUS_URL);
  url.searchParams.set("product_code", productCode);
  url.searchParams.set("total_amount", String(params.totalAmount));
  url.searchParams.set("transaction_uuid", params.transactionUuid);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`eSewa status check failed: ${res.status}`);
  return res.json();
}
