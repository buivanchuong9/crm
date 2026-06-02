import { http, HttpResponse } from "msw";
import { buildDetailResponse, buildListResponse, buildOkResponse, parseQueryParams } from "./utils";

export const mockCustomers = [
  {
    id: 1,
    name: "Nguyễn Minh Anh",
    phone: "0901234567",
    email: "minhanh@gmail.com",
    gender: 0,
    birthday: "1990-03-15",
    customerCode: "KH-0001",
    custType: 0,
    address: "12 Trần Hưng Đạo, Hoàn Kiếm, Hà Nội",
    note: "Bệnh nhân nhạy cảm với một số loại hóa chất",
    relationshipId: 2,
    relationshipName: "Khách hàng tiềm năng",
    relationshipColor: "#FFBF00",
    branchId: 1,
    branchName: "Chi nhánh Hà Nội - Trụ sở chính",
    employeeId: 1,
    employeeName: "Bùi Văn Chương",
    createdTime: "2026-01-10T08:00:00Z",
    lstCustomerExtraInfo: [],
    medicalHistory: "Viêm da cơ địa từ nhỏ, không dị ứng thuốc",
    currentDiagnosis: "Nám sâu vùng má",
    skinType: "Da hỗn hợp thiên dầu",
  },
  {
    id: 2,
    name: "Trần Thu Hà",
    phone: "0912345678",
    email: "thuha@gmail.com",
    gender: 0,
    birthday: "1988-07-22",
    customerCode: "KH-0002",
    custType: 0,
    address: "45 Nguyễn Huệ, Quận 1, TP. HCM",
    note: "",
    relationshipId: 3,
    relationshipName: "Đang tư vấn",
    relationshipColor: "#9966CC",
    branchId: 1,
    branchName: "Chi nhánh Hà Nội - Trụ sở chính",
    employeeId: 2,
    employeeName: "Đào văn dương",
    createdTime: "2026-02-05T09:00:00Z",
    lstCustomerExtraInfo: [],
    medicalHistory: "Không có tiền sử bệnh lý",
    currentDiagnosis: "Mụn viêm độ II",
    skinType: "Da dầu",
  },
  {
    id: 3,
    name: "Lê Hoàng Nam",
    phone: "0923456789",
    email: "hoangnam@gmail.com",
    gender: 1,
    birthday: "1985-11-30",
    customerCode: "KH-0003",
    custType: 0,
    address: "78 Lê Lợi, Đà Nẵng",
    note: "Khách hàng VIP, ưu tiên lịch hẹn",
    relationshipId: 4,
    relationshipName: "Đã ký hợp đồng",
    relationshipColor: "#ACE1AF",
    branchId: 1,
    branchName: "Chi nhánh Hà Nội - Trụ sở chính",
    employeeId: 1,
    employeeName: "Bùi Văn Chương",
    createdTime: "2026-03-01T10:00:00Z",
    lstCustomerExtraInfo: [],
    medicalHistory: "Tăng huyết áp, đang dùng thuốc kiểm soát",
    currentDiagnosis: "Sẹo lõm sau mụn",
    skinType: "Da thường",
  },
  {
    id: 4,
    name: "Phạm Gia Hân",
    phone: "0934567890",
    email: "giahan@gmail.com",
    gender: 0,
    birthday: "1995-04-18",
    customerCode: "KH-0004",
    custType: 0,
    address: "23 Bà Triệu, Hà Nội",
    note: "",
    relationshipId: 1,
    relationshipName: "Khách hàng mới",
    relationshipColor: "#007FFF",
    branchId: 1,
    branchName: "Chi nhánh Hà Nội - Trụ sở chính",
    employeeId: 2,
    employeeName: "Đào văn dương",
    createdTime: "2026-05-20T14:00:00Z",
    lstCustomerExtraInfo: [],
    medicalHistory: "",
    currentDiagnosis: "Viêm nang lông",
    skinType: "Da khô",
  },
  {
    id: 5,
    name: "Vũ Đức Long",
    phone: "0945678901",
    email: "duclong@gmail.com",
    gender: 1,
    birthday: "1992-09-05",
    customerCode: "KH-0005",
    custType: 0,
    address: "56 Hai Bà Trưng, Hà Nội",
    note: "Dị ứng nhẹ với retinol",
    relationshipId: 2,
    relationshipName: "Khách hàng tiềm năng",
    relationshipColor: "#FFBF00",
    branchId: 1,
    branchName: "Chi nhánh Hà Nội - Trụ sở chính",
    employeeId: 1,
    employeeName: "Bùi Văn Chương",
    createdTime: "2026-04-15T11:00:00Z",
    lstCustomerExtraInfo: [],
    medicalHistory: "Dị ứng nhẹ với retinol",
    currentDiagnosis: "Thâm nám sau điều trị",
    skinType: "Da hỗn hợp",
  },
];

