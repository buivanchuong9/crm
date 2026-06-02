import Cookies from "universal-cookie";
import { getDomain } from "reborn-util";

const cookies = new Cookies();

export const getInfoLogin = () => {
  const takeUserTypeInLocalStorage = localStorage.getItem("user_type");
  return takeUserTypeInLocalStorage || "GPP";
};

export const getPermissions = () => {
  let permissions = localStorage.getItem("permissions");
  if (!permissions) {
    permissions = "{}";
  }

  try {
    const parsed = JSON.parse(permissions);
    if (import.meta.env.VITE_USE_MOCKS === "true") {
      return new Proxy(parsed, {
        get: (target, prop) => {
          if (typeof prop === "string") {
            return 1;
          }
          return Reflect.get(target, prop);
        }
      });
    }
    return parsed;
  } catch (e) {
    return {};
  }
};

export const redirectUrl = (returnUrl: any, targetUrl: any) => {
  targetUrl = targetUrl || "/customer";
  let url = returnUrl || targetUrl;
  if (!url.startsWith("/")) {
    url = "/" + url;
  }
  if (!url.startsWith("/crm/")) {
    url = "/crm" + url;
  }
  location.href = url;
};

export const getRootDomain = (sourceDomain: string) => {
  let parts = sourceDomain?.split(".");
  let rootDomain = sourceDomain;
  if (parts.length > 2) {
    rootDomain = parts[parts.length - 2] + "." + parts[parts.length - 1];
  }
  return rootDomain;
};

export const getAppSSOLink = (rootDomain: string) => {
  if (!rootDomain || rootDomain == "localhost") {
    return "http://localhost:8080";
  }
  if (rootDomain == "tnteco.vn" || rootDomain == "apphub.vn") {
    return `https://crmsso.${rootDomain}`;
  }
  return `https://sso.${rootDomain}`;
};

export const logout = () => {
  localStorage.removeItem("permissions");
  localStorage.removeItem("user.root");
  localStorage.removeItem("SelectedRole");

  if (import.meta.env.VITE_USE_MOCKS === "true") {
    location.href = "/crm/login";
    return;
  }

  let sourceDomain = getDomain(decodeURIComponent(document.location.href));
  let rootDomain = getRootDomain(sourceDomain);

  cookies.remove("token", {
    path: "/",
    domain: rootDomain,
  });

  let sourceUri = encodeURIComponent(location.href);
  let appSSOLink = getAppSSOLink(rootDomain);
  document.location.href = `${appSSOLink}?redirect_uri=${sourceUri}&env=${process.env.APP_ENV}&domain=${rootDomain}`;
};
