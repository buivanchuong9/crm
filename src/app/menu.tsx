import React from "react";
import Icon from "components/icon";
import { IMenuItem } from "model/OtherModel";
import urls from "configs/urls";
import { checkSubdomainTNEX } from "./subdomains";

// ============================================================
// DermaHealth v4.0 — User Research Driven Navigation
// Based on survey: Appointment Reminders, Re-examination,
// Health Tracking, Lab Results, Easy Interface
//
// NOTE: title = i18n key suffix only.
// navigation.tsx calls t(`sidebar.${title}`) internally.
// ============================================================

export const menu: IMenuItem[] = [
  // ── 1. DASHBOARD ─────────────────────────────────────────
  {
    title: "dashboard",
    path: urls.dashboard,
    icon: <Icon name="Home" />,
    code: "DASHBOARD",
  },

  // ── 2. PATIENTS ──────────────────────────────────────────
  {
    title: "patients",
    path: urls.customer,
    icon: <Icon name="Customer" />,
    code: "CUSTOMER",
    children: [
      {
        title: "patientProfiles",
        path: urls.customer,
        icon: <Icon name="Profile" />,
        code: "CUSTOMER",
      },
      {
        title: "patientSegments",
        path: urls.customer_segment,
        icon: <Icon name="Profile" />,
        code: "",
      },
    ],
  },

  // ── 3. TREATMENT JOURNEY ─────────────────────────────────
  ...(!checkSubdomainTNEX
    ? [
        {
          title: "treatmentJourneys",
          path: urls.manage_processes,
          icon: <Icon name="ManageWork" />,
          code: "BPM",
          children: [
            {
              title: "journeyTemplates",
              path: urls.manage_default_processes,
              icon: <Icon name="CashBook" />,
              code: "BPM",
            },
            {
              title: "journeyBuilder",
              path: urls.manage_processes,
              icon: <Icon name="CashBook" />,
              code: "BPM",
            },
            {
              title: "activeJourneys",
              path: urls.object_manage,
              icon: <Icon name="ManageWork" />,
              code: "OBJECT_MANAGE",
            },
            {
              title: "treatmentSteps",
              path: urls.user_task_list,
              icon: <Icon name="ManageWork" />,
              code: "WORK_MANAGEMENT",
            },
            {
              title: "journeyConfig",
              path: urls.config_bpm,
              icon: <Icon name="SettingJob" />,
              code: "",
            },
          ],
        },
      ]
    : []),

  // ── 4. FOLLOW-UP CARE ────────────────────────────────────
  // Primary user need: appointment reminders + re-examination reminders
  ...(!checkSubdomainTNEX
    ? [
        {
          title: "followUpCare",
          path: urls.followup_dashboard,
          icon: <Icon name="OnlineConsultation" />,
          code: "CUSTOMER_CARE",
          children: [
            {
              title: "followupDashboard",
              path: urls.followup_dashboard,
              icon: <Icon name="Home" />,
              code: "",
            },
            {
              title: "reminderCenter",
              path: urls.followup_reminders,
              icon: <Icon name="Bell" />,
              code: "",
            },
            {
              title: "patientRisk",
              path: urls.followup_risk,
              icon: <Icon name="KpiCustomer" />,
              code: "",
            },
            {
              title: "labResults",
              path: urls.followup_lab_results,
              icon: <Icon name="ReportFill" />,
              code: "",
            },
            {
              title: "campaigns",
              path: urls.crm_campaign,
              icon: <Icon name="Customer" />,
              code: "CXM_SURVEY",
            },
            {
              title: "surveys",
              path: urls.customer_survey,
              icon: <Icon name="SpeakerNotes" />,
              code: "",
            },
            {
              title: "treatmentCommitment",
              path: urls.warranty,
              icon: <Icon name="ReceiveWarranty" />,
              code: "WARRANTY",
            },
            {
              title: "hotline",
              path: urls.call_center,
              icon: <Icon name="CustomerSupport" />,
              code: "",
            },
            {
              title: "careEmail",
              path: urls.email,
              icon: <Icon name="EmailFill" />,
              code: "",
            },
          ],
        },
      ]
    : []),

  // ── 5. HEALTH MONITORING ─────────────────────────────────
  // Primary user need: patient health tracking
  ...(!checkSubdomainTNEX
    ? [
        {
          title: "monitoring",
          path: urls.health_monitoring,
          icon: <Icon name="ReportFill" />,
          code: "",
          children: [
            {
              title: "healthMonitoring",
              path: urls.health_monitoring,
              icon: <Icon name="Barchart" />,
              code: "",
            },
            {
              title: "progressTracking",
              path: urls.middle_work,
              icon: <Icon name="ManageWork" />,
              code: "WORK_ORDER",
            },
            {
              title: "beforeAfterImages",
              path: urls.monitoring_images,
              icon: <Icon name="Camera" />,
              code: "",
            },
          ],
        },
      ]
    : []),

  // ── 6. AI ASSISTANT ──────────────────────────────────────
  // Outcome-focused: not "AI Studio" but tools patients/doctors care about
  ...(!checkSubdomainTNEX
    ? [
        {
          title: "aiStudio",
          path: urls.ai_followup_assistant,
          icon: <Icon name="Automation" />,
          code: "",
          children: [
            {
              title: "aiFollowupAssistant",
              path: urls.ai_followup_assistant,
              icon: <Icon name="Automation" />,
              code: "",
            },
            {
              title: "aiSkinAssessment",
              path: urls.ai_skin_assessment,
              icon: <Icon name="Statistical" />,
              code: "",
            },
            {
              title: "aiJourneyGenerator",
              path: urls.ai_journey_generator,
              icon: <Icon name="ManageWork" />,
              code: "",
            },
            {
              title: "aiProgressAnalysis",
              path: urls.ai_progress_analysis,
              icon: <Icon name="Barchart" />,
              code: "",
            },
            {
              title: "aiRevisitRisk",
              path: urls.ai_revisit_risk,
              icon: <Icon name="KpiCustomer" />,
              code: "",
            },
          ],
        },
      ]
    : []),

  // ── 7. CALENDAR ──────────────────────────────────────────
  ...(!checkSubdomainTNEX
    ? [
        {
          title: "calendar",
          path: urls.calendar_common,
          icon: <Icon name="CalendarFill" />,
          code: "CALENDAR",
        },
      ]
    : []),

  // ── 8. REPORTS ───────────────────────────────────────────
  ...(!checkSubdomainTNEX
    ? [
        {
          title: "reports",
          path: urls.report,
          icon: <Icon name="ReportFill" />,
          code: "MENU_REPORT",
          children: [
            {
              title: "revenueReport",
              path: urls.report_common,
              icon: <Icon name="Statistical" />,
              code: "",
            },
            {
              title: "customerAnalytics",
              path: urls.report_customer,
              icon: <Icon name="Customer" />,
              code: "",
            },
            {
              title: "cashbook",
              path: urls.cashbook,
              icon: <Icon name="CashBook" />,
              code: "CASHBOOK",
            },
          ],
        },
      ]
    : []),

  // ── 9. SETTINGS ──────────────────────────────────────────
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
              title: "manageDataSharing",
              path: urls.manage_data_sharing,
              icon: (
                <Icon
                  name="FileSharing"
                  style={{ width: 35, height: 35, marginLeft: -5 }}
                />
              ),
              code: "",
            },
          ]
        : []),
    ],
  },
];
