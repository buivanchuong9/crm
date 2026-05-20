import { urlsApi } from "configs/urls";
import { convertParamsToString } from "reborn-util";
import { IJobTitleFilterRequest } from "model/jobTitle/JobTitleRequestModel";

export default {
  list: (params?: IJobTitleFilterRequest, signal?: AbortSignal) => {
    return fetch(`${urlsApi.jobTitle.list}${convertParamsToString(params)}`, {
      signal,
      method: "GET",
    }).then((res) => res.json());
  },
};
