import {createHmac, timingSafeEqual, randomBytes} from "node:crypto";
import {cookies} from "next/headers";

const COOKIE_NAME = "__console_session";
const SESSION_TTL = 8 * 60 * 60; // 8 hours in seconds

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set");
  return secret;
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

export function createSessionToken(): string {
  const payload = JSON.stringify({
    sub: "admin",
    jti: randomBytes(8).toString("hex"),
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL,
  });
  const b64 = Buffer.from(payload).toString("base64url");
  const sig = sign(b64);
  return `${b64}.${sig}`;
}

export function verifySessionToken(token: string): boolean {
  const [b64, sig] = token.split(".");
  if (!b64 || !sig) return false;

  const expected = sign(b64);
  const sigBuf = Buffer.from(sig, "base64url");
  const expectedBuf = Buffer.from(expected, "base64url");
  if (sigBuf.length !== expectedBuf.length) return false;
  if (!timingSafeEqual(sigBuf, expectedBuf)) return false;

  try {
    const payload = JSON.parse(Buffer.from(b64, "base64url").toString());
    if (typeof payload.exp !== "number") return false;
    return payload.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/console",
    maxAge: SESSION_TTL,
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    path: "/console",
    maxAge: 0,
  });
}

export async function getSession(): Promise<{authenticated: boolean}> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return {authenticated: false};
  return {authenticated: verifySessionToken(token)};
}

export function verifyCredentials(username: string, password: string): boolean {
  const expectedUser = process.env.ADMIN_USERNAME ?? "";
  const expectedPass = process.env.ADMIN_PASSWORD ?? "";
  if (!expectedUser || !expectedPass) return false;

  const userHash = createHmac("sha256", "u").update(username).digest();
  const expectedUserHash = createHmac("sha256", "u").update(expectedUser).digest();
  const passHash = createHmac("sha256", "p").update(password).digest();
  const expectedPassHash = createHmac("sha256", "p").update(expectedPass).digest();

  return (
    timingSafeEqual(userHash, expectedUserHash) &&
    timingSafeEqual(passHash, expectedPassHash)
  );
}
