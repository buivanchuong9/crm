import React from "react";
import Icon from "components/icon";
import { IMenuItem } from "model/OtherModel";
import urls from "configs/urls";
import {
  checkSubdomainTNEX,
  checkSubdomainMock,
  sourceDomain,
} from "./subdomains";

// ============================================================
// 🏥 DERMAHEALTH — Menu tinh gọn cho phòng khám da liễu
// ============================================================
// Phiên bản: 2.1 — Áp dụng chiến lược Scale-down 03/06/2026
//
// NHÓM ĐÃ TRẢM (không hiển thị):
//   ❌ Timekeeping     — dùng HRM riêng
//   ❌ DiarySurgery    — chỉ dành cho bệnh viện lớn
//   ❌ TenderPackage   — không phù hợp phòng khám tư
//   ❌ ReportLogin     — làm rác Database
//   ❌ ProcessSimulation — chỉ dành cho dev/admin
//   ❌ BusinessRule    — quá phức tạp, thay bằng BPM
//
// NHÓM ĐÃ GỘP (gom vào 1 route):
//   ✅ Settings: ~15 routes → 1 SettingsLayout tại /settings/*
//   ✅ Warranty → "Thẻ cam kết liệu trình"
//   ✅ Ticket   → "Phiếu sự cố"
//   ✅ CrmCampaign → "Automation Campaigns" (3-5 kịch bản cố định)
// ============================================================

