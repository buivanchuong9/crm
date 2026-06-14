import { urlsApi } from "configs/urls";
import { convertParamsToString } from "reborn-util";
import { IProfileStatusFilterRequest, IProfileStatusRequest, IProcedureFilterRequest } from "model/profileStatus/ProfileStatusRequestModel";

export default {
  list: (params: IProfileStatusFilterRequest, signal?: AbortSignal) => {
    return fetch(`${urlsApi.profileStatus.list}${convertParamsToString(params)}`, {
      signal,
      method: "GET",
    }).then((res) => res.json());
  },
  update: (body: IProfileStatusRequest) => {
    return fetch(urlsApi.profileStatus.update, {
      method: "POST",
      body: JSON.stringify(body),
    }).then((res) => res.json());
  },
  delete: (id: number) => {
    return fetch(`${urlsApi.profileStatus.delete}?id=${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  },
  detail: (id?: number, code?: string) => {
    if (id) {
      return fetch(`${urlsApi.profileStatus.detail}?id=${id}`, {
        method: "GET",
      }).then((res) => res.json());
    } else {
      return fetch(`${urlsApi.profileStatus.detail}?code=${code}`, {
        method: "GET",
      }).then((res) => res.json());
    }
  },
  listProcedure: (params: IProcedureFilterRequest, signal?: AbortSignal) => {
    return fetch(`${urlsApi.profileStatus.listProcedure}${convertParamsToString(params)}`, {
      signal,
      method: "GET",
    }).then((res) => res.json());
  },
};
