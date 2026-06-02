import React from "react";
import { IRouter } from "model/OtherModel";
import urls from "configs/urls";

const Dashboard = React.lazy(() => import("pages/Dashboard/index"));
const PatientRecordList = React.lazy(() => import("pages/PatientRecord/PatientRecordList"));
const ContactList = React.lazy(() => import("pages/Contact/ContactList"));
const ScheduleNextList = React.lazy(() => import("pages/Schedule/ScheduleNextList"));
const TreatmentScheduleList = React.lazy(() => import("pages/TreatmentSchedule/TreatmentScheduleList"));
const TimeKeepingList = React.lazy(() => import("pages/Timekeeping/TimekeepingList"));
const CashBookList = React.lazy(() => import("pages/CashBook/CashBookList"));
const PaymentHistoryList = React.lazy(() => import("pages/PaymentHistory/PaymentHistoryList"));
const EarningList = React.lazy(() => import("pages/Earning/EarningList"));
const CrmCampaignList = React.lazy(() => import("pages/CrmCampaign/CrmCampaignList"));
const SettingList = React.lazy(() => import("pages/Setting/SettingList"));
const MedicalAIStatistics = React.lazy(() => import("pages/MedicalAIStatistics/MedicalAIStatistics"));
const InternalMailList = React.lazy(() => import("pages/InternalMail/InternalMailList"));
const KpiList = React.lazy(() => import("pages/Kpi/KpiList/KpiList"));
const KpiApplyList = React.lazy(() => import("pages/Kpi/KpiApplyList/KpiApplyList"));
const KpiObjectList = React.lazy(() => import("pages/Kpi/KpiObjectList/KpiObjectList"));
const DetailPersonList = React.lazy(() => import("pages/PatientRecord/partials/DetailPerson/DetailPersonList"));
const WarrantyList = React.lazy(() => import("pages/Warranty/WarrantyList"));
const WarrantyListProcess = React.lazy(() => import("pages/Warranty/WarrantyListProcess"));
const CollectWarranty = React.lazy(() => import("pages/Warranty/partials/CollectWarranty"));
const TicketList = React.lazy(() => import("pages/Ticket/TicketList"));
const TicketListProcess = React.lazy(() => import("pages/Ticket/TicketListProcess"));
const CollectTicket = React.lazy(() => import("pages/Ticket/partials/CollectTicket"));
const SettingTicketList = React.lazy(() => import("pages/SettingTicket/SettingTicketList"));
const SettingWarrantyList = React.lazy(() => import("pages/SettingWarranty/SettingWarrantyList"));
const DetailWarranty = React.lazy(() => import("pages/Warranty/partials/DetailWarranty/DetailWarranty"));
const DetailTicket = React.lazy(() => import("pages/Ticket/partials/DetailTicket/DetailTicket"));
const SettingSMSList = React.lazy(() => import("pages/SettingSMS/SettingSMSList"));
const SettingCallList = React.lazy(() => import("pages/SettingCall/SettingCallList"));
const SettingEmailList = React.lazy(() => import("pages/SettingEmail/SettingEmailList"));
const SettingRoseList = React.lazy(() => import("pages/SettingRose/SettingRoseList"));
const ClinicInfoList = React.lazy(() => import("pages/ClinicInfo/ClinicInfoList"));
const SettingTimekeepingList = React.lazy(() => import("pages/SettingTimekeeping/SettingTimekeepingList"));
const SettingCustomerList = React.lazy(() => import("pages/SettingCustomer/SettingCustomerList"));
const SettingCashBookList = React.lazy(() => import("pages/SettingCashBook/SettingCashBookList"));
const SettingMarketResearchList = React.lazy(() => import("pages/SettingMarketResearch/SettingMarketResearchList"));
const SetttingSocialCrmList = React.lazy(() => import("pages/SetttingSocialCrm/SetttingSocialCrmList"));
const SettingReportList = React.lazy(() => import("pages/SettingReport/SettingReportList"));
const DailyProgressLogList = React.lazy(() => import("pages/DailyProgressLog/DailyProgressLogList"));
const PublicConnectZalo = React.lazy(() => import("pages/Public/PublicConnectZalo"));
const TreatmentHistoryList = React.lazy(() => import("pages/TreatmentHistory/TreatmentHistoryList"));
const DiarySurgeryList = React.lazy(() => import("pages/DiarySurgery/DiarySurgeryList"));
const ClinicCalendar = React.lazy(() => import("pages/ClinicCalendar/ClinicCalendar"));
const DoctorQnAList = React.lazy(() => import("pages/DoctorQnA/DoctorQnAList"));
const SocialCrmFacebook = React.lazy(() => import("pages/SocialCrmFacebook/SocialCrmFacebook"));
const SocialCrmZalo = React.lazy(() => import("pages/SocialCrmZalo/SocialCrmZalo"));
const SettingAccount = React.lazy(() => import("pages/SettingAccount/SettingAccount"));
const SettingKpiList = React.lazy(() => import("pages/SettingKPI/SettingKPIList"));
const ReportCustomer = React.lazy(() => import("pages/ReportCustomer/ReportCustomer"));
const SettingZalo = React.lazy(() => import("pages/SettingZalo/SettingZalo"));
const PatientGroup = React.lazy(() => import("pages/PatientGroup"));
const EmailList = React.lazy(() => import("pages/Email/EmailListBackup"));
const SettingContactList = React.lazy(() => import("pages/SettingContact/SettingContactList"));
const FeedbackCustomer = React.lazy(() => import("pages/FeedbackCustomer/FeedbackCustomer"));
const Test = React.lazy(() => import("pages/Test"));
const PostExamSurvey = React.lazy(() => import("pages/PostExamSurvey"));
const LinkSurvey = React.lazy(() => import("pages/LinkSurvey"));
const SettingProcess = React.lazy(() => import("pages/SettingProcess/SettingProcess"));
const ReportLogin = React.lazy(() => import("pages/ReportLogin/ReportLogin"));
const BusinessProcessList = React.lazy(() => import("pages/BPM/BusinessProcessList/BusinessProcessList"));
const SettingBusinessProcess = React.lazy(() => import("pages/BPM/SettingBusinessProcess/SettingBusinessProcess"));
const ConfigBPM = React.lazy(() => import("pages/ConfigBPM"));
const BpmForm = React.lazy(() => import("pages/BPM/BpmForm"));
const ProcessedObjectList = React.lazy(() => import("pages/SettingProcess/partials/ProcessedObjectList"));
const SettingProjectList = React.lazy(() => import("pages/SettingProject/SettingProjectList"));
const PatientCaseList = React.lazy(() => import("pages/PatientCaseList/PatientCaseList"));
const IntegratedMonitoring = React.lazy(() => import("pages/IntegratedMonitoring/IntegratedMonitoring"));
const SettingCode = React.lazy(() => import("pages/SettingCode/SettingCode"));
const SettingIntegration = React.lazy(() => import("pages/SettingIntegration/SettingIntegration"));
const SettingDashboard = React.lazy(() => import("pages/SettingDashboard/SettingDashboard"));
const DetailPatientCase = React.lazy(() => import("pages/PatientCaseList/DetailPatientCase/DetailPatientCase"));
const CxmSurveyList = React.lazy(() => import("pages/CxmSurvey/CxmSurveyList/CxmSurveyList"));
const ProcessSimulation = React.lazy(() => import("pages/ProcessSimulation/ProcessSimulation"));
const BusinessProcessCreate = React.lazy(() => import("pages/BPM/BusinessProcessCreate"));
const UploadDocument = React.lazy(() => import("pages/BPM/UploadDocument/UploadDocument"));
const MiddleWorkList = React.lazy(() => import("pages/MiddleWork/MiddleWorkList"));
const PendingWorkList = React.lazy(() => import("pages/PendingWorkList/PendingWorkList"));
const CompletedWorkList = React.lazy(() => import("pages/CompletedWorkList/CompletedWorkList"));
const PriorityWorkList = React.lazy(() => import("pages/PriorityWorkList/PriorityWorkList"));
const ManageDefaultProcesses = React.lazy(() => import("pages/ManageDefaultProcesses"));
const AppointmentReminder = React.lazy(() => import("pages/AppointmentReminder"));
const BusinessRule = React.lazy(() => import("pages/BusinessRule"));
const BusinessRuleConfig = React.lazy(() => import("pages/BusinessRuleConfig"));
const ManageDataSharing = React.lazy(() => import("pages/ManageDataSharing/ManageDataSharing"));

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
    path: urls.detail_person,
    component: <DetailPersonList />,
  },
  {
    path: urls.contact,
    component: <ContactList />,
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

  //Quy trình bán hàng

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

  // tạo báo giá
  // {
  //   path: urls.create_offer_add,
  //   component: <CreateOffers />,
  // },
  // danh sách báo giá
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
    path: urls.setting_timekeeping,
    component: <SettingTimekeepingList />,
  },
  {
    path: urls.setting_customer,
    component: <SettingCustomerList />,
  },
  {
    path: urls.setting_contact,
    component: <SettingContactList />,
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

  ///chiến dịch MA

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
    path: urls.setting_process,
    component: <SettingProcess />,
  },
  {
    path: urls.report_login,
    component: <ReportLogin />,
  },

  //Cài đặt vận hành

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
    path: urls.task_assignment,
    component: <MiddleWorkList />,
  },
  {
    path: urls.pending_tasks,
    component: <PendingWorkList />,
  },
  {
    path: urls.completed_tasks,
    component: <CompletedWorkList />,
  },
  {
    path: urls.task_prioritization,
    component: <PriorityWorkList />,
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
    path: urls.bpm_form,
    component: <BpmForm />,
  },
  {
    path: urls.user_task_list,
    component: <MiddleWorkList />,
  },

  {
    path: urls.upload_document,
    component: <UploadDocument />,
  },
];
