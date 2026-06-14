import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        common: {
          seeMore: "See more",
        },
        sidebar: {
          // ─── DermaHealth v4.0 — User Research Driven ──────────
          dashboard: "Dashboard",

          // Patients
          patients: "Patients",
          patientProfiles: "Patient Profiles",
          patientSegments: "Patient Segments",

          // Treatment Journey (BPM rebranded)
          treatmentJourneys: "Treatment Journey",
          journeyTemplates: "Journey Templates",
          journeyBuilder: "Journey Builder",
          activeJourneys: "Active Journeys",
          treatmentSteps: "Treatment Steps",
          journeyConfig: "Journey Config",

          // Follow-up Care (expanded with v2 center)
          followUpCare: "Follow-up Care",
          followupDashboard: "Follow-up Overview",
          reminderCenter: "Reminder Center",
          patientRisk: "Patient Risk",
          labResults: "Lab Results",
          campaigns: "Campaigns",
          surveys: "Surveys",
          treatmentCommitment: "Treatment Commitment",
          hotline: "Hotline",
          careEmail: "Email",

          // Health Monitoring
          monitoring: "Health Monitoring",
          healthMonitoring: "Health Monitoring",
          progressTracking: "Progress Tracking",
          beforeAfterImages: "Before / After Photos",

          // AI Assistant (outcome-focused naming)
          aiStudio: "AI Assistant",
          aiFollowupAssistant: "Follow-up Assistant",
          aiSkinAssessment: "Skin Check AI",
          aiJourneyGenerator: "Journey Generator",
          aiProgressAnalysis: "Progress Analysis",
          aiRevisitRisk: "Revisit Prediction",

          // Calendar / Reports (new keys only — duplicates updated in-place below)
          calendar: "Calendar",
          reports: "Reports",
          revenueReport: "Revenue",
          customerAnalytics: "Patient Analytics",
          manageDataSharing: "Data Sharing",

          // Legacy keys kept for backward compatibility
          personal: "Personal",
          internalMail: "Internal mail",
          document: "Document",
          createKPIFramework: "Create KPIs",
          createKPITask: "Create KPI task",
          kpiManagement: "Manage KPI",
          project: "Project",
          workManagement: "Work Management",
          userTaskManagement: "User task management",
          userTaskList: "Treatment Steps",
          job: "Daily Progress Log",
          jobReport: "Task report",

          customer: "Patients",
          student: "Students",
          partner: "Partner",
          teacher: "Teacher",
          // đoạn này là children của customer
          customerProfile: "Customer profile",
          studentProfile: "Student profile",
          partnerProfile: "Partner profile",
          teacherProfile: "Teacher profile",
          contactProfile: "Contact Profile",
          parentProfile: "Parent profile",
          treatmentHistory: "Treatment history",
          PatientGroups: "Customer Segmentation",

          quote: "Quote",
          listQuotationsNew: "Danh sách báo giá mới",
          // đoạn này là children của quote
          createQuote: "Create quote",
          listQuotations: "List quotations",
          listFS: "List fs",

          contract: "Contract",
          // đoạn này là children của contract
          createContract: "Create contract",
          createContractXML: "Create contract XML",
          listContract: "List contract",
          listWarranty: "List warranty",
          guaranteeContract: "List of guarantee",
          listWarrantyContract: "List of Warranty Contract",

          marketing: "Marketing",
          // đoạn này là children của marketing
          emailMarketing: "Email Marketing",
          smsMarketing: "SMS Marketing",
          zaloMarketing: "Zalo Marketing",
          marketingAutomation: "Marketing Automation",
          marketingAutomationV2: "Marketing Automation V2",
          campaignMarketing: "Marketing Campaign",

          salesChannel: "Sales channel",
          // đoạn này là children của sales channel
          facebook: "Facebook",
          zalo: "Zalo",

          selling: "Sales",
          opportunity: "Opportunities",
          provideService: "Provide service",
          // đoạn này là children của selling
          createSalesOrder: "Create sales order",
          salesInvoice: "Sales Invoice",
          returnInvoice: "Return Invoice",
          salesCampaign: "Sales Campaign",
          createOppotunity: "Create opportunity",
          opportunityList: "Opportunity List",
          orderRequestList: "Order request list",
          // salesManagement: "Opportunity Management",
          salesManagement: "Take care of the opportunity",
          salesFlow: "Sales Flow",
          invoicesManagement: "Sales Management",

          customerCare: "Customer Care",
          // đoạn này là children của customer care
          customerServiceHotline: "Customer service hotline",
          customerCareEmail: "Customer care email",
          receiveWarranty: "Receive warranty",
          receiveWarrantyProcess: "Receive warranty process",
          receiveTicket: "Receive ticket",
          receiveTicketProcess: "Receive ticket process",
          medicalRecord: "Medical record",
          feedbackEnhancement: "Feedback enhancement",
          customerSurvey: "Customer survey",

          warehouse: "Warehouse",
          // đoạn này là children của warehouse
          createPurchaseOrder: "Create purchase order",
          purchaseInvoice: "Purchase invoice",
          createOutboundDelivery: "Create outbound delivery",
          outboundInvoice: "Outbound invoice",
          soldProducts: "Sold products",
          stockedProducts: "Stocked products",
          warehouseManagement: "Warehouse management",
          inventoryTransferDocument: "Inventory transfer document",
          stockAdjustmentVoucher: "Stock adjustment voucher",

          cashbook: "Cashbook",
          bpmModule: "Treatment Journeys",
          bpm: "Treatment Journey Builder",
          manageProcesses: "Journey Builder",
          manageDefaultProcesses: "Journey Templates",
          business_rule: "Treatment Rules",
          processSimulation: "Treatment Plan Simulation",
          objectManage: "Patient Cases",
          taskAssignment: "Step Assignment",
          pendingTasks: "Pending Steps",
          completedTasks: "Completed Steps",
          taskPrioritization: "Step Prioritization",
          manage_data_sharing: "Data Sharing",

          // Thông tin khảo sát
          survey: "Customer survey",
          cxmSurvey: "CXM survey",

          // Quản lý vận hành
          operate: "Operation Management",
          // utilityReading: "Utility Reading",
          electricityIndex: "Electricity Index",
          waterIndex: "Water Index",
          spaceCustomer: "Space",
          managementFee: "Management Fee",
          vehicleRegistration: "Vehicle Registration",
          vehicle: "Vehicle",
          ortherFee: "Orther Fee",

          report: "Report",
          // đoạn này là children của report
          reportRevenue: "Revenue",
          reportCustomer: "Customer",
          reportLogin: "Login",

          settings: "Settings",
          settingBasis: "Branches",
          settingOperate: "Setting operate",
          settingPersonal: "Account",
          settingKPI: "Setting KPI",
          settingCustomer: "Patient Config",
          settingPartner: "Setting partner",
          settingContact: "Contact Config",
          settingSales: "Setting sales",
          settingMarketing: "Setting Marketing",
          settingContract: "Setting contract",
          settingProcess: "Process Config",
          settingQuoteForm: "Setting quote form",
          settingCashbook: "Cashbook Config",
          settingSalesChannel: "Setting sales channel",
          settingWarranty: "Commitment Config",
          settingTicket: "Setting ticket",
          settingSwitchboard: "Switchboard",
          settingSMS: "SMS",
          settingEmail: "Email",
          settingZalo: "Zalo",
          settingJob: "Setting job",
          settingProject: "Setting project",
          managerWork: "Appointment Reminders",
          settingReport: "Report Config",
          integratedMonitoring: "Integrated monitoring",
          settingCode: "Code Config",
          configBpm: "Journey Config",
          settingDashboard: "Dashboard Config",
          settingApplication: "Integrations",
          resourceManagement: "Resource management",
          organizationalManagement: "Organizational management",
          listOfOrganizations: "List of organizations",
          servicePackageManagement: "Service package management",
          renewalList: "Renewal list",
          userAdministration: "User administration",
          fieldManagement: "Field management",
          settingConfiguration: "System Config",
        },
        pageDashboard: {
          title: "Dashboard",
          invoice: "Invoices",
          customer: "Customers",
          actualRevenueReport: "Net revenue report",
          realRevenue: "Net revenue",
          expense: "Expenses",
          profit: "Profit",
          payables: "Debt",
          topServices: "Top services",
          fastRetrieval: "Quick search",
          userManual: "User guide",
        },

        // đoạn là page setting basic
        pageClinicInfo: {
          title: "Setting basis",
          listBranches: "List branches",
          listDepartments: "List departments",
          listRole: "List Role",
          listTeam: "List team",
          listEmployee: "List employee",
          listTreatmentRooms: "List treatment rooms",
        },
        // đoạn là page setting operate
        pageSettingOperate: {
          title: "Setting operate",
          electricityRate: "Electricity rate",
          electricityIndex: "Electricity index",
          electrictiyMeter: "Electricity meter",
          // meterSpace: "Meter space",

          waterRate: "Water rate",
          waterMeter: "Water meter",
          waterIndex: "Water index",
          // meterSpace: "Meter space",

          building: "Building/Floor/Apartment",
          project: "List project",
          managementFeeRate: "Management fee rate",
          managementFee: "Management fee",
          pakingFee: "Parking fee",
          spaceType: "Space type",
        },

        pageSettingPersonal: {
          title: "Setting personal",
        },

        pageSettingKPI: {
          title: "Setting KPI",
          kpiDataSource: "KPI data source",
          kpiMetric: "KPI metric",
          listTemplatesKPI: "List templates KPI",
        },
      },
    },
    vi: {
      translation: {
        common: {
          seeMore: "Xem thêm",
        },
        sidebar: {
          dashboard: "Trang chủ",

          // ─── DermaHealth v4.0 — Nghiên cứu người dùng ────────
          // Patients
          patients: "Bệnh nhân",
          patientProfiles: "Hồ sơ Bệnh nhân",
          patientSegments: "Nhóm Bệnh nhân",

          // Treatment Journey
          treatmentJourneys: "Hành trình Điều trị",
          journeyTemplates: "Mẫu Hành trình",
          journeyBuilder: "Xây dựng Hành trình",
          activeJourneys: "Hồ sơ Bệnh nhân Đang điều trị",
          treatmentSteps: "Bước Điều trị",
          journeyConfig: "Cấu hình Hành trình",

          // Follow-up Care (v2)
          followUpCare: "Chăm sóc Sau điều trị",
          followupDashboard: "Tổng quan Chăm sóc",
          reminderCenter: "Trung tâm Nhắc nhở",
          patientRisk: "Rủi ro Bệnh nhân",
          labResults: "Kết quả Xét nghiệm",
          campaigns: "Chiến dịch",
          surveys: "Khảo sát",
          treatmentCommitment: "Cam kết Điều trị",
          hotline: "Hotline",
          careEmail: "Email",

          // Health Monitoring
          monitoring: "Theo dõi Sức khỏe",
          healthMonitoring: "Theo dõi Sức khỏe",
          progressTracking: "Theo dõi Tiến trình",
          beforeAfterImages: "Ảnh Trước / Sau",

          // AI Assistant
          aiStudio: "Trợ lý AI",
          aiFollowupAssistant: "Trợ lý Chăm sóc AI",
          aiSkinAssessment: "Kiểm tra Da bằng AI",
          aiJourneyGenerator: "Tạo Hành trình AI",
          aiProgressAnalysis: "Phân tích Tiến trình",
          aiRevisitRisk: "Dự báo Tái khám",

          // Reports
          reports: "Báo cáo",
          revenueReport: "Doanh thu",
          customerAnalytics: "Phân tích Bệnh nhân",
          manageDataSharing: "Chia sẻ Dữ liệu",

          personal: "Hồ sơ Bác sĩ",
          // đoạn này là children của cá nhân
          internalMail: "Thư nội bộ",
          document: "Tài liệu",
          createKPIFramework: "Tạo bộ KPI",
          createKPITask: "Tạo phiếu giao KPI",
          kpiManagement: "Quản lý KPI",
          project: "Ca bệnh đang theo dõi",
          projectListChild: "Danh sách ca bệnh",
          //Quản lý công việc BPM
          userTaskList: "Xử lý hồ sơ",
          workManagement: "Lịch khám & Nhắc nhở",
          job: "Nhật ký tiến triển",
          jobReport: "Báo cáo công việc",
          calendar: "Lịch trực / Lịch khám",

          customer: "Quản lý Bệnh nhân",
          student: "Quản lý hồ sơ học sinh",
          partner: "Đối tác",
          teacher: "Giáo viên",
          // đoạn này là children của khách hàng
          customerProfile: "Hồ sơ Bệnh án",
          studentProfile: "Hồ sơ học sinh",
          partnerProfile: "Hồ sơ đối tác",
          teacherProfile: "Hồ sơ giáo viên",
          contactProfile: "Hồ sơ người liên hệ",
          parentProfile: "Hồ sơ phụ huynh",
          treatmentHistory: "Thực hiện dịch vụ",
          PatientGroups: "Nhóm bệnh nhân",

          quote: "Báo giá",
          // đoạn này là children của báo giá
          createQuote: "Tạo báo giá",
          listQuotations: "Danh sách báo giá",
          listQuotationsNew: "Danh sách báo giá mới",
          listFS: "Danh sách FS",

          contract: "Hợp đồng",
          // đoạn này là children của hợp đồng
          createContract: "Tạo hợp đồng",
          createContractXML: "Tạo hợp đồng XML",
          listContract: "Danh sách hợp đồng",
          listWarranty: "Danh sách bảo hành",
          guaranteeContract: "Danh sách bảo lãnh",
          listWarrantyContract: "Danh sách bảo hành",

          marketing: "Truyền thông",
          // đoạn này là children của marketing
          emailMarketing: "Truyền thông bằng Email",
          smsMarketing: "Truyền thông bằng SMS",
          zaloMarketing: "Truyền thông bằng Zalo",
          marketingAutomation: "Truyền thông theo kịch bản",
          marketingAutomationV2: "Truyền thông theo kịch bản V2",
          campaignMarketing: "Ngân sách truyền thông",

          salesChannel: "Kênh bán",
          // đoạn này là children của kênh bán
          facebook: "Tin nhắn Facebook",
          zalo: "Tin nhắn Zalo",

          selling: "Bán hàng",
          opportunity: "Cơ hội bán hàng",
          provideService: "Thực hiện dịch vụ",
          // đoạn này là children của bán hàng
          createSalesOrder: "Tạo đơn bán hàng",
          salesInvoice: "Hóa đơn bán hàng",
          returnInvoice: "Khách trả hàng",
          salesCampaign: "Quản lý chiến dịch",
          createOppotunity: "Tạo cơ hội",
          opportunityList: "Danh sách cơ hội",
          orderRequestList: "Yêu cầu mua hàng",
          salesManagement: "Chăm sóc cơ hội",
          salesManagementNew: "Chăm sóc cơ hội mới",
          salesFlow: "Quy trình bán hàng",
          invoicesManagement: "Quản lý bán hàng",

          customerCare: "Tư vấn trực tuyến",
          // đoạn này là children của chăm sóc khách hàng
          customerServiceHotline: "Nhắn tin / Hỏi đáp với bác sĩ",
          receiveWarranty: "Tiếp nhận bảo hành",
          receiveWarrantyProcess: "Tiếp nhận bảo hành theo quy trình",
          receiveTicket: "Tiếp nhận hỗ trợ",
          receiveTicketProcess: "Tiếp nhận hỗ trợ theo quy trình",
          customerCareEmail: "Nhắn tin / Hỏi đáp với bác sĩ",
          medicalRecord: "Nhật ký điều trị",
          feedbackEnhancement: "Góp ý cải tiến",
          customerSurvey: "Khảo sát sau khám",

          // đoạn này là children của đặt hàng
          order: "Mua hàng",
          createOrder: "Tạo đơn đặt hàng",
          orderInvoiceList: "Hóa đơn đặt hàng",
          temporaryOrderList: "Đơn đặt lưu tạm",

          // đoạn này là children của quản lý đơn đặt hàng
          orderTracking: "Theo dõi đặt hàng",
          manageOrder: "Yêu cầu mua hàng",
          productList: "Thống kê sản phẩm",

          warehouse: "Kho hàng",
          // đoạn này là children của kho hàng
          createPurchaseOrder: "Tạo phiếu nhập hàng",
          purchaseInvoice: "Hóa đơn nhập hàng",
          createOutboundDelivery: "Tạo phiếu xuất kho",
          outboundInvoice: "Hóa đơn xuất kho",
          soldProducts: "Sản phẩm đã bán",
          stockedProducts: "Sản phẩm tồn kho",
          warehouseManagement: "Quản lý kho hàng",
          inventoryTransferDocument: "Phiếu điều chuyển kho",
          stockAdjustmentVoucher: "Phiếu điều chỉnh kho",

          cashbook: "Tài chính",
          bpmModule: "Hành trình Điều trị",
          bpm: "Xây dựng Hành trình",
          manageProcesses: "Xây dựng Hành trình",
          manageDefaultProcesses: "Mẫu Hành trình",
          business_rule: "Quy tắc Điều trị",
          processSimulation: "Mô phỏng Kế hoạch Điều trị",
          objectManage: "Hồ sơ Bệnh nhân",
          taskAssignment: "Phân công Bước Điều trị",
          pendingTasks: "Bước Chờ xử lý",
          completedTasks: "Bước Đã hoàn thành",
          taskPrioritization: "Ưu tiên Bước Điều trị",
          manage_data_sharing: "Chia sẻ Dữ liệu",
          cxmSurvey: "Chiến dịch Khảo sát",

          // Quản lý vận hành
          operate: "Quản lý vận hành",
          // utilityReading: "Chỉ số điện/nước",
          electricityIndex: "Chỉ số điện",
          waterIndex: "Chỉ số nước",
          spaceCustomer: "Căn hộ/văn phòng",
          managementFee: "Phí quản lý",
          vehicleRegistration: "Phí đậu xe",
          vehicle: "Đăng kí phương tiện",
          ortherFee: "Chi phí khác",

          report: "Thống kê Y tế & AI",
          // đoạn này là children của báo cáo
          reportRevenue: "Báo cáo số lượng ca bệnh",
          reportCustomer: "Báo cáo hiệu quả điều trị",
          reportLogin: "Đăng nhập",

          settings: "Cài đặt Hệ thống",
          // đoạn này là children của cài đặt
          // pricePackageManagement: "Quản lý gói giá",
          settingBasis: "Chi nhánh Phòng khám",
          settingOperate: "Cài đặt vận hành",
          settingPersonal: "Tài khoản",
          settingKPI: "Cài đặt KPI",
          settingCustomer: "Cài đặt Bệnh nhân",
          settingPartner: "Cài đặt đối tác",
          settingContact: "Cài đặt Người liên hệ",
          settingSales: "Cài đặt bán hàng",
          settingMarketing: "Cài đặt truyền thông",
          settingContract: "Cài đặt hợp đồng",
          settingEform: "Biểu mẫu đơn thuốc, phiếu khám",
          settingProcess: "Cài đặt Quy trình",
          settingQuoteForm: "Cài đặt mẫu báo giá",
          settingCashbook: "Cài đặt Tài chính",
          settingSalesChannel: "Cài đặt kênh bán",
          settingWarranty: "Cài đặt Cam kết Liệu trình",
          settingTicket: "Cài đặt hỗ trợ",
          settingSwitchboard: "Tổng đài",
          settingSMS: "SMS",
          settingEmail: "Email",
          settingZalo: "Zalo",
          settingJob: "Cài đặt công việc",
          settingProject: "Cài đặt dự án",
          managerWork: "Nhắc nhở Lịch khám",
          settingReport: "Cài đặt Báo cáo",
          integratedMonitoring: "Giám sát tích hợp",
          settingCode: "Cài đặt Mã",
          configBpm: "Cấu hình Hành trình",
          settingDashboard: "Cài đặt Bảng điều khiển",
          settingApplication: "Tích hợp",
          resourceManagement: "Quản trị tài nguyên",
          organizationalManagement: "Quản lý đại lý",
          listOfOrganizations: "Danh sách tổ chức",
          servicePackageManagement: "Quản lý gói dịch vụ",
          renewalList: "Danh sách gia hạn",
          userAdministration: "Quản trị người dùng",
          fieldManagement: "Quản lý lĩnh vực",
          settingConfiguration: "Cấu hình Hệ thống",
        },
        pageDashboard: {
          title: "Trang chủ",
          invoice: "Hóa đơn",
          customer: "Khách hàng",
          actualRevenueReport: "Báo cáo doanh thu thực",
          realRevenue: "Doanh thu thực",
          expense: "Chi phí",
          profit: "Lợi nhuận",
          payables: "Công nợ",
          topServices: "Top dịch vụ",
          fastRetrieval: "Truy xuất nhanh",
          userManual: "Hướng dẫn sử dụng",
        },

        // đoạn là page cài đặt cơ sở
        pageClinicInfo: {
          title: "Thông tin Phòng khám",
          listBranches: "Danh sách chi nhánh",
          listDepartments: "Danh sách phòng ban",
          listRole: "Danh sách nhóm quyền",
          listEmployee: "Danh sách nhân viên",
          listTeam: "Danh sách nhóm nhân viên",
          listTreatmentRooms: "Danh sách phòng điều trị",
        },
        // đoạn này là page cài đặt vận hành
        pageSettingOperate: {
          title: "Cài đặt vận hành",

          electricityRate: "Đơn giá điện",
          electricityIndex: "Chỉ số điện",
          electrictiyMeter: "Danh mục công tơ điện",
          // meterSpace: "Cài đặt đồng hồ",

          waterRate: "Đơn giá nước",
          waterIndex: "Chỉ số nước",
          waterMeter: "Danh mục công tơ nước",
          // meterSpace: "Meter space",

          building: "Tòa nhà/Tầng/Căn hộ",
          project: "Danh sách ca bệnh",
          managementFeeRate: "Biểu giá phí quản lý",
          managementFee: "Biểu phí kết xuất hàng tháng",
          pakingFee: "Biểu phí đỗ xe",
          spaceType: "Loại căn hộ",
        },

        pageSettingPersonal: {
          title: "Cài đặt cá nhân",
        },

        pageSettingKPI: {
          title: "Cài đặt KPI",
          kpiDataSource: "Nguồn cấp dữ liệu KPI",
          kpiMetric: "Chỉ tiêu KPI",
          listTemplatesKPI: "Danh sách mẫu KPI",
        },
      },
    },
  },
  lng: "vi",
  fallbackLng: "vi",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
