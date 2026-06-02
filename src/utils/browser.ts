const transformToAssocArray = (prmstr: string) => {
  const params = {};
  const prmarr = prmstr.split("&");
  for (let i = 0; i < prmarr.length; i++) {
    const tmparr = prmarr[i].split("=");
    params[tmparr[0]] = tmparr[1];
  }
  return params;
};

export const getSearchParameters = () => {
  const prmstr = window.location.search.substr(1);
  return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
};
