import { signOut } from "./api-auth";
const authenticate = (jwt, cb) => {
  if (typeof window !== "undefined")
    sessionStorage.setItem("jwt", JSON.stringify(jwt));
  cb();
};

const isAuthenticated = () => {
  if (typeof window === "undefined") return false;

  if (sessionStorage.getItem("jwt"))
    return JSON.parse(sessionStorage.getItem("jwt"));
  else return false;
};

const signout = cb => {
  if (typeof window === "undefined") sessionStorage.removeItem("jwt");
  cb();
  signOut().then(data => {
    if (data.error) {
      cb();
    } else
      document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  });
};

export default {
  authenticate,
  isAuthenticated,
  signout
};
