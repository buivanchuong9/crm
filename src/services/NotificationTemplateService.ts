import { urlsApi } from "configs/urls";
import { convertParamsToString } from "reborn-util";

export default {
  list: (params?: any, signal?: AbortSignal) => {
    return fetch(`${urlsApi.notificationTemplate.list}${convertParamsToString(params)}`, {
      signal,
      method: "GET",
    }).then((res) => res.json());
  },
  update: (body: any) => {
    return fetch(urlsApi.notificationTemplate.update, {
      method: "POST",
      body: JSON.stringify(body),
    }).then((res) => res.json());
  },
  detail: (id: number) => {
    return fetch(`${urlsApi.notificationTemplate.detail}?id=${id}`, {
      method: "GET",
    }).then((res) => res.json());
  },
  delete: (id: number) => {
    return fetch(`${urlsApi.notificationTemplate.delete}?id=${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  },

  updateSettingNotify: (body: any) => {
    return fetch(urlsApi.notificationTemplate.updateSettingNotify, {
      method: "POST",
      body: JSON.stringify(body),
    }).then((res) => res.json());
  },

  detailSettingNotify: () => {
    return fetch(`${urlsApi.notificationTemplate.detailSettingNotify}`, {
      method: "GET",
    }).then((res) => res.json());
  },

};
