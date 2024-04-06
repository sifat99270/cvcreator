import { SignJWT, jwtVerify } from "jose";

export async function CreateToken(email, id, name) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const payload = { email: email, id: id, name: name };
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer(process.env.JWT_ISSUER)
    .setExpirationTime(new Date(Date.now() + 75 * 60 * 60 * 1000))
    .sign(secret);
  return token;
}
export async function VerifyToken(token) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const data = await jwtVerify(token, secret);
  return data["payload"];
}
