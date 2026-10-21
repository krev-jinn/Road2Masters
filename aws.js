// aws.js — Lightweight client for API Gateway & Cognito (Zero SDK dependencies)
import { AWS_CONFIG as C } from "./aws-config.js";

const IDP = `https://cognito-idp.${C.region}.amazonaws.com/`;
const KEY = "r2m_auth";
export const isAwsEnabled = !!C.apiBase;

async function idp(target, body) {
  if (!C.userPoolClientId) return null;
  const r = await fetch(IDP, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-amz-json-1.1",
      "X-Amz-Target": "AWSCognitoIdentityProviderService." + target
    },
    body: JSON.stringify({ ClientId: C.userPoolClientId, ...body })
  });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) {
    const e = new Error(d.message || "Cognito request failed");
    e.code = (d.__type || "").split("#").pop();
    throw e;
  }
  return d;
}

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(decodeURIComponent(escape(window.atob(base64))));
  } catch {
    return null;
  }
}

function saveSession(r, oldRefresh) {
  const claims = parseJwt(r.IdToken);
  const session = {
    idToken: r.IdToken,
    refreshToken: r.RefreshToken || oldRefresh,
    exp: claims ? claims.exp * 1000 : Date.now() + 3600000,
    claims
  };
  localStorage.setItem(KEY, JSON.stringify(session));
  return session;
}

export async function getSession() {
  let a;
  try { a = JSON.parse(localStorage.getItem(KEY)); } catch {}
  if (!a) return null;
  if (a.exp > Date.now() + 60000) return a;
  if (a.refreshToken && C.userPoolClientId) {
    try {
      const d = await idp("InitiateAuth", {
        AuthFlow: "REFRESH_TOKEN_AUTH",
        AuthParameters: { REFRESH_TOKEN: a.refreshToken }
      });
      return saveSession(d.AuthenticationResult, a.refreshToken);
    } catch {
      localStorage.removeItem(KEY);
      return null;
    }
  }
  return a;
}

export async function api(method, path, body) {
  if (!C.apiBase) {
    throw new Error("AWS apiBase is not configured.");
  }
  const headers = { "Content-Type": "application/json" };
  const session = await getSession();
  if (session && session.idToken) {
    headers["Authorization"] = session.idToken;
  }

  const cleanBase = C.apiBase.replace(/\/+$/, "");
  const cleanPath = path.startsWith("/") ? path : "/" + path;

  const res = await fetch(cleanBase + cleanPath, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || data.message || `Request failed with status ${res.status}`);
  }
  return data;
}
