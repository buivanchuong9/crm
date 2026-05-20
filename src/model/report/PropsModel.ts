import { IMedicalAIStatisticsFilterRequest } from "./ReportRequest";

export interface IMedicalAIStatisticsProps {
  params: IMedicalAIStatisticsFilterRequest;
  callback?: (data) => void;
}
