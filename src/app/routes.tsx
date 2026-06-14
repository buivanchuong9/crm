import React from "react";
import { Navigate } from "react-router-dom";
import { IRouter } from "model/OtherModel";
import urls from "configs/urls";

// ── Existing pages ────────────────────────────────────────────────────────────
const Dashboard = React.lazy(() => import("pages/Dashboard/index"));
const PatientRecordList = React.lazy(() => import("pages/PatientRecord/PatientRecordList"));
const DetailPersonList = React.lazy(() => import("pages/PatientRecord/partials/DetailPerson/DetailPersonList"));
const PatientGroup = React.lazy(() => import("pages/PatientGroup"));
const ContactList = React.lazy(() => import("pages/Contact/ContactList"));
const ScheduleNextList = React.lazy(() => import("pages/Schedule/ScheduleNextList"));
const TreatmentScheduleList = React.lazy(() => import("pages/TreatmentSchedule/TreatmentScheduleList"));
const CashBookList = React.lazy(() => import("pages/CashBook/CashBookList"));
const PaymentHistoryList = React.lazy(() => import("pages/PaymentHistory/PaymentHistoryList"));
const EarningList = React.lazy(() => import("pages/Earning/EarningList"));
const CrmCampaignList = React.lazy(() => import("pages/CrmCampaign/CrmCampaignList"));
const SettingList = React.lazy(() => import("pages/Setting/SettingList"));
const MedicalAIStatistics = React.lazy(() => import("pages/MedicalAIStatistics/MedicalAIStatistics"));
const WarrantyList = React.lazy(() => import("pages/Warranty/WarrantyList"));
const WarrantyListProcess = React.lazy(() => import("pages/Warranty/WarrantyListProcess"));
const CollectWarranty = React.lazy(() => import("pages/Warranty/partials/CollectWarranty"));
const DetailWarranty = React.lazy(() => import("pages/Warranty/partials/DetailWarranty/DetailWarranty"));
const SettingWarrantyList = React.lazy(() => import("pages/SettingWarranty/SettingWarrantyList"));
const SettingCallList = React.lazy(() => import("pages/SettingCall/SettingCallList"));
const SettingSMSList = React.lazy(() => import("pages/SettingSMS/SettingSMSList"));
const SettingEmailList = React.lazy(() => import("pages/SettingEmail/SettingEmailList"));
const SettingZalo = React.lazy(() => import("pages/SettingZalo/SettingZalo"));
const SettingRoseList = React.lazy(() => import("pages/SettingRose/SettingRoseList"));
const ClinicInfoList = React.lazy(() => import("pages/ClinicInfo/ClinicInfoList"));
const SettingCustomerList = React.lazy(() => import("pages/SettingCustomer/SettingCustomerList"));
const SettingCashBookList = React.lazy(() => import("pages/SettingCashBook/SettingCashBookList"));
const SettingMarketResearchList = React.lazy(() => import("pages/SettingMarketResearch/SettingMarketResearchList"));
const SetttingSocialCrmList = React.lazy(() => import("pages/SetttingSocialCrm/SetttingSocialCrmList"));
const SettingReportList = React.lazy(() => import("pages/SettingReport/SettingReportList"));
const DailyProgressLogList = React.lazy(() => import("pages/DailyProgressLog/DailyProgressLogList"));
const PublicConnectZalo = React.lazy(() => import("pages/Public/PublicConnectZalo"));
const TreatmentHistoryList = React.lazy(() => import("pages/TreatmentHistory/TreatmentHistoryList"));
const ClinicCalendar = React.lazy(() => import("pages/ClinicCalendar/ClinicCalendar"));
const DoctorQnAList = React.lazy(() => import("pages/DoctorQnA/DoctorQnAList"));
const SocialCrmFacebook = React.lazy(() => import("pages/SocialCrmFacebook/SocialCrmFacebook"));
const SocialCrmZalo = React.lazy(() => import("pages/SocialCrmZalo/SocialCrmZalo"));
const SettingAccount = React.lazy(() => import("pages/SettingAccount/SettingAccount"));
const ReportCustomer = React.lazy(() => import("pages/ReportCustomer/ReportCustomer"));
const EmailList = React.lazy(() => import("pages/Email/EmailListBackup"));
const SettingContactList = React.lazy(() => import("pages/SettingContact/SettingContactList"));
const FeedbackCustomer = React.lazy(() => import("pages/FeedbackCustomer/FeedbackCustomer"));
const PostExamSurvey = React.lazy(() => import("pages/PostExamSurvey"));
const LinkSurvey = React.lazy(() => import("pages/LinkSurvey"));
const SettingProcess = React.lazy(() => import("pages/SettingProcess/SettingProcess"));
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
const BusinessProcessCreate = React.lazy(() => import("pages/BPM/BusinessProcessCreate"));
const UploadDocument = React.lazy(() => import("pages/BPM/UploadDocument/UploadDocument"));
const MiddleWorkList = React.lazy(() => import("pages/MiddleWork/MiddleWorkList"));
const PendingWorkList = React.lazy(() => import("pages/PendingWorkList/PendingWorkList"));
const CompletedWorkList = React.lazy(() => import("pages/CompletedWorkList/CompletedWorkList"));
const PriorityWorkList = React.lazy(() => import("pages/PriorityWorkList/PriorityWorkList"));
const ManageDefaultProcesses = React.lazy(() => import("pages/ManageDefaultProcesses"));
const AppointmentReminder = React.lazy(() => import("pages/AppointmentReminder"));
const ManageDataSharing = React.lazy(() => import("pages/ManageDataSharing/ManageDataSharing"));
const Test = React.lazy(() => import("pages/Test"));

