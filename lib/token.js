import { decode } from "next-auth/jwt";


export async function getToken(params) {
  const { req, secret, raw } = params;

  const { cookies } = req;
  const secureCookie = process.env.NEXTAUTH_URL.startsWith("https://") ? true : false;
  const cookieName = secureCookie ? "__Secure-next-auth.session-token" : "next-auth.session-token"
  const token = cookies[cookieName];

  if (raw) return token;

  return await decode({ token, secret });
}
