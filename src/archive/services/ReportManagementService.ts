import { urlsApi } from "configs/urls";
import { convertParamsToString } from "reborn-util";
import { IReportStatusFilterRequest } from "model/reportStatus/ReportStatusRequestModel";

export default {
  // báo cáo trạng thái hồ sơ
  listReportStatus: (params: IReportStatusFilterRequest, signal?: AbortSignal) => {
    return fetch(`${urlsApi.ReportManagement.listReportStatus}${convertParamsToString(params)}`, {
      signal,
      method: "GET",
    }).then((res) => res.json());
  },

  // báo cáo thời gian xử lý từng bước
  listProcessingTime: (params: IReportStatusFilterRequest, signal?: AbortSignal) => {
    return fetch(`${urlsApi.ReportManagement.listProcessingTime}${convertParamsToString(params)}`, {
      signal,
      method: "GET",
    }).then((res) => res.json());
  },
  listProcessingTimeGantt: (params: IReportStatusFilterRequest, signal?: AbortSignal) => {
    return fetch(`${urlsApi.ReportManagement.listProcessingTimeGantt}${convertParamsToString(params)}`, {
      signal,
      method: "GET",
    }).then((res) => res.json());
  },
  listProcessingTimePot: (params: IReportStatusFilterRequest, signal?: AbortSignal) => {
    return fetch(`${urlsApi.ReportManagement.listProcessingTimePot}${convertParamsToString(params)}`, {
      signal,
      method: "GET",
    }).then((res) => res.json());
  },
};
