import { http, HttpResponse } from "msw";
import { buildDetailResponse, buildListResponse } from "./utils";

const employeeInfo = {
  id: 1,
  name: "Bùi Văn Chương",
  email: "buivanchuong991510@gmail.com",
  phone: "0369062042",
  lstOrgApp: [{}],
};

const employeeList = [
  employeeInfo,
  {
    id: 2,
    name: "Đào văn dương",
    email: "daovanduong.mock@gmail.com",
    phone: "0369062042",
    lstOrgApp: [{}],
  },
];

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
    return HttpResponse.json(buildListResponse(employeeList));
  }),
];
