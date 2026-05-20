import React, { useEffect, useState } from "react";
import { IMedicalAIStatisticsProps } from "model/report/PropsModel";
import { IMedicalAIStatisticsFilterRequest } from "model/report/ReportRequest";
import { IReportCityResponse } from "model/report/ReportResponse";
import CustomChartBasic from "components/customChartBasic/customChartBasic";
import ReportService from "services/ReportService";
import { showToast } from "utils/common";
import "./ReportCity.scss";

export default function ReportCity(props: IMedicalAIStatisticsProps) {
  const { params } = props;

  const [lstCity, setLstCity] = useState<IReportCityResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [maxTotalCity, setMaxTotalCity] = useState<number>(0);

  const getCity = async (paramsSearch: IMedicalAIStatisticsFilterRequest) => {
    setIsLoading(true);

    const response = await ReportService.city(paramsSearch);

    if (response.code == 0) {
      const result = response.result;

      setLstCity(result);
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (params.fromTime && params.toTime) {
      getCity(params);
    }
  }, [params]);

  useEffect(() => {
    let takeMaxTotalCity = 0;

    if (lstCity.length > 0) {
      lstCity.filter((item) => {
        if (takeMaxTotalCity < item.amount) {
          return (takeMaxTotalCity = item.amount);
        }
      });

      setMaxTotalCity(takeMaxTotalCity);
    }
  }, [lstCity]);

  return (
    <div className="page__report--city">
      <CustomChartBasic isLoading={isLoading} lstData={lstCity} totalMax={maxTotalCity} nameNotification="chi nhánh" />
    </div>
  );
}
