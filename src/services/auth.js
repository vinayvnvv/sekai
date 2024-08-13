import * as jose from "jose";
const _KEY = "_TOKEN";
const _KEY_USER = "_USER";
const alg = "HS256";
export const _SECRET = "!!@secretsekaiholidays&*(23i923HKHk~~1212320";

const secret = new TextEncoder().encode(_SECRET);

export const saveAuth = async (username, callback) => {
  const token = await new jose.SignJWT({ "urn:example:claim": true })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer("urn:example:issuer")
    .setAudience("urn:example:audience")
    .setExpirationTime("3d")
    .sign(secret);
  localStorage.setItem(_KEY_USER, username);
  localStorage.setItem(_KEY, token);
  if (callback) callback();
};
export const getUser = () => {
  return localStorage.getItem(_KEY_USER);
};
export const getAuth = () => {
  return localStorage.getItem(_KEY);
};
export const removeAuth = () => {
  localStorage.removeItem(_KEY_USER);
  localStorage.removeItem(_KEY);
};
export const verifyAuth = async (callback) => {
  const token = getAuth();
  console.log("token", token);
  try {
    await jose.jwtVerify(token, secret, {
      issuer: "urn:example:issuer",
      audience: "urn:example:audience",
    });
    if (callback) callback(false);
  } catch (err) {
    removeAuth();
    if (callback) callback(true);
  }
};