// ── AI Studio pages ───────────────────────────────────────────────────────────
const AISkinAssessmentPage = React.lazy(() => import("features/ai/AISkinAssessmentPage"));
const AIJourneyGeneratorPage = React.lazy(() => import("features/ai/AIJourneyGeneratorPage"));
const AIProgressAnalysisPage = React.lazy(() => import("features/ai/AIProgressAnalysisPage"));
const AIRevisitRiskPage = React.lazy(() => import("features/ai/AIRevisitRiskPage"));

// ── Monitoring ────────────────────────────────────────────────────────────────
const BeforeAfterImagesPage = React.lazy(() => import("features/ai/BeforeAfterImagesPage"));

// ── Patient Portal ────────────────────────────────────────────────────────────
const MyJourneyPage = React.lazy(() => import("features/patient-portal/MyJourneyPage"));
const DailyCheckInPage = React.lazy(() => import("features/patient-portal/DailyCheckInPage"));
const ProgressPhotosPage = React.lazy(() => import("features/patient-portal/ProgressPhotosPage"));
const MedicationReminderPage = React.lazy(() => import("features/patient-portal/MedicationReminderPage"));
const FollowupSchedulePage = React.lazy(() => import("features/patient-portal/FollowupSchedulePage"));

// ── Follow-up Center v2 ───────────────────────────────────────────────────────
const FollowupDashboardPage = React.lazy(() => import("features/followup/FollowupDashboardPage"));
const ReminderCenterPage = React.lazy(() => import("features/followup/ReminderCenterPage"));
const PatientRiskPage = React.lazy(() => import("features/followup/PatientRiskPage"));
const LabNotificationPage = React.lazy(() => import("features/followup/LabNotificationPage"));
const HealthMonitoringPage = React.lazy(() => import("features/followup/HealthMonitoringPage"));
const AIFollowupAssistantPage = React.lazy(() => import("features/followup/AIFollowupAssistantPage"));