const mockAppointments = [
  { id: 1, customerId: 1, customerName: "Nguyễn Minh Anh", serviceId: 1, serviceName: "Liệu trình chăm sóc chuyên sâu 5 buổi", employeeId: 1, employeeName: "Bùi Văn Chương", appointmentDate: "2026-06-05T09:00:00Z", status: 1, statusName: "Đã xác nhận", note: "Tái khám lần 2" },
  { id: 2, customerId: 2, customerName: "Trần Thu Hà", serviceId: 2, serviceName: "Trị liệu công nghệ cao HIFU nâng cơ", employeeId: 2, employeeName: "Đào văn dương", appointmentDate: "2026-06-06T10:30:00Z", status: 0, statusName: "Chờ xác nhận", note: "" },
  { id: 3, customerId: 3, customerName: "Lê Hoàng Nam", serviceId: 1, serviceName: "Liệu trình chăm sóc chuyên sâu 5 buổi", employeeId: 1, employeeName: "Bùi Văn Chương", appointmentDate: "2026-06-07T14:00:00Z", status: 2, statusName: "Đã hoàn thành", note: "Khách hài lòng" },
  { id: 4, customerId: 4, customerName: "Phạm Gia Hân", serviceId: 2, serviceName: "Trị liệu công nghệ cao HIFU nâng cơ", employeeId: 2, employeeName: "Đào văn dương", appointmentDate: "2026-06-10T08:00:00Z", status: 1, statusName: "Đã xác nhận", note: "" },
  { id: 5, customerId: 1, customerName: "Nguyễn Minh Anh", serviceId: 2, serviceName: "Trị liệu công nghệ cao HIFU nâng cơ", employeeId: 1, employeeName: "Bùi Văn Chương", appointmentDate: "2026-06-12T09:00:00Z", status: 0, statusName: "Chờ xác nhận", note: "Khám định kỳ tháng 6" },
];

const mockCareAfterVisit = [
  { id: 1, customerId: 1, customerName: "Nguyễn Minh Anh", processId: 1, processName: "Quy trình tiếp nhận - khám ngoại trú", date: "2026-05-25T10:00:00Z", note: "Hướng dẫn chăm sóc da tại nhà, dùng kem dưỡng ẩm 2 lần/ngày", employeeName: "Bùi Văn Chương", status: 1 },
  { id: 2, customerId: 2, customerName: "Trần Thu Hà", processId: 2, processName: "Quy trình điều trị nội trú", date: "2026-05-28T11:00:00Z", note: "Kiêng đồ cay nóng, dầu mỡ. Rửa mặt 2 lần/ngày bằng sữa rửa mặt dịu nhẹ", employeeName: "Đào văn dương", status: 1 },
  { id: 3, customerId: 3, customerName: "Lê Hoàng Nam", processId: 5, processName: "Quy trình chăm sóc sau điều trị", date: "2026-05-30T09:00:00Z", note: "Theo dõi vết điều trị laser, tránh tiếp xúc trực tiếp ánh nắng", employeeName: "Bùi Văn Chương", status: 2 },
];

let nextCustomerId = 100;

