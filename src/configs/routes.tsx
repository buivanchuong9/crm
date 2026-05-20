import React from "react";
import Icon from "components/icon";
import Dashboard from "pages/Dashboard/index";
import { IMenuItem, IRouter } from "model/OtherModel";
import urls from "./urls";

import PatientRecordList from "pages/PatientRecord/PatientRecordList";
import ContactList from "pages/Contact/ContactList";
import ScheduleNextList from "pages/Schedule/ScheduleNextList";
import TreatmentScheduleList from "pages/TreatmentSchedule/TreatmentScheduleList";
import TimeKeepingList from "pages/Timekeeping/TimekeepingList";
import CashBookList from "pages/CashBook/CashBookList";
import PaymentHistoryList from "pages/PaymentHistory/PaymentHistoryList";
import EarningList from "pages/Earning/EarningList";
import CrmCampaignList from "pages/CrmCampaign/CrmCampaignList";
import SettingList from "pages/Setting/SettingList";
import MedicalAIStatistics from "pages/MedicalAIStatistics/MedicalAIStatistics";
import InternalMailList from "pages/InternalMail/InternalMailList";
import KpiList from "pages/Kpi/KpiList/KpiList";
import KpiApplyList from "pages/Kpi/KpiApplyList/KpiApplyList";
import KpiObjectList from "pages/Kpi/KpiObjectList/KpiObjectList";
import DetailPersonList from "pages/PatientRecord/partials/DetailPerson/DetailPersonList";
import WarrantyList from "pages/Warranty/WarrantyList";
import WarrantyListProcess from "pages/Warranty/WarrantyListProcess";
import CollectWarranty from "pages/Warranty/partials/CollectWarranty";
import TicketList from "pages/Ticket/TicketList";
import TicketListProcess from "pages/Ticket/TicketListProcess";
import CollectTicket from "pages/Ticket/partials/CollectTicket";
import SettingTicketList from "pages/SettingTicket/SettingTicketList";
import SettingWarrantyList from "pages/SettingWarranty/SettingWarrantyList";
import DetailWarranty from "pages/Warranty/partials/DetailWarranty/DetailWarranty";
import DetailTicket from "pages/Ticket/partials/DetailTicket/DetailTicket";
import SettingSMSList from "pages/SettingSMS/SettingSMSList";
import SettingCallList from "pages/SettingCall/SettingCallList";
import SettingEmailList from "pages/SettingEmail/SettingEmailList";
import SettingRoseList from "pages/SettingRose/SettingRoseList";
import ClinicInfoList from "pages/ClinicInfo/ClinicInfoList";
import SettingTimekeepingList from "pages/SettingTimekeeping/SettingTimekeepingList";
import SettingCustomerList from "pages/SettingCustomer/SettingCustomerList";
import SettingCashBookList from "pages/SettingCashBook/SettingCashBookList";
import SettingMarketResearchList from "pages/SettingMarketResearch/SettingMarketResearchList";
import SettingWorkTypeList from "pages/SettingWork/SettingWorkTypeList";
import SetttingSocialCrmList from "pages/SetttingSocialCrm/SetttingSocialCrmList";
import SettingReportList from "pages/SettingReport/SettingReportList";
import DailyProgressLogList from "pages/DailyProgressLog/DailyProgressLogList";
import PublicConnectZalo from "pages/Public/PublicConnectZalo";
import TreatmentHistoryList from "pages/TreatmentHistory/TreatmentHistoryList";
import DiarySurgeryList from "pages/DiarySurgery/DiarySurgeryList";
import ClinicCalendar from "pages/ClinicCalendar/ClinicCalendar";
import DoctorQnAList from "pages/DoctorQnA/DoctorQnAList";
import SocialCrmFacebook from "pages/SocialCrmFacebook/SocialCrmFacebook";
import SocialCrmZalo from "pages/SocialCrmZalo/SocialCrmZalo";
import SettingAccount from "pages/SettingAccount/SettingAccount";
import SettingKpiList from "pages/SettingKPI/SettingKPIList";
import ReportCustomer from "pages/ReportCustomer/ReportCustomer";
import InstallApplication from "pages/InstallApplication/InstallApplication";
import SettingZalo from "pages/SettingZalo/SettingZalo";
import PatientGroup from "pages/PatientGroup";
import EmailList from "pages/Email/EmailListBackup";
import SettingContactList from "pages/SettingContact/SettingContactList";
import FeedbackCustomer from "pages/FeedbackCustomer/FeedbackCustomer";
import Test from "pages/Test";
import { getDomain } from "reborn-util";
import { getRootDomain } from "utils/common";
import PostExamSurvey from "pages/PostExamSurvey";
import LinkSurvey from "pages/LinkSurvey";
import SettingProcess from "pages/SettingProcess/SettingProcess";
import ReportLogin from "pages/ReportLogin/ReportLogin";
import BusinessProcessList from "pages/AIImageAnalysis/BusinessProcessList/BusinessProcessList";
import SettingBusinessProcess from "pages/AIImageAnalysis/SettingBusinessProcess/SettingBusinessProcess";
import ConfigBPM from "pages/ConfigBPM";
import ProcessedObjectList from "pages/SettingProcess/partials/ProcessedObjectList";
import SettingProjectList from "pages/SettingProject/SettingProjectList";
import PatientCaseList from "pages/PatientCaseList/PatientCaseList";
import IntegratedMonitoring from "pages/IntegratedMonitoring/IntegratedMonitoring";
import SettingCode from "pages/SettingCode/SettingCode";
import SettingIntegration from "pages/SettingIntegration/SettingIntegration";
import SettingDashboard from "pages/SettingDashboard/SettingDashboard";
import DetailPatientCase from "pages/PatientCaseList/DetailPatientCase/DetailPatientCase";
import SettingPromotionList from "pages/SettingPromotion/SettingPromotionList";
import CxmSurveyList from "pages/CxmSurvey/CxmSurveyList/CxmSurveyList";
import ProcessSimulation from "pages/ProcessSimulation/ProcessSimulation";
import BusinessProcessCreate from "pages/AIImageAnalysis/BusinessProcessCreate";
import RunAIDiagnosis from "pages/RunAIDiagnosis";
import UploadDocument from "pages/AIImageAnalysis/UploadDocument/UploadDocument";
import ManageDefaultProcesses from "pages/ManageDefaultProcesses";
import AppointmentReminder from "pages/AppointmentReminder";
import BusinessRule from "pages/BusinessRule";
import BusinessRuleConfig from "pages/BusinessRuleConfig";
import { useCookies } from "react-cookie";
import ManageDataSharing from "pages/ManageDataSharing/ManageDataSharing";

