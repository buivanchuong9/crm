import React, { useState, useCallback, useEffect } from "react";
import Icon from "components/icon";
import { getSearchParameters } from "reborn-util";
import TitleAction, { ITitleActions } from "components/titleAction/titleAction";
import { fadeIn, fadeOut } from "reborn-util";
import ProjectManagementList from "pages/MiddleWork/partials/ProjectManagement/ProjectManagementList";
import DetailWork from "pages/MiddleWork/partials/ListWork/partials/DetailWork/DetailWork";
import { IWorkOrderResponseModel } from "model/workOrder/WorkOrderResponseModel";
import "./CompletedWorkList.scss";
import HandleTask from "pages/MiddleWork/partials/ListWork/partials/HandleTask/HandleTask";
import ListCompletedWork from "./ListCompletedWork/ListCompletedWork";

export default function CompletedWorkList() {
  const paramsUrl: any = getSearchParameters();
  const [isFullPage, setIsFullPage] = useState<boolean>(false);
//   const [isRegimeKanban, setIsRegimeKanban] = useState<boolean>(false);
  const [isDetailWork, setIsDetailWork] = useState<boolean>(false);
  const [isVertical, setIsVertical] = useState<boolean>(false);
  const [isRegimeReport, setIsRegimeReport] = useState<boolean>(false);
  const [isHandleTask, setIsHandleTask] = useState<boolean>(false);

  const takeType = Object.keys(paramsUrl).length > 0 && paramsUrl?.workType ? paramsUrl?.workType : "project";
  const [type, setType] = useState<string>(takeType);

  const takeIdOptManagement = Object.keys(paramsUrl).length > 0 && paramsUrl?.opportunityId ? +paramsUrl?.opportunityId : -1;
  const [idOptManagement, setIdOptManagement] = useState<number>(takeIdOptManagement);

  const takeIdProjectManagement = Object.keys(paramsUrl).length > 0 && paramsUrl?.projectId ? +paramsUrl?.projectId : -1;
  const [idProjectManagement, setIdProjectManagement] = useState<number>(takeIdProjectManagement);

  const abortController = new AbortController();

  //! đẩy xuống dưới là do phụ thuộc vào biến ở trên để thay đổi tên
  document.title = `${isDetailWork ? "Chi tiết công việc" :  "Công việc đã hoàn thành"}`;

  const [dataDetaiWork, setDataDetailWork] = useState<IWorkOrderResponseModel>(null);

  const showProjectManagement = () => {
    const overlay = document.querySelector(".project-management");
    if (overlay) {
      const body = document.getElementsByTagName("body")[0];
      if (isRegimeReport) {
        // fadeOut(overlay);
        // body.style.overflow = "";
      } else {
        fadeIn(overlay);
        body.style.overflow = "hidden";
      }
    }
    setIsFullPage(!isFullPage);
  };

  //Export
  const [onShowModalExport, setOnShowModalExport] = useState<boolean>(false);

  const titleActions: ITitleActions = {
    actions: [
    //   ...(isRegimeReport
    //     ? [
    //         {
    //           title: "Quay lại",
    //           icon: <Icon name="ChevronLeft" />,
    //           callback: () => {
    //             setIsRegimeReport(!isRegimeReport);
    //             setIsFullPage(false);
    //           },
    //         },
    //       ]
    //     : []),
    // ],
    // actions_extra: [
    //   {
    //     title: "Xuất danh sách",
    //     icon: <Icon name="Download" />,
    //     callback: () => {
    //       setOnShowModalExport(true);
    //     },
    //   },
    ],
  };


  useEffect(() => {
    setIsFullPage(isRegimeReport);
  }, [isRegimeReport]);

  const handleDetailWork = useCallback(
    (data, totalData) => {
      if (totalData > 6) {
        setIsVertical(true);
      } else {
        setIsVertical(false);
      }
      setDataDetailWork(data);
    },
    [dataDetaiWork]
  );

  useEffect(() => {
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div className="page-content page-completed-work card-box">
        <div className="actions-title">{<TitleAction title={(isDetailWork || isHandleTask) ? 'Công việc' : "Công việc đã hoàn thành"} titleActions={titleActions} />}</div>
    
        <div className={`wrapper-project ${(isDetailWork || isHandleTask) ? "d-none" : ""}`}>
            <div className={`${isFullPage ? "active-fullpage" : ""} list-project ${isVertical ? "show__vertical--work" : ""}`}>
            <ListCompletedWork
                type="process"
                idManagement={idProjectManagement}
                isRegimeKanban={false}
                isRegimeReport={isRegimeReport}
                isFullPage={isFullPage}
                showProjectManagement={showProjectManagement}
                handleDetailWork={handleDetailWork}
                setIsDetailWork={setIsDetailWork}
                setIsHandleTask={setIsHandleTask}
                setIsFullPage={setIsFullPage}
                abortController={abortController}
                isExportWork={onShowModalExport}
                onHideExport={() => setOnShowModalExport(false)}
                setOnShowModalExport={() => {setOnShowModalExport(true)}}
            />
            </div>
        </div>

        <div className={`wrapper__detail--work ${isDetailWork ? "" : "d-none"}`}>
            <div className="action-navigation">
            <div className="action-backup">
                <h1
                  onClick={() => {
                      setIsDetailWork(false);
                      setDataDetailWork(null);
                  }}
                  className="title-first"
                  title="Quay lại"
                >
                  Công việc
                </h1>
                <Icon name="ChevronRight" />
                <h1 className="title-last">Chi tiết công việc</h1>
            </div>
            </div>

            <DetailWork 
              idData={dataDetaiWork?.id} 
              setIsHandleTask={() => {
                setIsHandleTask(true);
                setIsDetailWork(false);
              }}
            />
        </div>

        <div className={`wrapper__handle--work ${isHandleTask ? "" : "d-none"}`}>
            <div className="action-navigation">
            <div className="action-backup">
                <h1
                  onClick={() => {
                    setIsHandleTask(false);
                    setIsDetailWork(true);
                  }}
                  className="title-first"
                  title="Quay lại"
                >
                  Công việc
                </h1>
                <Icon name="ChevronRight" />
                <h1 className="title-last">Xử lý nhiệm vụ</h1>
            </div>
            </div>
            
            {/* <div className="container-form">
            <HandleTask 
                onShow={isHandleTask}
                dataWork={dataDetaiWork} 
            />
            </div> */}
        </div>
    </div>
  );
}
