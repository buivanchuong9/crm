import { urlsApi } from "configs/urls";
import { convertParamsToString } from "reborn-util";

export default {
  list: (params?: any, signal?: AbortSignal) => {
    return fetch(`${urlsApi.procurementType.list}${convertParamsToString(params)}`, {
      signal,
      method: "GET",
    }).then((res) => res.json());
  },
  update: (body: any) => {
    return fetch(urlsApi.procurementType.update, {
      method: "POST",
      body: JSON.stringify(body),
    }).then((res) => res.json());
  },
  updateActive: (body: any) => {
    return fetch(urlsApi.procurementType.updateStatus, {
      method: "POST",
      body: JSON.stringify(body),
    }).then((res) => res.json());
  },
  detail: (id: number) => {
    return fetch(`${urlsApi.procurementType.detail}?id=${id}`, {
      method: "GET",
    }).then((res) => res.json());
  },
  delete: (id: number) => {
    return fetch(`${urlsApi.procurementType.delete}?id=${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  },

  importFile: (body: any) => {
    return fetch(urlsApi.procurementType.importFile, {
      method: "POST",
      body: JSON.stringify(body),
    }).then((res) => res.json());
  },

  listProcurementGroup: (params?: any, signal?: AbortSignal) => {
    return fetch(`${urlsApi.procurementType.listProcurementGroup}${convertParamsToString(params)}`, {
      signal,
      method: "GET",
    }).then((res) => res.json());
  },
};