export const menu: IMenuItem[] = [
  ...(!checkSubdomainTNEX
    ? [
      // ── 1. TRANG CHỦ ──────────────────────────────────────
      {
        title: "dashboard",
        path: urls.dashboard,
        icon: <Icon name="Home" />,
        code: "DASHBOARD",
      },

      // ── 2. LỊCH KHÁM & NHẮC NHỞ ──────────────────────────
      ...(checkSubdomainMock
        ? [
          {
            title: "managerWork",
            path: urls.manager_work,
            icon: <Icon name="Job" />,
            code: "WORK_PROJECT",
          },
        ]
        : []),

      // ── 3. HỒ SƠ BÁC SĨ / CÁ NHÂN ───────────────────────
      {
        title: "personal",
        path: urls.personal,
        icon: <Icon name="Person" />,
        code: "PERSONAL",
        children: [
          {
            title: "calendar",
            path: urls.calendar_common,
            icon: <Icon name="CalendarFill" />,
            code: "CALENDAR",
          },
          {
            title: "internalMail",
            path: urls.internal_mail,
            icon: <Icon name="EmailFill" />,
            code: "MAILBOX",
          },
          // TRẢ LẠI 4 TÍNH NĂNG KPI VÀO MENU (Bỏ gộp KpiDashboard do UI lặp)
          {
            title: "createKPIFramework", // Tạo bộ KPI
            path: urls.kpi,
            icon: <Icon name="KpiCustomer" />,
            code: "", 
          },
          {
            title: "createKPITask", // Tạo phiếu giao KPI
            path: urls.kpiApply,
            icon: <Icon name="KpiCustomer" />,
            code: "", 
          },
          {
            title: "kpiManagement", // Quản lý KPI
            path: urls.kpiObject,
            icon: <Icon name="KpiCustomer" />,
            code: "", 
          },
          {
            title: "settingKPI", // Cài đặt KPI
            path: urls.setting_kpi,
            icon: <Icon name="KpiCustomer" />,
            code: "",
          },
        ],
      },

      // ── 4. CA BỆNH ĐANG THEO DÕI ──────────────────────────
      {
        title: "project",
        path: urls.project,
        icon: <Icon name="Job" />,
        code: "WORK_PROJECT",
        children: [
          {
            title: "projectListChild",
            path: urls.project,
            icon: <Icon name="Job" />,
            code: "WORK_PROJECT",
          },
          {
            title: "job",
            path: urls.middle_work,
            icon: <Icon name="Job" />,
            code: "WORK_ORDER",
          },
          {
            title: "settingProject",
            path: urls.setting_project,
            icon: <Icon name="SettingJob" />,
            code: "",
          },
        ],
      },
    ]
    : []),

  // ── 5. QUẢN LÝ BỆNH NHÂN ──────────────────────────────────
  {
    title: "customer",
    path: urls.customer,
    icon: <Icon name="Customer" />,
    code: "CUSTOMER",
    children: [
      {
        title: "PatientGroups",
        path: urls.customer_segment,
        icon: <Icon name="Profile" />,
      },
      {
        title: "customerProfile",
        path: urls.customer,
        icon: <Icon name="Profile" />,
        code: "CUSTOMER",
      },
      ...(!checkSubdomainTNEX
        ? [
          {
            title: "contactProfile",
            path: urls.contact,
            icon: <Icon name="Profile" />,
            code: "CUSTOMER",
          },
        ]
        : []),
    ],
  },

  ...(!checkSubdomainTNEX
    ? [
      // ── 6. TƯ VẤN TRỰC TUYẾN (Omnichannel Hub) ───────────
      {
        title: "customerCare",
        path: urls.customer_care,
        icon: <Icon name="OnlineConsultation" />,
        code: "CUSTOMER_CARE",
        children: [
          {
            title: "customerServiceHotline",
            path: urls.call_center,
            icon: <Icon name="CustomerSupport" />,
            code: "",
          },
          {
            title: "customerCareEmail",
            path: urls.email,
            icon: <Icon name="EmailFill" />,
            code: "",
          },

          {
            title: "treatmentCommitment",    // Thẻ cam kết liệu trình
            path: urls.warranty,
            icon: <Icon name="ReceiveWarranty" />,
            code: "WARRANTY",
          },
          {
            title: "treatmentCommitmentKanban",  // Theo dõi liệu trình
            path: urls.warranty_process,
            icon: <Icon name="ReceiveWarranty" />,
            code: "KANBAN_V2",
          },

          {
            title: "incidentTicket",         // Phiếu sự cố
            path: urls.ticket,
            icon: <Icon name="ReceiveTicket" />,
            code: "TICKET",
          },
          {
            title: "incidentTicketProcess",  // Xử lý phiếu sự cố
            path: urls.ticket_process,
            icon: <Icon name="ReceiveTicket" />,
            code: "KANBAN_V2",
          },

          ...(sourceDomain == "dermajsc.mock.local" || sourceDomain == "localhost"
            ? [
              {
                title: "feedbackEnhancement",
                path: urls.feedback_customer,
                icon: <Icon name="Feedback" />,
                code: "",
              },
            ]
            : []),

          {
            title: "customerSurvey",
            path: urls.customer_survey,
            icon: <Icon name="SpeakerNotes" />,
            code: "",
          },

          {
            title: "automationCampaigns",    // Tự động hóa chăm sóc
            path: urls.crm_campaign,
            icon: <Icon name="Customer" />,
            code: "CXM_SURVEY",
          },
        ],
      },

      // ── 7. THỐNG KÊ Y TẾ & AI ─────────────────────────────
      {
        title: "report",
        path: urls.report,
        icon: <Icon name="ReportFill" />,
        code: "MENU_REPORT",
        children: [
          {
            title: "cashbook",
            path: urls.cashbook,
            icon: <Icon name="CashBook" />,
            code: "CASHBOOK",
          },
          {
            title: "reportRevenue",
            path: urls.report_common,
            icon: <Icon name="Statistical" />,
            code: "",
          },
          {
            title: "reportCustomer",
            path: urls.report_customer,
            icon: <Icon name="Customer" />,
            code: "",
          },
          {
            title: "settingCashbook",
            path: urls.setting_cash_book,
            icon: <Icon name="SettingCashbook" />,
            code: "MENU_SETUP_CASHBOOK",
          },
          {
            title: "settingDashboard",
            path: urls.setting_dashboard,
            icon: <Icon name="ReportFill" />,
            code: "",
          },
        ],
      },

      // ── 8. QUY TRÌNH KHÁM CHỮA BỆNH (BPM) ────────────────
      {
        title: "bpmModule",
        path: urls.manage_processes,
        icon: <Icon name="ManageWork" />,
        code: "BPM",
        children: [
          {
            title: "manageProcesses",       
            path: urls.manage_processes,
            code: "BPM",
            icon: <Icon name="CashBook" />,
          },
          {
            title: "objectManage",          
            path: urls.object_manage,
            code: "OBJECT_MANAGE",
            icon: <Icon name="CashBook" />,
          },
          {
            title: "userTaskList",          
            path: urls.user_task_list,
            code: "WORK_MANAGEMENT",
            icon: <Icon name="ManageWork" />,
          },
          {
            title: "configBpm",             
            path: urls.config_bpm,
            icon: <Icon name="SettingJob" />,
            code: "",
          },
          {
            title: "manageDefaultProcesses", 
            path: urls.manage_default_processes,
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
        ],
      },
    ]
    : []),

  // ── 9. CÀI ĐẶT HỆ THỐNG ───────────────────────────────────
  {
    title: "settings",
    path: urls.setting_common,
    icon: <Icon name="Settings" />,
    code: "",
    children: [
      {
        title: "settingBasis",              
        path: urls.setting_basis,
        icon: <Icon name="Headquarters" />,
        code: "MENU_SETUP_BASIC",
      },
      ...(!checkSubdomainTNEX
        ? [
          {
            title: "settingPersonal",       
            path: urls.setting_account,
            icon: <Icon name="ContactCustomer" />,
            code: "",
          },
          {
            title: "settingSMS",
            path: urls.setting_sms,
            icon: <Icon name="SettingSMS" />,
            code: "MENU_SETUP_SMS",
          },
          {
            title: "settingEmail",
            path: urls.setting_email,
            icon: <Icon name="SettingEmail" />,
            code: "MENU_SETUP_EMAIL",
          },
          {
            title: "settingZalo",
            path: urls.setting_zalo,
            icon: <Icon name="Zalo" />,
            code: "",
          },
        ]
        : []),

      {
        title: "settingSwitchboard",
        path: urls.setting_call,
        icon: <Icon name="SettingSMS" />,
        code: "MENU_SETUP_CALL",
      },

      {
        title: "settingApplication",
        path: urls.install_app,
        icon: <Icon name="Download" />,
        code: "",
      },

      {
        title: "settingConfiguration",
        path: urls.setting,
        icon: <Icon name="Settings" />,
        code: "",
      },

      ...(!checkSubdomainTNEX
        ? [
          {
            title: "manage_data_sharing",
            path: urls.manage_data_sharing,
            icon: <Icon name="FileSharing" style={{ width: 35, height: 35, marginLeft: -5 }} />,
            code: "",
          },
        ]
        : []),
    ],
  },
];
