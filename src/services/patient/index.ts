// Patient domain — barrel re-exports
// Import from here: import CustomerService from "services/patient"
// Individual files remain in services/ for backward compat
export { default as CustomerService } from "../CustomerService";
export { default as CustomerGroupService } from "../CustomerGroupService";
export { default as CustomerAttributeService } from "../CustomerAttributeService";
export { default as CustomerExtraInfoService } from "../CustomerExtraInfoService";
export { default as CustomerFieldService } from "../CustomerFieldService";
export { default as CustomerMarketingLeadService } from "../CustomerMarketingLeadService";
export { default as CustomerSourceService } from "../CustomerSourceService";
export { default as CustomerViewService } from "../CustomerViewService";
export { default as ContactService } from "../ContactService";
export { default as ContactAttributeService } from "../ContactAttributeService";
export { default as ContactExtraInfoService } from "../ContactExtraInfoService";
export { default as ContactPipelineService } from "../ContactPipelineService";
export { default as ContactStatusService } from "../ContactStatusService";
export { default as BlackListService } from "../BlackListService";
export { default as SegmentFilterService } from "../SegmentFilterService";
export { default as TreatmentHistoryService } from "../TreatmentHistoryService";
export { default as ScheduleTreatmentService } from "../ScheduleTreatmentService";
export { default as ScheduleConsultantService } from "../ScheduleConsultantService";
export { default as ScheduleCommonService } from "../ScheduleCommonService";
export { default as DoctorQnAService } from "../DoctorQnAService";
export { default as PaymentHistoryService } from "../PaymentHistoryService";
