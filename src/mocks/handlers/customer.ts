import { http, HttpResponse } from "msw";
import { buildDetailResponse, buildListResponse } from "./utils";

const mockCustomer = {
  id: 1,
  name: "Mock Customer",
  phone: "0369062042",
  email: "buivanchuong991510@gmail.com",
};

export const customerHandlers = [
  http.get(/\/adminapi\/customer\/list_paid/i, () => {
    return HttpResponse.json(buildListResponse([mockCustomer]));
  }),
  http.get(/\/adminapi\/customer\/list_by_id/i, () => {
    return HttpResponse.json(buildListResponse([mockCustomer]));
  }),
  http.get(/\/adminapi\/customer\/get/i, () => {
    return HttpResponse.json(buildDetailResponse(mockCustomer));
  }),
  http.get(/\/adminapi\/customerScheduler\/list/i, () => {
    return HttpResponse.json(buildListResponse([]));
  }),
];
