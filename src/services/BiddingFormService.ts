import { urlsApi } from "configs/urls";
import { convertParamsToString } from "reborn-util";

export default {
  list: (params: any, signal?: AbortSignal) => {
    return fetch(`${urlsApi.biddingForm.list}${convertParamsToString(params)}`, {
      signal,
      method: "GET",
    }).then((res) => res.json());
  },
  update: (body: any) => {
    return fetch(urlsApi.biddingForm.update, {
      method: "POST",
      body: JSON.stringify(body),
    }).then((res) => res.json());
  },
  delete: (id: number) => {
    return fetch(`${urlsApi.biddingForm.delete}?id=${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  },
  detail: (id: number) => {
    return fetch(`${urlsApi.biddingForm.detail}?id=${id}`, {
      method: "GET",
    }).then((res) => res.json());
  },

  getGrid: (params: any, signal?: AbortSignal) => {
    return fetch(`${urlsApi.biddingForm.getGrid}${convertParamsToString(params)}`, {
      signal,
      method: "GET",
    }).then((res) => res.json());
  },
};