export const routes: IRouter[] = [
  // ── Dashboard ────────────────────────────────────────────────────────────────
  { path: "", component: <Dashboard /> },
  { path: urls.dashboard, component: <Dashboard /> },

  // ── Patients ──────────────────────────────────────────────────────────────────
  { path: urls.customer, component: <PatientRecordList /> },
  { path: urls.detail_person, component: <DetailPersonList /> },
  { path: urls.customer_segment, component: <PatientGroup /> },
  { path: urls.contact, component: <ContactList /> },

  // ── AI Studio ─────────────────────────────────────────────────────────────────
  { path: urls.ai_skin_assessment, component: <AISkinAssessmentPage /> },
  { path: urls.ai_journey_generator, component: <AIJourneyGeneratorPage /> },
  { path: urls.ai_progress_analysis, component: <AIProgressAnalysisPage /> },
  { path: urls.ai_revisit_risk, component: <AIRevisitRiskPage /> },

  // ── Treatment Journeys (BPM engine — rebranded) ───────────────────────────────
  { path: urls.manage_processes, component: <BusinessProcessList /> },
  { path: urls.manage_default_processes, component: <ManageDefaultProcesses /> },
  { path: urls.bpm_create, component: <BusinessProcessCreate /> },
  { path: urls.bpm_form, component: <BpmForm /> },
  { path: urls.setting_business_process, component: <SettingBusinessProcess /> },
  { path: urls.config_bpm, component: <ConfigBPM /> },
  { path: urls.upload_document, component: <UploadDocument /> },

  // ── Treatment Monitoring ──────────────────────────────────────────────────────
  { path: urls.project, component: <PatientCaseList /> },
  { path: urls.detail_project, component: <DetailPatientCase /> },
  { path: urls.middle_work, component: <DailyProgressLogList /> },
  { path: urls.treatment_history, component: <TreatmentHistoryList /> },
  { path: urls.monitoring_images, component: <BeforeAfterImagesPage /> },

  // ── BPM Task queues ───────────────────────────────────────────────────────────
  { path: urls.object_manage, component: <ProcessedObjectList /> },
  { path: urls.user_task_list, component: <MiddleWorkList /> },
  { path: urls.task_assignment, component: <MiddleWorkList /> },
  { path: urls.pending_tasks, component: <PendingWorkList /> },
  { path: urls.completed_tasks, component: <CompletedWorkList /> },
  { path: urls.task_prioritization, component: <PriorityWorkList /> },

  // ── Follow-up Care ────────────────────────────────────────────────────────────
  { path: urls.call_center, component: <DoctorQnAList /> },
  { path: urls.email, component: <EmailList /> },
  { path: urls.warranty, component: <WarrantyList /> },
  { path: urls.warranty_process, component: <WarrantyListProcess /> },
  { path: urls.collect_warranty, component: <CollectWarranty /> },
  { path: urls.detail_warranty, component: <DetailWarranty /> },
  { path: urls.customer_survey, component: <PostExamSurvey /> },
  { path: urls.link_survey, component: <LinkSurvey /> },
  { path: urls.cxmSurvey, component: <CxmSurveyList /> },
  { path: urls.crm_campaign, component: <CrmCampaignList /> },
  { path: urls.feedback_customer, component: <FeedbackCustomer /> },

  // ── Calendar ──────────────────────────────────────────────────────────────────
  { path: urls.calendar_common, component: <ClinicCalendar /> },
  { path: urls.schedule_next, component: <ScheduleNextList /> },
  { path: urls.schedule, component: <TreatmentScheduleList /> },

  // ── Reports ───────────────────────────────────────────────────────────────────
  { path: urls.report_common, component: <MedicalAIStatistics /> },
  { path: urls.report_customer, component: <ReportCustomer /> },
  { path: urls.cashbook, component: <CashBookList /> },
  { path: urls.earnings, component: <EarningList /> },
  { path: urls.payment_history, component: <PaymentHistoryList /> },
  { path: urls.integrated_monitoring, component: <IntegratedMonitoring /> },

  // ── Settings ──────────────────────────────────────────────────────────────────
  { path: urls.setting, component: <SettingList /> },
  { path: urls.setting_account, component: <SettingAccount /> },
  { path: urls.setting_sms, component: <SettingSMSList /> },
  { path: urls.setting_email, component: <SettingEmailList /> },
  { path: urls.setting_zalo, component: <SettingZalo /> },
  { path: urls.setting_basis, component: <ClinicInfoList /> },
  { path: urls.setting_call, component: <SettingCallList /> },
  { path: urls.install_app, component: <SettingIntegration /> },
  { path: urls.setting_cash_book, component: <SettingCashBookList /> },
  { path: urls.setting_dashboard, component: <SettingDashboard /> },
  { path: urls.setting_process, component: <SettingProcess /> },
  { path: urls.setting_code, component: <SettingCode /> },
  { path: urls.manage_data_sharing, component: <ManageDataSharing /> },
  { path: urls.setting_warranty, component: <SettingWarrantyList /> },
  { path: urls.setting_customer, component: <SettingCustomerList /> },
  { path: urls.setting_contact, component: <SettingContactList /> },
  { path: urls.setting_market_research, component: <SettingMarketResearchList /> },
  { path: urls.setting_social_crm, component: <SetttingSocialCrmList /> },
  { path: urls.setting_project, component: <SettingProjectList /> },
  { path: urls.setting_rose, component: <SettingRoseList /> },
  { path: urls.setting_report, component: <SettingReportList /> },

  // ── Social CRM ────────────────────────────────────────────────────────────────
  { path: urls.social_facebook_crm, component: <SocialCrmFacebook /> },
  { path: urls.social_zalo_crm, component: <SocialCrmZalo /> },

  // ── Patient Portal ────────────────────────────────────────────────────────────
  { path: urls.portal_my_journey, component: <MyJourneyPage /> },
  { path: urls.portal_daily_checkin, component: <DailyCheckInPage /> },
  { path: urls.portal_progress_photos, component: <ProgressPhotosPage /> },
  { path: urls.portal_medication, component: <MedicationReminderPage /> },
  { path: urls.portal_followup, component: <FollowupSchedulePage /> },

  // ── Follow-up Center v2 ───────────────────────────────────────────────────────
  { path: urls.followup_dashboard, component: <FollowupDashboardPage /> },
  { path: urls.followup_reminders, component: <ReminderCenterPage /> },
  { path: urls.followup_risk, component: <PatientRiskPage /> },
  { path: urls.followup_lab_results, component: <LabNotificationPage /> },

  // ── Health Monitoring ─────────────────────────────────────────────────────────
  { path: urls.health_monitoring, component: <HealthMonitoringPage /> },

  // ── AI Assistant ──────────────────────────────────────────────────────────────
  { path: urls.ai_followup_assistant, component: <AIFollowupAssistantPage /> },

  // ── Public ────────────────────────────────────────────────────────────────────
  { path: urls.public_connect_zalo, component: <PublicConnectZalo /> },
  { path: urls.manager_work, component: <AppointmentReminder /> },

  // ── Dev ───────────────────────────────────────────────────────────────────────
  { path: urls.test, component: <Test /> },

  // ── Backward-compatibility redirects ──────────────────────────────────────────
  // Old BPM paths → new Treatment Journey paths
  { path: "/bpm/manage_processes", component: <Navigate to={urls.manage_processes} replace /> },
  { path: "/bpm/manage_default_processes", component: <Navigate to={urls.manage_default_processes} replace /> },
  // Old project paths → monitoring
  { path: "/project", component: <Navigate to={urls.project} replace /> },
  // Old customer care paths
  { path: "/customer_care", component: <Navigate to={urls.warranty} replace /> },
];
