import React, { useState } from "react";
import "./index.scss";
import ListWork from "./partials/ListWork";
import { lstTitleHeader } from "./constant";
import KanbanProcess from "./partials/KanbanProcess";

export default function AppointmentReminder() {
  const takeActiveTitleHeaderAppointmentReminder = localStorage.getItem("activeTitleHeaderAppointmentReminder");
  const takeActiveTitleViewBy = localStorage.getItem("activeTitleViewBy");

  const [activeTitleHeader, setActiveTitleHeader] = useState(takeActiveTitleHeaderAppointmentReminder ? parseInt(takeActiveTitleHeaderAppointmentReminder) : 3);
  const [activeTitleViewBy, setActiveTitleViewBy] = useState(takeActiveTitleViewBy ? parseInt(takeActiveTitleViewBy) : 1);
  const [params, setParams] = useState<any>({
    fromTime: "",
    toTime: "",
  });

  const [lstTitleViewBy, setLstTitleViewBy] = useState([
    {
      name: "Danh sách lịch khám",
      type: 1,
    },
    {
      name: "Bước xử lý lịch khám",
      type: 2,
    },
    {
      name: "Trạng thái lịch khám",
      type: 3,
    },
  ]);

  const handleChangeActiveTitleHeader = (item: any) => {
    setActiveTitleHeader(item.type);
    localStorage.setItem("activeTitleHeaderAppointmentReminder", item.type.toString()); // Lưu item.type vào localStorage
  };

  return (
    <div className="manager-work">
      <div className="search__box--manager-work">
        <ul className="line__height--manager-work">
          {lstTitleHeader.map((item, idx) => {
            return (
              <li
                key={idx}
                className={`item-title ${activeTitleHeader === item.type ? "active__item--title" : ""}`}
                onClick={() => {
                  handleChangeActiveTitleHeader(item);
                }}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
        {activeTitleHeader !== 1 ? (
          <ul className="line__height--manager-work">
            {lstTitleViewBy.map((item, idx) => {
              return (
                <li
                  key={idx}
                  className={`item-title ${activeTitleViewBy === item.type ? "active__item--title" : ""}`}
                  onClick={() => {
                    setActiveTitleViewBy(item.type);
                    localStorage.setItem("activeTitleViewBy", item.type.toString()); // Lưu item.type vào localStorage
                  }}
                >
                  {item.name}
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
      {activeTitleHeader === 1 ? (
        <div className="overview-report-manager-work">Tổng quan và báo cáo</div>
      ) : (
        <>
          {activeTitleViewBy === 1 ? (
            <ListWork activeTitleHeader={activeTitleHeader} />
          ) : activeTitleViewBy === 2 ? (
            <div className="step-process-work">
              <KanbanProcess processCode={"QTQLCV"} />
            </div>
          ) : activeTitleViewBy === 3 ? (
            <div className="status-work">KANBAN theo Trạng thái lịch khám (số cột cố định)</div>
          ) : null}
        </>
      )}
    </div>
  );
}
