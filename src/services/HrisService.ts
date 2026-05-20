import { urlsApi } from "configs/urls";

export default {
    syncEmployee: (date: string) => {
        return fetch(`${urlsApi.hris.syncEmployee}?from=${date}`, {
          method: "POST",
        }).then((res) => res.json());
    },

    getSyncHistory: (body: any, signal?: AbortSignal) => {
        return fetch(urlsApi.hris.getSyncHistory, {
          method: "POST",
          body: JSON.stringify(body),
        }).then((res) => res.json());
      },

    updateScheduleConfig: (body: any) => {
        return fetch(urlsApi.hris.updateScheduleConfig, {
          method: "POST",
          body: JSON.stringify(body),
        }).then((res) => res.json());
      },

    getScheduleConfig: () => {
        return fetch(`${urlsApi.hris.getScheduleConfig}`, {
          method: "GET",
        }).then((res) => res.json());
    },
};
