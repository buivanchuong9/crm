import { urlsApi } from "configs/urls";
import { create } from "lodash";
import { convertParamsToString } from "reborn-util";

export default {
    listOrganizationsPassed: (params: any, signal?: AbortSignal) => {
        return fetch(`${urlsApi.negotiation.listOrganizationsPassed}${convertParamsToString(params)}`, {
            signal,
            method: "GET",
        }).then((res) => res.json());
    },
    saveOrUpdate: (body: any) => {
        return fetch(urlsApi.negotiation.saveOrUpdate, {
            method: "POST",
            body: JSON.stringify(body),
        }).then((res) => res.json());
    },
    detail: (params?: any, signal?: AbortSignal) => {
        return fetch(`${urlsApi.negotiation.detail}${convertParamsToString(params)}`, {
            signal,
            method: "GET",
        }).then((res) => res.json());
    }, 
    createNegotiation: (body: any) => {
        return fetch(urlsApi.negotiation.createNegotiation, {
            method: "POST",
            body: JSON.stringify(body),
        }).then((res) => res.json());
    },
    listByRound: (params: any, signal?: AbortSignal) => {
        // return fetch(`${urlsApi.negotiation.listByRound}${convertParamsToString(params)}`, {
            return fetch(`${urlsApi.negotiation.listByRound}${convertParamsToString(params)}`, {
            signal,
            method: "GET",
        }).then((res) => res.json());
    },
};