// Stub/Dummy Components for Deleted Features
const DummyComponent = () => null;

const SettingOperate = DummyComponent;
const ManagementFeeList = DummyComponent;
const UtilityReadingList = DummyComponent;
const SpaceList = DummyComponent;
const VehicleList = DummyComponent;
const VehicleRegistrationList = DummyComponent;
const OrtherFeeList = DummyComponent;
const BuildingList = DummyComponent;
const BuildingFloorList = DummyComponent;
const SpaceCustomerList = DummyComponent;
const ElectricityIndexList = DummyComponent;
const WaterIndexList = DummyComponent;

const DetailPartner = DummyComponent;
const PartnerList = DummyComponent;
const SettingPartnerList = DummyComponent;

const ContractList = DummyComponent;
const CreateContracts = DummyComponent;
const CreateContractsXML = DummyComponent;
const WarrantyContract = DummyComponent;
const GuaranteeContractList = DummyComponent;
const DetailGuaranteeContract = DummyComponent;
const DetailWarrantyContract = DummyComponent;
const DetailContract = DummyComponent;
const SettingContractList = DummyComponent;
const ContractEform = DummyComponent;
const EmailConfirm = DummyComponent;
const VoucherForm = DummyComponent;
const CampaignList = DummyComponent;
const CampaignListParent = DummyComponent;
const CreateCampaign = DummyComponent;
const OpportunityList = DummyComponent;
const ManagementOpportunity = DummyComponent;
const ManagementOpportunityNew = DummyComponent;
const SaleFlowList = DummyComponent;
const CreateSaleflow = DummyComponent;
const ManagementSale = DummyComponent;
const CreateOrderSales = DummyComponent;
const OrderTracking = DummyComponent;
const OrderRequestList = DummyComponent;
const SaleInvoiceList = DummyComponent;
const CustomerPayList = DummyComponent;
const SettingSellList = DummyComponent;
const ManageOrder = DummyComponent;
const CreateOrder = DummyComponent;
const OrderInvoiceList = DummyComponent;
const TemporaryOrderList = DummyComponent;
const CreateReceipt = DummyComponent;
const ImportInvoiceList = DummyComponent;
const ProductSoldList = DummyComponent;
const ProductInventoryList = DummyComponent;
const InventoryList = DummyComponent;
const TransferOrderForm = DummyComponent;
const AdjustmentSlip = DummyComponent;
const OrganizationList = DummyComponent;
const UserList = DummyComponent;
const Package = DummyComponent;
const ExtensionList = DummyComponent;
const FieldMannagement = DummyComponent;
const ResourceManagementList = DummyComponent;
const CampaignMarketingList = DummyComponent;
const EmailMarkettingList = DummyComponent;
const SMSMarkettingList = DummyComponent;
const ZaloMarketting = DummyComponent;
const MarketingAutomationList = DummyComponent;
const MarketingAutomationListV2 = DummyComponent;
const CreateMarketingAutomationV2 = DummyComponent;
const DetailMarketingAutomation = DummyComponent;
const CreateMarketingAutomation = DummyComponent;
const MarketingAutomation = DummyComponent;
const SettingMarketingList = DummyComponent;
const FsQuote = DummyComponent;
const Quotations = DummyComponent;
const QuotationsNew = DummyComponent;
const SettingQuoteForm = DummyComponent;
const OfferList = DummyComponent;
const CreateOffers = DummyComponent;
const isBeauty = localStorage.getItem("isBeauty");