export const customerHandlers = [
  // List customers
  http.get(/\/adminapi\/customer\/list/i, ({ request }) => {
    const params = parseQueryParams(request);
    return HttpResponse.json(buildListResponse(mockCustomers, params));
  }),

  // List paid customers (for BPM processed objects)
  http.get(/\/adminapi\/customer\/list_paid/i, ({ request }) => {
    const params = parseQueryParams(request);
    return HttpResponse.json(buildListResponse(mockCustomers, params));
  }),

  // List customers by ids
  http.get(/\/adminapi\/customer\/list_by_id/i, ({ request }) => {
    const params = parseQueryParams(request);
    return HttpResponse.json(buildListResponse(mockCustomers, params));
  }),

  // Get customer detail
  http.get(/\/adminapi\/customer\/get/i, ({ request }) => {
    const params = parseQueryParams(request);
    const id = Number(params.id) || 1;
    const customer = mockCustomers.find((c) => c.id === id) || mockCustomers[0];
    return HttpResponse.json(buildDetailResponse(customer));
  }),

  // Create / update customer
  http.post(/\/adminapi\/customer\/update/i, async ({ request }) => {
    const body = (await request.json().catch(() => ({}))) as any;
    const id = Number(body?.id) || 0;
    if (id > 0) {
      const idx = mockCustomers.findIndex((c) => c.id === id);
      if (idx >= 0) {
        mockCustomers[idx] = { ...mockCustomers[idx], ...body };
      }
      return HttpResponse.json(buildOkResponse({ id }));
    }
    const newId = ++nextCustomerId;
    mockCustomers.push({ ...mockCustomers[0], ...body, id: newId, customerCode: `KH-${String(newId).padStart(4, "0")}` });
    return HttpResponse.json(buildOkResponse({ id: newId }));
  }),

  // Delete customer
  http.delete(/\/adminapi\/customer\/delete/i, ({ request }) => {
    const params = parseQueryParams(request);
    const id = Number(params.id);
    const idx = mockCustomers.findIndex((c) => c.id === id);
    if (idx >= 0) mockCustomers.splice(idx, 1);
    return HttpResponse.json(buildOkResponse({ id, deleted: true }));
  }),

  // Appointments / scheduler
  http.get(/\/adminapi\/customerScheduler\/list/i, ({ request }) => {
    const params = parseQueryParams(request);
    const customerId = Number(params.customerId);
    const filtered = customerId ? mockAppointments.filter((a) => a.customerId === customerId) : mockAppointments;
    return HttpResponse.json(buildListResponse(filtered, params));
  }),

  http.post(/\/adminapi\/customerScheduler\/update/i, async ({ request }) => {
    const body = (await request.json().catch(() => ({}))) as any;
    return HttpResponse.json(buildOkResponse({ id: body?.id || Math.floor(Math.random() * 1000) + 100 }));
  }),

  // Care after visit
  http.get(/\/adminapi\/careAfterVisit\/list/i, ({ request }) => {
    const params = parseQueryParams(request);
    const customerId = Number(params.customerId);
    const filtered = customerId ? mockCareAfterVisit.filter((c) => c.customerId === customerId) : mockCareAfterVisit;
    return HttpResponse.json(buildListResponse(filtered, params));
  }),

  http.post(/\/adminapi\/careAfterVisit\/update/i, async ({ request }) => {
    const body = (await request.json().catch(() => ({}))) as any;
    return HttpResponse.json(buildOkResponse({ id: body?.id || Math.floor(Math.random() * 1000) + 200 }));
  }),

  // Customer medical records
  http.get(/\/adminapi\/customer\/medical_record/i, ({ request }) => {
    const params = parseQueryParams(request);
    const id = Number(params.customerId || params.id) || 1;
    const customer = mockCustomers.find((c) => c.id === id) || mockCustomers[0];
    return HttpResponse.json(
      buildDetailResponse({
        customerId: customer.id,
        customerName: customer.name,
        medicalHistory: customer.medicalHistory,
        currentDiagnosis: customer.currentDiagnosis,
        skinType: customer.skinType,
        treatmentHistory: [
          { date: "2026-04-10", treatment: "Laser Fractional CO2", result: "Cải thiện 60%", doctor: "Bùi Văn Chương" },
          { date: "2026-05-01", treatment: "Peel da tế bào chết", result: "Tốt", doctor: "Đào văn dương" },
        ],
      })
    );
  }),
];
