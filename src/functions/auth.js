const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

//Client-side check only: the signature can't be verified without a backend,
//so this rejects malformed, expired or wrong-audience tokens, nothing more.
export const isSignedIn = () => {
  try {
    const token = sessionStorage.getItem("user");
    if (!token) return false;
    const payload = JSON.parse(
      atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")),
    );
    const valid =
      payload.aud === CLIENT_ID &&
      /accounts\.google\.com$/.test(payload.iss) &&
      payload.exp * 1000 > Date.now();
    if (!valid) sessionStorage.removeItem("user");
    return valid;
  } catch {
    sessionStorage.removeItem("user");
    return false;
  }
};

export const signIn = (token) => sessionStorage.setItem("user", token);
export const signOut = () => sessionStorage.clear();
