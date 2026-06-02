import { urlsApi } from "configs/urls";
import { convertParamsToString } from "reborn-util";

export default {
  listSegmentMapping: (params: any, signal?: AbortSignal) => {
    return fetch(`${urlsApi.segmentFilter.listMapping}${convertParamsToString(params)}`, {
      signal,
      method: "GET",
    }).then((res) => res.json());
  },

  updateSegmentMapping: (body: any) => {
    return fetch(urlsApi.segmentFilter.updateMapping, {
      method: "POST",
      body: JSON.stringify(body),
    }).then((res) => res.json());
  },

  deleteSegmentMapping: (id: number | string) => {
    return fetch(`${urlsApi.segmentFilter.deleteMapping}?id=${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  },

  updateSegment: (body: any) => {
    return fetch(urlsApi.segmentFilter.update, {
      method: "POST",
      body: JSON.stringify(body),
    }).then((res) => res.json());
  },
};
