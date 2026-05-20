import { urlsApi } from "configs/urls";
import { convertParamsToString } from "reborn-util";

export default {
  listWorkDay: (params?: any, signal?: AbortSignal) => {
    return fetch(`${urlsApi.workTime.listWorkDay}${convertParamsToString(params)}`, {
      signal,
      method: "GET",
    }).then((res) => res.json());
  },
  updateWorkDay: (body: any) => {
    return fetch(urlsApi.workTime.updateWorkDay, {
      method: "POST",
      body: JSON.stringify(body),
    }).then((res) => res.json());
  },
  detailWorkDay: (id: number) => {
    return fetch(`${urlsApi.workTime.detailWorkDay}?id=${id}`, {
      method: "GET",
    }).then((res) => res.json());
  },
  deleteWorkDay: (id: number) => {
    return fetch(`${urlsApi.workTime.deleteWorkDay}?id=${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  },


  //ca làm việc
  listShift: (params?: any, signal?: AbortSignal) => {
    return fetch(`${urlsApi.workTime.listShift}${convertParamsToString(params)}`, {
      signal,
      method: "GET",
    }).then((res) => res.json());
  },
  updateShift: (body: any) => {
    return fetch(urlsApi.workTime.updateShift, {
      method: "POST",
      body: JSON.stringify(body),
    }).then((res) => res.json());
  },
  updateShiftActive: (body: any) => {
    return fetch(urlsApi.workTime.updateShiftActive, {
      method: "POST",
      body: JSON.stringify(body),
    }).then((res) => res.json());
  },
  detailShift: (id: number) => {
    return fetch(`${urlsApi.workTime.detailShift}?id=${id}`, {
      method: "GET",
    }).then((res) => res.json());
  },
  deleteShift: (id: number) => {
    return fetch(`${urlsApi.workTime.deleteShift}?id=${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  },

  //Ngày nghỉ lễ
  listHoliday: (params?: any, signal?: AbortSignal) => {
    return fetch(`${urlsApi.workTime.listHoliday}${convertParamsToString(params)}`, {
      signal,
      method: "GET",
    }).then((res) => res.json());
  },
  updateHoliday: (body: any) => {
    return fetch(urlsApi.workTime.updateHoliday, {
      method: "POST",
      body: JSON.stringify(body),
    }).then((res) => res.json());
  },
  detailHoliday: (id: number) => {
    return fetch(`${urlsApi.workTime.detailHoliday}?id=${id}`, {
      method: "GET",
    }).then((res) => res.json());
  },
  deleteHoliday: (id: number) => {
    return fetch(`${urlsApi.workTime.deleteHoliday}?id=${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  },

  //Ca làm việc của nhân viên
  listEmployeeShift: (params?: any, signal?: AbortSignal) => {
    return fetch(`${urlsApi.workTime.listEmployeeShift}${convertParamsToString(params)}`, {
      signal,
      method: "GET",
    }).then((res) => res.json());
  },
  updateEmployeeShift: (body: any) => {
    return fetch(urlsApi.workTime.updateEmployeeShift, {
      method: "POST",
      body: JSON.stringify(body),
    }).then((res) => res.json());
  },
  detailEmployeeShift: (id?: number) => {
    return fetch(`${urlsApi.workTime.detailEmployeeShift}`, {
      method: "GET",
    }).then((res) => res.json());
  },
  deleteEmployeeShift: (id: number) => {
    return fetch(`${urlsApi.workTime.deleteEmployeeShift}?id=${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  },
};
