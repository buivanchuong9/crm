import React, { useState } from "react";
import TitleAction from "components/titleAction/titleAction";
import "./SettingWorkTime.scss";
import WorkTime from "./WorkTime/WorkTime";
import Holiday from "./Holiday/Holiday";
import Icon from "components/icon";

export default function SettingWorkTime() {
  document.title = "Cài đặt thời gian làm việc";

  const [tab, setTab] = useState<string>("tab_one");
  const [isDetail, setIsDetail] = useState<boolean>(false);

  const menu = [
    {
      title: "Ca làm việc",
      is_tab: "tab_one",
      icon: 'Timer'
    },
    // {
    //     title: "Ngày làm việc đặc biệt",
    //     is_tab: "tab_two",
    // },
    {
      title: "Khai báo ngày nghỉ",
      is_tab: "tab_two",
      icon: 'BellHoliday'
    },
       
  ];

  return (
    <div className="page-content page-setting-work-time card-box">
      {<TitleAction title="Cài đặt thời gian làm việc" />}
      <div className="header_tab">
        {menu.map((item, index) => (
          <div 
            key={index} 
            className={item.is_tab === tab ? "item_tab_active" : "item_tab_inactive"}
            onClick={() => {
              setTab(item.is_tab);
              setIsDetail(true);
            }}
          >
            <Icon name={item.icon}/>
            <span className="label">{item.title}</span>
          </div>
        ))}
        
      </div>
      {/* <div className="d-flex flex-column">
        {!isDetail && (
          <ul className="menu">
            {menu.map((item, idx) => {
              return (
                <li
                  key={idx}
                  className="menu__category"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(item.is_tab);
                    setIsDetail(true);
                  }}
                >
                  {item.title}
                </li>
              );
            })}
          </ul>
        )}
      </div> */}
      {tab === "tab_one" ? (
        <WorkTime
          onBackProps={(isBack) => {
            if (isBack) {
              setIsDetail(false);
            }
          }}
        />
      ) : tab === "tab_two" ? (
        <Holiday
          onBackProps={(isBack) => {
            if (isBack) {
              setIsDetail(false);
            }
          }}
        />
    //   ) : isDetailCategory && tab === "tab_three" ? (
    //     <ObjectAttributeList
    //       onBackProps={(isBack) => {
    //         if (isBack) {
    //           setIsDetailCategory(false);
    //         }
    //       }}
    //     />
      ) : ([])}
    </div>
  );
}
