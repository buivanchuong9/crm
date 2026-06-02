import { getDomain } from "reborn-util";

const sourceDomain = getDomain(decodeURIComponent(document.location.href));

export { sourceDomain };
export const isBeauty = localStorage.getItem("isBeauty");
export const checkSubdomainTNEX = sourceDomain.includes("tnex");
export const checkSubdomainTNPM = sourceDomain.includes("tnpm") || sourceDomain.includes("localhost");
export const checkSubdomainGREENSPA = sourceDomain.includes("greenspa");
export const checkSubdomainMock =
  sourceDomain.includes("localhost") ||
  sourceDomain.includes("dermajsc") ||
  sourceDomain.includes("kcn") ||
  sourceDomain.includes("jsc");
// "tnex.mock.local"
export const checkUserRoot = localStorage.getItem("user.root") == "1";
