import { http, HttpResponse } from "msw";
import { buildCountResponse, buildDetailResponse, buildListResponse, buildOkResponse, getRequestInfo } from "./utils";

const internalApiRegex = /\/(adminapi|api|authenticator|notification|bpmapi|sale|system|cs|application|hr)\//i;

export const commonHandlers = [
  http.all(internalApiRegex, ({ request }) => {
    const { method, pathname } = getRequestInfo(request);

    const isList =
      pathname.includes("/list") ||
      pathname.includes("/filter") ||
      pathname.includes("/search") ||
      pathname.includes("/select");
    const isCount = pathname.includes("/count") || pathname.includes("/total");
    const isDetail =
      pathname.includes("/detail") ||
      pathname.includes("/get") ||
      pathname.includes("/info") ||
      pathname.includes("/profile") ||
      pathname.includes("/me");

    // Dynamic Vietnamese Mock Data for each feature
    let mockList: any[] = [];
    if (pathname.includes("beautybranch")) {
      mockList = [
        { id: 1, name: "Chi nhánh Hà Nội - Trụ sở chính", headquarter: 1, code: "HN01" },
        { id: 2, name: "Chi nhánh TP. Hồ Chí Minh", headquarter: 0, code: "HCM01" }
      ];
    } else if (pathname.includes("relationship")) {
      mockList = [
        { id: 1, name: "Khách hàng mới", color: "#007FFF", colorText: "#FFFFFF", position: 1 },
        { id: 2, name: "Khách hàng tiềm năng", color: "#FFBF00", colorText: "#000000", position: 2 },
        { id: 3, name: "Đang tư vấn", color: "#9966CC", colorText: "#FFFFFF", position: 3 },
        { id: 4, name: "Đã ký hợp đồng", color: "#ACE1AF", colorText: "#000000", position: 4 }
      ];
    } else if (pathname.includes("customer")) {
      mockList = [
        {
          id: 1,
          name: "Nguyễn Văn Anh",
          phone: "0369062042",
          email: "buivanchuong991510@gmail.com",
          gender: 1,
          customerCode: "KH001",
          custType: 0,
          lstCustomerExtraInfo: [],
          relationshipName: "Khách hàng tiềm năng",
          relationshipColor: "#FFBF00"
        },
        {
          id: 2,
          name: "Trần Thị Bình",
          phone: "0369062042",
          email: "buivanchuong991510@gmail.com",
          gender: 0,
          customerCode: "KH002",
          custType: 0,
          lstCustomerExtraInfo: [],
          relationshipName: "Đang tư vấn",
          relationshipColor: "#9966CC"
        },
        {
          id: 3,
          name: "Công ty Cổ phần Bùi Văn Chương",
          phone: "0369062042",
          email: "buivanchuong991510@gmail.com",
          gender: 1,
          customerCode: "KHDN003",
          custType: 1,
          lstCustomerExtraInfo: [],
          relationshipName: "Đã ký hợp đồng",
          relationshipColor: "#ACE1AF"
        },
        {
          id: 4,
          name: "Lê Hoàng Nam",
          phone: "0369062042",
          email: "buivanchuong991510@gmail.com",
          gender: 1,
          customerCode: "KH004",
          custType: 0,
          lstCustomerExtraInfo: [],
          relationshipName: "Khách hàng mới",
          relationshipColor: "#007FFF"
        },
        {
          id: 5,
          name: "Phạm Minh Thư",
          phone: "0369062042",
          email: "buivanchuong991510@gmail.com",
          gender: 0,
          customerCode: "KH005",
          custType: 0,
          lstCustomerExtraInfo: [],
          relationshipName: "Khách hàng tiềm năng",
          relationshipColor: "#FFBF00"
        }
      ];
    } else if (pathname.includes("opportunity")) {
      mockList = [
        {
          id: 1,
          productName: "Gói Chăm Sóc Da Toàn Diện",
          customerName: "Nguyễn Văn Anh",
          contactName: "Nguyễn Văn Anh",
          name: "Cơ hội Gói Chăm Sóc Da",
          status: 1
        },
        {
          id: 2,
          serviceName: "Liệu Trình Trẻ Hóa Công Nghệ Cao",
          customerName: "Trần Thị Bình",
          contactName: "Trần Thị Bình",
          name: "Cơ hội Liệu Trình Trẻ Hóa",
          status: 1
        },
        {
          id: 3,
          productName: "Sản phẩm Dưỡng Ẩm Đặc Trị Bùi Văn Chương",
          customerName: "Lê Hoàng Nam",
          contactName: "Lê Hoàng Nam",
          name: "Cơ hội Sản phẩm Dưỡng Ẩm",
          status: 2
        }
      ];
    } else if (pathname.includes("workproject")) {
      mockList = [
        { id: 1, name: "Chiến dịch Thu Đông 2026", status: 1, createdTime: "2026-05-19T00:00:00Z" },
        { id: 2, name: "Tối ưu quy trình CSKH", status: 1, createdTime: "2026-05-18T00:00:00Z" },
        { id: 3, name: "Ra mắt dòng sản phẩm Premium", status: 2, createdTime: "2026-05-10T00:00:00Z" }
      ];
    } else if (pathname.includes("cashbook")) {
      mockList = [
        { id: 1, code: "PC001", name: "Chi tiền thuê văn phòng", amount: 15000000, type: 1, createdTime: "2026-05-19" },
        { id: 2, code: "PT001", name: "Thu tiền dịch vụ Khách hàng A", amount: 8500000, type: 2, createdTime: "2026-05-19" },
        { id: 3, code: "PT002", name: "Thu tiền hợp đồng Khách hàng B", amount: 25000000, type: 2, createdTime: "2026-05-18" }
      ];
    } else if (pathname.includes("order-request") || pathname.includes("order")) {
      mockList = [
        { id: 1, code: "DH001", customerName: "Nguyễn Văn Anh", totalAmount: 4500000, status: 1, createdTime: "2026-05-19" },
        { id: 2, code: "DH002", customerName: "Trần Thị Bình", totalAmount: 12000000, status: 2, createdTime: "2026-05-19" }
      ];
    } else if (pathname.includes("cxmsurvey")) {
      mockList = [
        { id: 1, title: "Khảo sát mức độ hài lòng dịch vụ chăm sóc da", status: 1, createdTime: "2026-05-19" },
        { id: 2, title: "Đánh giá chất lượng hỗ trợ tổng đài", status: 1, createdTime: "2026-05-18" }
      ];
    } else if (pathname.includes("product")) {
      mockList = [
        { id: 1, name: "Sữa rửa mặt Bùi Văn Chương Cleanser", price: 450000, code: "SP001", status: 1 },
        { id: 2, name: "Serum phục hồi Bùi Văn Chương Recovery", price: 1250000, code: "SP002", status: 1 },
        { id: 3, name: "Kem chống nắng Bùi Văn Chương Sunscreen", price: 680000, code: "SP003", status: 1 }
      ];
    } else if (pathname.includes("service")) {
      mockList = [
        { id: 1, name: "Liệu trình chăm sóc chuyên sâu 5 buổi", price: 4500000, code: "DV001", status: 1 },
        { id: 2, name: "Trị liệu công nghệ cao HIFU nâng cơ", price: 15000000, code: "DV002", status: 1 }
      ];
    } else if (pathname.includes("employee")) {
      mockList = [
        { id: 1, name: "Bùi Văn Chương", code: "NV001", email: "buivanchuong991510@gmail.com", phone: "0369062042" },
        { id: 2, name: "Nguyễn Văn Đạt", code: "NV002", email: "buivanchuong991510@gmail.com", phone: "0369062042" },
        { id: 3, name: "Lê Thị Hồng", code: "NV003", email: "buivanchuong991510@gmail.com", phone: "0369062042" }
      ];
    } else if (pathname.includes("campaign")) {
      mockList = [
        { id: 1, name: "Chiến dịch Tết Ấm Áp 2026", status: 1, createdTime: "2026-01-01" },
        { id: 2, name: "Chiến dịch hè rực rỡ Bùi Văn Chương", status: 1, createdTime: "2026-05-01" }
      ];
    }

    if (method === "GET" || method === "POST") {
      if (isCount) {
        return HttpResponse.json(buildCountResponse(mockList.length));
      }

      if (isList) {
        return HttpResponse.json(buildListResponse(mockList));
      }

      if (isDetail) {
        if (pathname.includes("/employee/info")) {
          return HttpResponse.json(buildDetailResponse({
            id: 1,
            name: "Bùi Văn Chương",
            branchId: 1,
            branchName: "Chi nhánh Hà Nội - Trụ sở chính",
            lstOrgApp: [{
              endDate: "2030-12-31T23:59:59Z",
              packageName: "Gói Vĩnh Viễn"
            }]
          }));
        }
        return HttpResponse.json(buildDetailResponse({}));
      }
    }

    if (method === "GET") {
      return HttpResponse.json(buildDetailResponse({}));
    }

    return HttpResponse.json(buildOkResponse({}));
  }),
];
