import CookieService from "./CookieService";

const isAdmin = () => {
  const role = CookieService.get("role");
  if (!role) return false;

  return role === "admin";
};

export default isAdmin;
