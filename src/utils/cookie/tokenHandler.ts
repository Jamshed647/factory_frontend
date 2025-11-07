import Cookies from "js-cookie";

export const COOKIE_NAMES = {
  TOKEN: "token",
} as const;

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  role: string;
}

/* Save tokens in cookie (as JSON) */
export const setToken = (tokens: AuthTokens) => {
  Cookies.set(COOKIE_NAMES.TOKEN, JSON.stringify(tokens), {
    expires: 7, // expires in 7 days
  });
};

/* Get token object from cookie */
export const getToken = (): AuthTokens | null => {
  const cookie = Cookies.get(COOKIE_NAMES.TOKEN);
  if (!cookie) return null;

  try {
    return JSON.parse(cookie) as AuthTokens;
  } catch {
    clearToken(); // invalid cookie, clear it
    return null;
  }
};

/* Get only access token */
export const getAccessToken = (): string | null => {
  const tokens = getToken();
  return tokens?.accessToken ?? null;
};

export const getRole = (): string | null => {
  const tokens = getToken();
  return tokens?.role ?? null;
};

/* Get only refresh token */
export const getRefreshToken = (): string | null => {
  const tokens = getToken();
  return tokens?.refreshToken ?? null;
};

/* Clear cookie */
export const clearToken = () => {
  Cookies.remove(COOKIE_NAMES.TOKEN);
};
