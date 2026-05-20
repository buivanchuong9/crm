import { urlsApi } from "configs/urls";
import { convertParamsToString } from "reborn-util";

export default {
  list: (params?: any, signal?: AbortSignal) => {
    return fetch(`${urlsApi.supplierAccount.list}${convertParamsToString(params)}`, {
      signal,
      method: "GET",
    }).then((res) => res.json());
  },
  update: (body: any) => {
    return fetch(urlsApi.supplierAccount.update, {
      method: "POST",
      body: JSON.stringify(body),
    }).then((res) => res.json());
  },
  updateActive: (body: any) => {
    return fetch(urlsApi.supplierAccount.updateActive, {
      method: "POST",
      body: JSON.stringify(body),
    }).then((res) => res.json());
  },

  resetPass: (body: any) => {
    return fetch(urlsApi.supplierAccount.resetPass, {
      method: "POST",
      body: JSON.stringify(body),
    }).then((res) => res.json());
  },
  detail: (id: number) => {
    return fetch(`${urlsApi.supplierAccount.detail}?id=${id}`, {
      method: "GET",
    }).then((res) => res.json());
  },
  delete: (id: number) => {
    return fetch(`${urlsApi.supplierAccount.delete}?id=${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  },

};
