import { http, HttpResponse } from "msw";
import { buildDetailResponse, buildListResponse } from "./utils";

const employeeInfo = {
  id: 1,
  name: "Mock User",
  email: "buivanchuong991510@gmail.com",
  lstOrgApp: [{}],
};

export const employeeHandlers = [
  http.get(/\/adminapi\/employee\/info/i, () => {
    return HttpResponse.json(buildDetailResponse(employeeInfo));
  }),
  http.get(/\/adminapi\/employee\/roles/i, () => {
    return HttpResponse.json(
      buildDetailResponse([
        {
          id: 1,
          departmentId: 1,
          title: "Mock Role",
          departmentName: "Mock Department",
        },
      ])
    );
  }),
  http.get(/\/adminapi\/employee\/list/i, () => {
    return HttpResponse.json(buildListResponse([employeeInfo]));
  }),
];
