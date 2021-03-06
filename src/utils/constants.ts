export const __dev__ = process.env.NODE_ENV === "development";
export const __isServer__ = typeof window === "undefined";

export const OAUTH_API = `https://dribbble.com/oauth/authorize?client_id=${
  __isServer__
    ? process.env.DRIBBBLE_CLIENT_ID
    : process.env.NEXT_PUBLIC_CLIENT_ID
}`;
export const ACCESS_TOKEN_API = `https://dribbble.com/oauth/token?client_id=${process.env.DRIBBBLE_CLIENT_ID}&client_secret=${process.env.DRIBBBLE_CLIENT_SECRET}&code=`;
export const USER_API = `https://api.dribbble.com/v2/user`;
export const SHOTS_API = `https://api.dribbble.com/v2/user/shots`;