const sourceDomain = getDomain(decodeURIComponent(document.location.href));

const rootDomain = getRootDomain(sourceDomain);
const checkSubdomainTNEX = sourceDomain.includes("tnex");
const checkSubdomainTNPM = sourceDomain.includes("tnpm") || sourceDomain.includes("localhost");
const checkSubdomainGREENSPA = sourceDomain.includes("greenspa");
const checkSubdomainReborn =
  sourceDomain.includes("localhost") || sourceDomain.includes("rebornjsc") || sourceDomain.includes("kcn") || sourceDomain.includes("jsc");
// "tnex.reborn.vn"

const checkUserRoot = localStorage.getItem("user.root") == "1";

export const menu: IMenuItem[] = [
  ...(!checkSubdomainTNEX
    ? [
      {
        title: "dashboard", // Trang chủ
        path: urls.dashboard,
        icon: <Icon name="Home" />,
        code: "DASHBOARD",
      },
      ...(checkSubdomainReborn
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
          ...(sourceDomain == "rebornjsc.reborn.vn" || sourceDomain == "localhost"
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
        title: "bpm", // Quản lý quy trình
        path: urls.sell,
        icon: <Icon name="CashBook" />,
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
          // {
          //   title: "manageDefaultProcesses",
          //   path: urls.manage_default_processes, //Danh sách quy trình > Tạo mới quy trình > Cấu hình quy trình (Nằm ở đây)
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
          {
            title: "settingEform", // Cài đặt biểu mẫu
            path: urls.setting_eform,
            icon: <Icon name="SettingSell" />,
            code: "",
          },
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

export const routes: IRouter[] = [
  // Dashboard
  {
    path: "",
    component: <Dashboard />,
  },
  {
    path: urls.dashboard,
    component: <Dashboard />,
  },
  {
    path: urls.manager_work,
    component: <AppointmentReminder />,
  },
  {
    path: urls.customer,
    component: <PatientRecordList />,
  },
  {
    path: urls.partner,
    component: <PartnerList />,
  },
  {
    path: urls.detail_partner,
    component: <DetailPartner />,
  },

  {
    path: urls.detail_person,
    component: <DetailPersonList />,
  },
  {
    path: urls.contact,
    component: <ContactList />,
  },
  // tạo hợp đồng
  {
    path: urls.create_contract,
    component: <CreateContracts />,
  },
  {
    path: urls.create_contract_xml,
    component: <CreateContractsXML />,
  },
  {
    path: urls.edit_contract,
    component: <CreateContracts />,
  },
  {
    path: urls.edit_contract_xml,
    component: <CreateContractsXML />,
  },
  {
    path: urls.contract,
    component: <ContractList />,
  },
  {
    path: urls.warrantyContract,
    component: <WarrantyContract />,
  },
  {
    path: urls.guarantee,
    component: <GuaranteeContractList />,
  },

  {
    path: urls.detail_guarantee,
    component: <DetailGuaranteeContract />,
  },
  {
    path: urls.detail_warranty_contract,
    component: <DetailWarrantyContract />,
  },
  {
    path: urls.detail_contract,
    component: <DetailContract />,
  },
  {
    path: urls.detail_project,
    component: <DetailPatientCase />,
  },
  {
    path: urls.schedule_next,
    component: <ScheduleNextList />,
  },
  {
    path: urls.schedule,
    component: <TreatmentScheduleList />,
  },
  {
    path: urls.timekeeping,
    component: <TimeKeepingList />,
  },
  {
    path: urls.cashbook,
    component: <CashBookList />,
  },
  {
    path: urls.cxmSurvey, // Thông tin khảo sát
    component: <CxmSurveyList />,
  },
  {
    path: urls.manage_data_sharing,
    component: <ManageDataSharing />,
  },
  // báo cáo chung
  {
    path: urls.report_common,
    component: <MedicalAIStatistics />,
  },
  // Báo cáo khách hàng
  {
    path: urls.report_customer,
    component: <ReportCustomer />,
  },
  {
    path: urls.sales_campaign,
    // component: <CampaignList />,
    component: <CampaignListParent />,
  },
  {
    path: urls.create_sale_campaign,
    component: <CreateCampaign />,
  },
  {
    path: urls.edit_sale_campaign,
    component: <CreateCampaign />,
  },
  {
    path: urls.opportunity_list,
    component: <OpportunityList />,
  },
  {
    path: urls.management_opportunity,
    component: <ManagementOpportunity />,
  },
  {
    path: urls.management_opportunity_new,
    component: <ManagementOpportunityNew />,
  },

  //Quy trình bán hàng
  {
    path: urls.sale_flow,
    component: <SaleFlowList />,
  },
  {
    path: urls.create_sale_flow,
    component: <CreateSaleflow />,
  },
  {
    path: urls.edit_sale_flow,
    component: <CreateSaleflow />,
  },
  {
    path: urls.management_sale,
    component: <ManagementSale />,
  },

  //
  {
    path: urls.earnings,
    component: <EarningList />,
  },
  {
    path: urls.payment_history,
    component: <PaymentHistoryList />,
  },
  {
    path: urls.treatment_history,
    component: <TreatmentHistoryList />,
  },
  {
    path: urls.crm_campaign,
    component: <CrmCampaignList />,
  },
  {
    path: urls.setting_social_crm,
    component: <SetttingSocialCrmList />,
  },
  {
    path: urls.setting,
    component: <SettingList />,
  },
  {
    path: urls.internal_mail,
    component: <InternalMailList />,
  },
  {
    path: urls.kpi,
    component: <KpiList />,
  },
  {
    path: urls.kpiApply,
    component: <KpiApplyList />,
  },
  {
    path: urls.kpiObject,
    component: <KpiObjectList />,
  },
  {
    path: urls.warranty,
    component: <WarrantyList />,
  },
  {
    path: urls.warranty_process,
    component: <WarrantyListProcess />,
  },
  {
    path: urls.collect_warranty,
    component: <CollectWarranty />,
  },
  {
    path: urls.detail_warranty,
    component: <DetailWarranty />,
  },
  {
    path: urls.setting_warranty,
    component: <SettingWarrantyList />,
  },
  {
    path: urls.ticket,
    component: <TicketList />,
  },
  {
    path: urls.ticket_process,
    component: <TicketListProcess />,
  },
  {
    path: urls.collect_ticket,
    component: <CollectTicket />,
  },
  {
    path: urls.detail_ticket,
    component: <DetailTicket />,
  },
  {
    path: urls.diary_surgery,
    component: <DiarySurgeryList />,
  },
  {
    path: urls.setting_ticket,
    component: <SettingTicketList />,
  },
  {
    path: urls.send_email_confirm,
    component: <EmailConfirm />,
  },
  {
    path: urls.voucher_confirm,
    component: <VoucherForm />,
  },
  {
    path: urls.setting_call,
    component: <SettingCallList />,
  },
  {
    path: urls.setting_sms,
    component: <SettingSMSList />,
  },
  {
    path: urls.setting_email,
    component: <SettingEmailList />,
  },
  {
    path: urls.setting_zalo,
    component: <SettingZalo />,
  },
  {
    path: urls.sms_marketting,
    component: <SMSMarkettingList />,
  },
  {
    path: urls.email_marketting,
    component: <EmailMarkettingList />,
  },
  {
    path: urls.zalo_marketting,
    component: <ZaloMarketting />,
  },

  // tạo báo giá
  // {
  //   path: urls.create_offer_add,
  //   component: <CreateOffers />,
  // },
  // danh sách báo giá
  // {
  //   path: urls.offer,
  //   component: <OfferList />,
  // },
  // Setting
  {
    path: urls.setting_rose,
    component: <SettingRoseList />,
  },
  {
    path: urls.setting_basis,
    component: <ClinicInfoList />,
  },
  {
    path: urls.setting_operate,
    component: <SettingOperate />,
  },
  {
    path: urls.setting_timekeeping,
    component: <SettingTimekeepingList />,
  },
  {
    path: urls.setting_customer,
    component: <SettingCustomerList />,
  },
  {
    path: urls.setting_partner,
    component: <SettingPartnerList />,
  },
  {
    path: urls.setting_contact,
    component: <SettingContactList />,
  },
  {
    path: urls.setting_sell,
    component: <SettingSellList />,
  },
  {
    path: urls.setting_contract,
    component: <SettingContractList />,
  },
  {
    path: urls.setting_eform,
    component: <ContractEform />,
  },
  {
    path: urls.setting_cash_book,
    component: <SettingCashBookList />,
  },
  {
    path: urls.setting_market_research,
    component: <SettingMarketResearchList />,
  },
  {
    path: urls.setting_marketing,
    component: <SettingMarketingList />,
  },
  {
    path: urls.setting_project,
    component: <SettingProjectList />,
  },
  // {
  //   path: urls.setting_work,
  //   component: <SettingWorkTypeList />,
  // },
  {
    path: urls.config_bpm,
    component: <ConfigBPM />,
  },
  {
    path: urls.setting_dashboard,
    component: <SettingDashboard />,
  },
  {
    path: urls.project,
    component: <PatientCaseList />,
  },
  {
    path: urls.middle_work,
    component: <DailyProgressLogList />,
  },
  {
    path: urls.setting_report,
    component: <SettingReportList />,
  },
  {
    path: urls.integrated_monitoring,
    component: <IntegratedMonitoring />,
  },
  {
    path: urls.setting_code,
    component: <SettingCode />,
  },
  {
    path: urls.public_connect_zalo,
    component: <PublicConnectZalo />,
  },
  {
    path: urls.resource_management,
    component: <ResourceManagementList />,
  },
  // Quản lý đơn đặt hàng
  {
    path: urls.manager_order,
    component: <ManageOrder />,
  },
  // Tạo đơn đặt hàng
  {
    path: urls.order,
    component: <CreateOrder />,
  },
  // Danh sách hóa đơn đặt hàng
  {
    path: urls.order_invoice_list,
    component: <OrderInvoiceList />,
  },
  // Danh sách đơn đặt hàng lưu tạm
  {
    path: urls.temporary_order_list,
    component: <TemporaryOrderList />,
  },
  // tạo phiếu nhập hàng
  {
    path: urls.create_invoice_add,
    component: <CreateReceipt />,
  },
  // danh sách hóa đơn nhập hàng
  {
    path: urls.invoice_order,
    component: <ImportInvoiceList />,
  },
  // sản phẩm đã bán
  {
    path: urls.products_sold,
    component: <ProductSoldList />,
  },
  // sản phẩm tồn kho
  {
    path: urls.product_inventory,
    component: <ProductInventoryList />,
  },
  // quản lý kho hàng
  {
    path: urls.inventory,
    component: <InventoryList />,
  },
  // tạo đơn bán hàng
  {
    path: urls.create_sale_add,
    component: <CreateOrderSales />,
  },
  // Danh sách yêu cầu mua hàng
  {
    path: urls.order_tracking,
    component: <OrderTracking />,
  },
  {
    path: urls.order_request_list,
    component: <OrderRequestList />,
  },

  // danh sách hóa đơn bán hàng
  {
    path: urls.sale_invoice,
    component: <SaleInvoiceList />,
  },
  // danh sách khách trả hàng
  {
    path: urls.customer_pay,
    component: <CustomerPayList />,
  },
  // lịch
  {
    path: urls.calendar_common,
    component: <ClinicCalendar />,
  },
  // Tổng đài
  {
    path: urls.call_center,
    component: <DoctorQnAList />,
  },
  //email
  {
    path: urls.email,
    component: <EmailList />,
  },
  // Kênh facebook
  {
    path: urls.social_facebook_crm,
    component: <SocialCrmFacebook />,
  },

  // Kênh zalo
  {
    path: urls.social_zalo_crm,
    component: <SocialCrmZalo />,
  },
  // phiếu điều chỉnh kho
  {
    path: urls.adjustment_slip,
    component: <AdjustmentSlip />,
  },
  // thông tin cá nhân
  {
    path: urls.setting_account,
    component: <SettingAccount />,
  },
  //Cài đặt KPI
  {
    path: urls.setting_kpi,
    component: <SettingKpiList />,
  },
  // Cài đặt ứng dụng
  {
    path: urls.install_app,
    // component: <InstallApplication />,
    component: <SettingIntegration />,
  },
  {
    path: urls.marketing_automation,
    component: <MarketingAutomationList />,
  },
  // {
  //   path: urls.marketing_automation_v2,
  //   component: <MarketingAutomationListV2 />,
  // },
  // {
  //   path: urls.create_marketing_automation_v2,
  //   component: <CreateMarketingAutomationV2 />,
  // },
  // {
  //   path: urls.edit_marketing_automation_v2,
  //   component: <CreateMarketingAutomationV2 />,
  // },
  {
    path: urls.detail_marketing_automation,
    component: <DetailMarketingAutomation />,
  },
  {
    path: urls.create_marketing_automation,
    component: <CreateMarketingAutomation />,
  },
  {
    path: urls.edit_marketing_automation,
    component: <CreateMarketingAutomation />,
  },
  {
    path: urls.marketing_automation_setting,
    component: <MarketingAutomation />,
  },

  ///chiến dịch MA
  {
    path: urls.campaign_marketing,
    component: <CampaignMarketingList />,
  },

  {
    path: urls.customer_segment,
    component: <PatientGroup />,
  },
  {
    path: urls.feedback_customer,
    component: <FeedbackCustomer />,
  },
  // khảo sát khách hàng
  {
    path: urls.customer_survey,
    component: <PostExamSurvey />,
  },
  // đường link khảo sát khách hàng
  {
    path: urls.link_survey,
    component: <LinkSurvey />,
  },
  {
    path: urls.fs,
    component: <FsQuote />,
  },
  {
    path: urls.quote,
    component: <Quotations />,
  },
  {
    path: urls.quoteNew,
    component: <QuotationsNew />,
  },
  {
    path: urls.setting_process,
    component: <SettingProcess />,
  },
  {
    path: urls.inventory_transfer_document,
    component: <TransferOrderForm />,
  },
  {
    path: urls.report_login,
    component: <ReportLogin />,
  },
  {
    path: urls.setting_quote_form,
    component: <SettingQuoteForm />,
  },

  //Cài đặt vận hành
  {
    path: urls.ortherFee,
    component: <OrtherFeeList />,
  },
  {
    path: urls.electricityIndex,
    component: <ElectricityIndexList />,
  },
  {
    path: urls.waterIndex,
    component: <WaterIndexList />,
  },
  {
    path: urls.spaceCustomer,
    component: <SpaceCustomerList />,
  },
  {
    path: urls.managementFee,
    component: <ManagementFeeList />,
  },
  {
    path: urls.vehicleRegistration,
    component: <VehicleRegistrationList />,
  },
  {
    path: urls.vehicle,
    component: <VehicleList />,
  },
  {
    path: urls.building,
    component: <BuildingList />,
  },
  {
    path: urls.buildingFloor,
    component: <BuildingFloorList />,
  },

  // đoạn này dùng để test chức năng mới
  // {
  //   path: urls.bpm,
  //   component: <BusinessProcessList />,
  // },
  {
    path: urls.manage_processes,
    component: <BusinessProcessList />,
  },
  {
    path: urls.manage_default_processes,
    component: <ManageDefaultProcesses />,
  },
  {
    path: urls.business_rule,
    component: <BusinessRule />,
  },
  {
    path: urls.business_rule_config,
    component: <BusinessRuleConfig />,
  },
  {
    path: urls.process_simulation,
    component: <ProcessSimulation />,
  },
  {
    path: urls.object_manage,
    component: <ProcessedObjectList />,
  },
  {
    path: urls.setting_business_process,
    component: <SettingBusinessProcess />,
  },
  {
    path: urls.test,
    component: <Test />,
  },
  {
    path: urls.bpm_create,
    component: <BusinessProcessCreate />,
  },
  {
    path: urls.user_task_list,
    component: <RunAIDiagnosis />,
  },

  {
    path: urls.upload_document,
    component: <UploadDocument />,
  },
  {
    path: urls.user,
    component: <UserList />,
  },
  {
    path: urls.organization,
    component: <OrganizationList />,
  },
  {
    path: urls.package_manage,
    component: <Package />,
  },
  {
    path: urls.extension_list,
    component: <ExtensionList />,
  },
  {
    path: urls.field_management,
    component: <FieldMannagement />,
  },
];
