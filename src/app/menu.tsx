import React from "react";
import Icon from "components/icon";
import { IMenuItem } from "model/OtherModel";
import urls from "configs/urls";
import {
  checkSubdomainTNEX,
  checkSubdomainMock,
  sourceDomain,
} from "./subdomains";

export const menu: IMenuItem[] = [
  ...(!checkSubdomainTNEX
    ? [
      {
        title: "dashboard", // Trang chủ
        path: urls.dashboard,
        icon: <Icon name="Home" />,
        code: "DASHBOARD",
      },
      ...(checkSubdomainMock
        ? [
          {
            title: "managerWork", // Quản lý công việc
            path: urls.manager_work,
            icon: <Icon name="Job" />,
            code: "WORK_PROJECT",
          },
        ]
        : []),
      {
        title: "personal", // Cá nhân
        path: urls.personal,
        icon: <Icon name="Person" />,
        code: "PERSONAL",
        children: [
          {
            title: "calendar", // Lịch
            path: urls.calendar_common,
            icon: <Icon name="CalendarFill" />,
            code: "CALENDAR",
          },
          {
            title: "internalMail", // Thư nội bộ
            path: urls.internal_mail,
            icon: <Icon name="EmailFill" />,
            code: "MAILBOX",
          },
          // {
          //   title: "document", // document
          //   path: urls.internal_mail,
          //   icon: <Icon name="DocumentFill" />,
          //   code: "DOCUMENT",
          // },
          {
            title: "createKPIFramework", // Tạo bộ KPI
            path: urls.kpi,
            icon: <Icon name="KpiCustomer" />,
            code: "", //KPI_APPLY
          },
          {
            title: "createKPITask", // Tạo phiếu giao KPI
            path: urls.kpiApply,
            icon: <Icon name="KpiCustomer" />,
            code: "", //KPI_APPLY
          },
          {
            title: "kpiManagement", // Quản lý KPI
            path: urls.kpiObject,
            icon: <Icon name="KpiCustomer" />,
            code: "", //KPI_APPLY
          },
          // {
          //   title: "Chấm công",
          //   path: urls.internal_mail,
          //   icon: <Icon name="TimeKeeping" />,
          //   code: "TIMEKEEPING",
          // },
          // {
          //   title: "Hoa hồng",
          //   path: urls.internal_mail,
          //   icon: <Icon name="MoneyFill" />,
          //   code: "EARNINGS",
          // },
          {
            title: "settingKPI", // Cài đặt KPI
            path: urls.setting_kpi,
            icon: <Icon name="KpiCustomer" />,
            code: "",
          },
        ],
      },
      {
        title: "project", // dự án
        path: urls.project,
        icon: <Icon name="Job" />,
        code: "WORK_PROJECT",
        children: [
          {
            title: "projectListChild", // Danh sách ca bệnh
            path: urls.project,
            icon: <Icon name="Job" />,
            code: "WORK_PROJECT",
          },
          {
            title: "job", // Công việc
            path: urls.middle_work,
            icon: <Icon name="Job" />,
            code: "WORK_ORDER",
          },
          {
            title: "settingProject", // Cài đặt dự án
            path: urls.setting_project,
            icon: <Icon name="SettingJob" />,
            code: "",
          },
        ],
      },
    ]
    : []),
  {
    title: "customer", // Khách hàng
    path: urls.customer,
    icon: <Icon name="Customer" />,
    code: "CUSTOMER",
    children: [
      {
        title: "PatientGroups", // Phân khúc khách hàng
        path: urls.customer_segment,
        icon: <Icon name="Profile" />,
      },
      {
        title: "customerProfile", // Hồ sơ khách hàng
        path: urls.customer,
        icon: <Icon name="Profile" />,
        code: "CUSTOMER",
      },
      ...(!checkSubdomainTNEX
        ? [
          {
            title: "contactProfile", // Hồ sơ người liên hệ
            path: urls.contact,
            icon: <Icon name="Profile" />,
            code: "CUSTOMER",
          },
        ]
        : []),
      {
        title: "settingCustomer", // Cài đặt khách hàng
        path: urls.setting_customer,
        icon: <Icon name="SettingCustomer" />,
        code: "MENU_SETUP_CUSTOMER",
      },
      ...(!checkSubdomainTNEX
        ? [
          {
            title: "settingContact", // Cài đặt người liên hệ
            path: urls.setting_contact,
            icon: <Icon name="SettingCustomer" />,
            code: "",
          },
        ]
        : []),
    ],
  },

  ...(!checkSubdomainTNEX
    ? [
      {
        title: "customerCare", // Chăm sóc khách hàng
        path: urls.customer_care,
        icon: <Icon name="OnlineConsultation" />,
        code: "CUSTOMER_CARE",
        children: [
          {
            title: "customerServiceHotline", // Tổng đài CSKH
            path: urls.call_center,
            icon: <Icon name="CustomerSupport" />,
            code: "",
          },
          {
            title: "customerCareEmail", // Email CSKH
            path: urls.email,
            icon: <Icon name="EmailFill" />,
            code: "",
          },
          {
            title: "receiveWarranty", // Tiếp nhận bảo hành
            path: urls.warranty,
            icon: <Icon name="ReceiveWarranty" />,
            code: "WARRANTY",
          },
          {
            title: "receiveWarrantyProcess", // Tiếp nhận bảo hành
            path: urls.warranty_process,
            icon: <Icon name="ReceiveWarranty" />,
            code: "KANBAN_V2",
          },
          {
            title: "receiveTicket", // Tiếp nhận hỗ trợ
            path: urls.ticket,
            icon: <Icon name="ReceiveTicket" />,
            code: "TICKET",
          },
          {
            title: "receiveTicketProcess", // Tiếp nhận hỗ trợ
            path: urls.ticket_process,
            icon: <Icon name="ReceiveTicket" />,
            code: "KANBAN_V2",
          },
          ...(sourceDomain == "dermajsc.mock.local" || sourceDomain == "localhost"
            ? [
              {
                title: "feedbackEnhancement", // Góp ý cải tiến
                path: urls.feedback_customer,
                icon: <Icon name="Feedback" />,
                code: "",
              },
            ]
            : []),
          {
            title: "customerSurvey", // Khảo sát khách hàng
            path: urls.customer_survey,
            icon: <Icon name="SpeakerNotes" />,
            code: "",
          },
          {
            title: "cxmSurvey", // Chiến dịch khảo sát
            path: urls.cxmSurvey,
            icon: <Icon name="Customer" />,
            code: "CXM_SURVEY",
          },
          // {
          //   title: "cxmResponse", // Danh sách câu hỏi khảo sát
          //   path: urls.utilityReading,
          //   icon: <Icon name="KpiCustomer" />,
          //   code: "",
          // },
          {
            title: "settingWarranty", // Cài đặt bảo hành
            path: urls.setting_warranty,
            icon: <Icon name="SettingWarranty" />,
            code: "",
          },
          {
            title: "settingTicket", // Cài đặt hỗ trợ
            path: urls.setting_ticket,
            icon: <Icon name="SettingTicket" />,
            code: "",
          },
        ],
      },
      {
        title: "report", // Báo cáo
        path: urls.report,
        icon: <Icon name="ReportFill" />,
        code: "MENU_REPORT",
        children: [
          {
            title: "cashbook", // Tài chính
            path: urls.cashbook,
            icon: <Icon name="CashBook" />,
            code: "CASHBOOK",
          },
          {
            title: "reportRevenue", // Doanh thu
            path: urls.report_common,
            icon: <Icon name="Statistical" />,
            code: "",
          },
          {
            title: "reportCustomer", // Khách hàng
            path: urls.report_customer,
            icon: <Icon name="Customer" />,
            code: "",
          },
          {
            title: "reportLogin", // Khách hàng
            path: urls.report_login,
            icon: <Icon name="Headquarters" />,
            code: "",
          },
          // {
          //   title: "Hoa hồng",
          //   path: "",
          //   icon: <Icon name="Rose" />,
          //   code: "",
          // },
          // {
          //   title: "Lịch sử tác động",
          //   path: "",
          //   icon: <Icon name="ImpactHistory" />,
          //   code: "",
          // },
          {
            title: "settingCashbook", // Cài đặt tài chính
            path: urls.setting_cash_book,
            icon: <Icon name="SettingCashbook" />,
            code: "MENU_SETUP_CASHBOOK",
          },
          {
            title: "settingDashboard", // cài đặt Dashboard
            path: urls.setting_dashboard,
            icon: <Icon name="ReportFill" />,
            code: "",
          },
        ],
      },
      {
        title: "bpmModule", // BPM
        path: urls.manage_processes,
        icon: <Icon name="ManageWork" />,
        code: "BPM",
        children: [
          {
            title: "manageProcesses",
            path: urls.manage_processes, //Danh sách quy trình > Tạo mới quy trình > Cấu hình quy trình (Nằm ở đây)
            code: "BPM",
            icon: <Icon name="CashBook" />,
          },
          {
            title: "processSimulation",
            path: urls.process_simulation, //Mô phỏng quy trình
            code: "PROCESS_SIMULATION",
            icon: <Icon name="CashBook" />,
          },
          {
            title: "objectManage", // Quản lý hồ sơ
            path: urls.object_manage,
            code: "OBJECT_MANAGE",
            icon: <Icon name="CashBook" />,
          },
          {
            title: "userTaskList", // Xử lý hồ sơ
            path: urls.user_task_list,
            code: "WORK_MANAGEMENT",
            icon: <Icon name="ManageWork" />,
          },
          {
            title: "configBpm", // Cấu hình quy trình
            path: urls.config_bpm,
            icon: <Icon name="SettingJob" />,
            code: "",
          },
          {
            title: "manageDefaultProcesses",
            path: urls.manage_default_processes, //Danh sách quy trình > Tạo mới quy trình > Cấu hình quy trình (Nằm ở đây)
            code: "BPM",
            icon: <Icon name="CashBook" />,
          },
          {
            title: "taskAssignment",
            path: urls.task_assignment,
            code: "WORK_MANAGEMENT",
            icon: <Icon name="ManageWork" />,
          },
          {
            title: "pendingTasks",
            path: urls.pending_tasks,
            code: "WORK_MANAGEMENT",
            icon: <Icon name="ManageWork" />,
          },
          {
            title: "completedTasks",
            path: urls.completed_tasks,
            code: "WORK_MANAGEMENT",
            icon: <Icon name="ManageWork" />,
          },
          {
            title: "taskPrioritization",
            path: urls.task_prioritization,
            code: "WORK_MANAGEMENT",
            icon: <Icon name="ManageWork" />,
          },
          // {
          //   title: "manageDefaultProcesses",
          //   path: urls.manage_default_processes,
          //   code: "BPM",
          //   icon: <Icon name="CashBook" />,
          // },
          {
            title: "business_rule", // Loại luật nghiệp vụ
            path: urls.business_rule,
            icon: <Icon name="SettingJob" />,
            code: "",
          },
        ],
      },
    ]
    : []),

  {
    title: "settings", // Cài đặt
    path: urls.setting_common,
    icon: <Icon name="Settings" />,
    code: "",
    children: [
      {
        title: "settingBasis", // Cài đặt cơ sở
        path: urls.setting_basis,
        icon: <Icon name="Headquarters" />,
        code: "MENU_SETUP_BASIC",
      },
      ...(!checkSubdomainTNEX
        ? [
          {
            title: "settingPersonal", // Cài đặt cá nhân
            path: urls.setting_account,
            icon: <Icon name="ContactCustomer" />,
            code: "",
          },
        ]
        : []),
      // {
      //   title: "Cài đặt chấm công",
      //   path: urls.setting_timekeeping,
      //   icon: <Icon name="SettingTimekeeping" />,
      //   code: "",
      // },
      ...(!checkSubdomainTNEX
        ? [
          // {
          //   title: "Cài đặt hoa hồng",
          //   path: urls.setting_rose,
          //   icon: <Icon name="SettingRose" />,
          //   code: "",
          // },
          // {
          //   title: "Cài đặt tìm khách hàng",
          //   path: urls.setting_market_research,
          //   icon: <Icon name="SettingAnalytics" />,
          //   code: "",
          // },
          {
            title: "settingSMS", // Cài đặt SMS
            path: urls.setting_sms,
            icon: <Icon name="SettingSMS" />,
            code: "MENU_SETUP_SMS",
          },
          {
            title: "settingEmail", // Cài đặt Email
            path: urls.setting_email,
            icon: <Icon name="SettingEmail" />,
            code: "MENU_SETUP_EMAIL",
          },
          {
            title: "settingZalo", //Cài đặt Zalo
            path: urls.setting_zalo,
            icon: <Icon name="Zalo" />,
            code: "",
          },
          // {
          //   title: "settingReport",
          //   path: urls.setting_report,
          //   icon: <Icon name="ReportFill" />,
          //   code: "MENU_SETUP_REPORT",
          // },
          // {
          //   title: "integratedMonitoring", // Giám sát tích hợp
          //   path: urls.integrated_monitoring,
          //   icon: <Icon name="ReportFill" />,
          //   code: "",
          // },
        ]
        : []),
      // (checkSubdomainTNPM || checkSubdomainGREENSPA) && {
      //   title: "settingOperate", // Cài đặt vận hành
      //   path: urls.setting_operate,
      //   icon: <Icon name="Settings" />,
      //   code: "",
      // },
      {
        title: "settingSwitchboard", // Cài đặt tổng đài
        path: urls.setting_call,
        icon: <Icon name="SettingSMS" />,
        code: "MENU_SETUP_CALL",
      },

      {
        title: "settingApplication", // Cài đặt ứng dụng
        path: urls.install_app,
        icon: <Icon name="Download" />,
        code: "",
      },
      {
        title: "settingConfiguration", // Cài đặt danh mục
        path: urls.setting,
        icon: <Icon name="Settings" />,
        code: "",
      },
      ...(!checkSubdomainTNEX
        ? [
          {
            title: "manage_data_sharing", // Cài đặt chia sẻ dữ liệu
            path: urls.manage_data_sharing,
            icon: <Icon name="FileSharing" style={{ width: 35, height: 35, marginLeft: -5 }} />,
            code: "",
          },
          // {
          //   title: "resourceManagement", // Quản trị tài nguyên
          //   path: urls.resource_management,
          //   icon: <Icon name="SettingJob" />,
          //   code: "RESOURCE",
          // },
        ]
        : []),
    ],
  },

  // đoạn này dùng để test chức năng mới
  // {
  //   title: "BPM",
  //   path: urls.bpm,
  //   icon: <Icon name="CashBook" />,
  //   code: "",
  // },
  // {
  //   title: "Test",
  //   path: urls.test,
  //   icon: <Icon name="CashBook" />,
  //   code: "",
  // },
];
