import React, { Fragment, useState, useEffect, useMemo, useRef } from "react";
import { IAction, IActionModal } from "model/OtherModel";
import Icon from "components/icon";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/modal/modal";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import { isDifferenceObj, convertToId, getPageOffset } from "reborn-util";

import "./index.scss";
import { showToast } from "utils/common";
import BusinessProcessService from "services/BusinessProcessService";
import { DataPaginationDefault, PaginationProps } from "components/pagination/pagination";
import BoxTable from "components/boxTable/boxTable";
import Loading from "components/loading";
import { SystemNotification } from "components/systemNotification/systemNotification";
import SearchBox from "components/searchBox/searchBox";
import { BulkActionItemModel } from "components/bulkAction/bulkAction";
import ModalProblem from "./ModalProblem/ModalProblem";

export default function ModalDebugProcess({ onShow, onHide, dataProcess }) {
  
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<IContentDialog>(null);
  const [data, setData] = useState(null);
  const [listIdChecked, setListIdChecked] = useState<number[]>([]);
  const [problemInfo, setProblemInfo] = useState(null);
  const [isShowProblem, setIsShowProblem] = useState(false);

  const [tab, setTab] = useState(1);
  const dataTab = [
    {
      value: 1,
      label: 'Danh sách Node'
    },
    {
      value: 3,
      label: 'Danh sách Node bắt đầu'
    },
    {
      value: 2,
      label: 'Danh sách Link Node'
    },
  ]

  const [params, setParams] = useState({
    nodeId: "",
    limit: 10,
    processId: '',
  });  

  const [paramsLink, setParamsLink] = useState({
    fromNodeId: "",
    limit: 10,
    processId: '',
  });  

  const [paramsStart, setParamsStart] = useState({
    nodeId: "",
    limit: 10,
    processId: '',
  });  

  useEffect(() => {
      if(dataProcess && onShow){
          setParams((preState) => ({...preState, 
                                      processId: dataProcess?.id, 
                                    }))
          setParamsLink((preState) => ({...preState, 
                                        processId: dataProcess?.id, 
                                      }))       
          setParamsStart((preState) => ({...preState, 
                                        processId: dataProcess?.id, 
                                      }))                                                     
      }
  }, [dataProcess, onShow])

  const [pagination, setPagination] = useState<PaginationProps>({
      ...DataPaginationDefault,
      name: "",
      isChooseSizeLimit: true,
      setPage: (page) => {
          setParams((prevParams) => ({ ...prevParams, page: page }));
      },
      chooseSizeLimit: (limit) => {
          setParams((prevParams) => ({ ...prevParams, limit: limit }));
      },
  });

  const [paginationLink, setPaginationLink] = useState<PaginationProps>({
    ...DataPaginationDefault,
    name: "",
    isChooseSizeLimit: true,
    setPage: (page) => {
        setParamsLink((prevParams) => ({ ...prevParams, page: page }));
    },
    chooseSizeLimit: (limit) => {
        setParamsLink((prevParams) => ({ ...prevParams, limit: limit }));
    },
  });

  const [paginationStart, setPaginationStart] = useState<PaginationProps>({
    ...DataPaginationDefault,
    name: "",
    isChooseSizeLimit: true,
    setPage: (page) => {
        setParamsStart((prevParams) => ({ ...prevParams, page: page }));
    },
    chooseSizeLimit: (limit) => {
        setParamsStart((prevParams) => ({ ...prevParams, limit: limit }));
    },
  });


  const [nodeList, setNodeList] = useState([]);
  const [nodeStartList, setNodeStartList] = useState([]);
  const [linkNodeList, setLinkNodeList] = useState([]);

  const abortController = new AbortController();

  const getListNode= async (paramsSearch: any) => {
      setIsLoading(true);

      const response = await BusinessProcessService.debugListNodeProcess(paramsSearch, abortController.signal);

      if (response.code == 0) {
          const result = response.result;
          setNodeList(result.items);

          setPagination({
              ...pagination,
              page: +result.page,
              sizeLimit: params.limit ?? DataPaginationDefault.sizeLimit,
              totalItem: +result.total,
              totalPage: Math.ceil(+result.total / +(params.limit ?? DataPaginationDefault.sizeLimit)),
          });

      
      } else {
          showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
      }
      setIsLoading(false);
  };

  const getListNodeStart= async (paramsSearch: any) => {
    setIsLoading(true);

    const response = await BusinessProcessService.debugListNodeStartProcess(paramsSearch, abortController.signal);

    if (response.code == 0) {
        const result = response.result;
        setNodeStartList(result.items);

        setPaginationStart({
            ...paginationStart,
            page: +result.page,
            sizeLimit: paramsStart.limit ?? DataPaginationDefault.sizeLimit,
            totalItem: +result.total,
            totalPage: Math.ceil(+result.total / +(params.limit ?? DataPaginationDefault.sizeLimit)),
        });

    
    } else {
        showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
    setIsLoading(false);
};

  const getListLinkNode= async (paramsSearch: any) => {
    setIsLoading(true);

    const response = await BusinessProcessService.debugListLinkNodeProcess(paramsSearch, abortController.signal);

    if (response.code == 0) {
        const result = response.result;
        setLinkNodeList(result.items);

        setPaginationLink({
            ...paginationLink,
            page: +result.page,
            sizeLimit: paramsLink.limit ?? DataPaginationDefault.sizeLimit,
            totalItem: +result.total,
            totalPage: Math.ceil(+result.total / +(paramsLink.limit ?? DataPaginationDefault.sizeLimit)),
        });

    
    } else {
        showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
    setIsLoading(false);
};

  useEffect(() => {
    if(onShow && params.processId){
        if(tab === 1){
            getListNode(params);
        } else if (tab === 2) {
            getListLinkNode(paramsLink);
        } else {
          getListNodeStart(paramsStart);
        }
    }
      
  }, [params, paramsStart, onShow, dataProcess, paramsLink, tab])

  const titlesNode = ["STT","NodeName", "NodeId", "TypeNode", "Đã có trong DB", "Đã có trong thiết kế", ...(tab === 3 ? ['Active'] : []), "Vấn đề khác", "ProcessId"];
  const dataFormatNode = [ "text-center", "", "", "", "text-center", "text-center", "text-center", "text-center"];

  const titlesLinkNode = ["STT","LinkId", "FlowType", "FromNodeId", "ToNodeId", "Đã có trong DB", "Đã có trong thiết kế", "ProcessId"];
  const dataFormatLinkNode = [ "text-center", "", "", "", "", "text-center", "text-center"];

  const dataMappingArray = (item: any, index: number, type) => [
      
      ...(type === 'node' 
      ? 
        [
          getPageOffset(params) + index + 1,
          item.name,
          item.nodeId,
          item.typeNode,
          <div>
              {item.notYetDb ? 
                  <Icon name='Times' style={{width: 20, fill:'var(--error-color'}} />
                  :
                  <Icon name='Checked' style={{width: 20, fill:'var(--success-color'}} />
              }
          </div>,
          <div>
              {item.notYetDesign ? 
                  <Icon name='Times' style={{width: 20, fill:'var(--error-color'}} />
                  :
                  <Icon name='Checked' style={{width: 20, fill:'var(--success-color'}} />
              }
          </div>,
          ...(tab === 3 ? [
            <div>
              {item.isActive ? 
                <Icon name='Times' style={{width: 20, fill:'var(--error-color'}} />
                :
                <Icon name='Checked' style={{width: 20, fill:'var(--success-color'}} />
              }
            </div>
          ] : []),
          <div>
            {item.hasProblem ? 
              <div style={{display: 'flex', gap: '0 0.5rem'}}>
                <Icon name='Times' style={{width: 20, fill:'var(--error-color'}} />
                <a
                  key={item.id}
                  onClick={() => {
                    setProblemInfo(item.problemInfo);
                    setIsShowProblem(true);
                  }}
                >
                  Xem
                </a>
              </div>  
              :
              <Icon name='Checked' style={{width: 20, fill:'var(--success-color'}} />         
            }
          </div>,
          item.processId
        ] 
      : 
        [
          getPageOffset(paramsLink) + index + 1,
          item.linkId,
          item.flowType,
          item.fromNodeId,
          item.toNodeId,
          <div>
              {item.notYetDb ? 
                  <Icon name='Times' style={{width: 20, fill:'var(--error-color'}} />
                  :
                  <Icon name='Checked' style={{width: 20, fill:'var(--success-color'}} />
              }
          </div>,
          <div>
              {item.notYetDesign ? 
                  <Icon name='Times' style={{width: 20, fill:'var(--error-color'}} />
                  :
                  <Icon name='Checked' style={{width: 20, fill:'var(--success-color'}} />
              }
          </div>,
          item.processId
        ]
    ),
      
  ];

  const actionsTable = (item: any): IAction[] => {
      
      return [
        ...(item.notYetDb && !item.notYetDesign ? [
          {
            title: tab === 1 || tab === 3 ? 'Lưu Node vào CSDL' : 'Lưu Link vào CSDL',
            icon: <Icon name="CheckedCircle" />,
            callback: () => {
              showDialogConfirmSave(item);
            },
          },
        ] : []),
        //   {
        //       title: tab === 1 ? 'Lưu Node vào CSDL' : 'Lưu Link vào CSDL',
        //       icon: <Icon name="CheckedCircle" />,
        //       callback: () => {
        //         showDialogConfirmSave(item);
        //       },
        //   },
          {
              title: "Xóa",
              icon: <Icon name="Trash" className="icon-error" />,
              callback: () => {
                  showDialogConfirmDelete(item);
              },
          },
      ];
  };

  const showDialogConfirmDelete = (item?: any) => {
      const contentDialog: IContentDialog = {
        color: "error",
        className: "dialog-delete",
        isCentered: true,
        isLoading: true,
        title: <Fragment>Xóa...</Fragment>,
        message: (
          <Fragment>
            Bạn có chắc chắn muốn xóa {item ? '' : `${listIdChecked.length}`} {(tab === 1 || tab === 3) ? 'Node' : 'Link'} đã chọn {item ? <strong>{tab === 1 ? (item.name || item.nodeId) : item.linkId}</strong> : ""}? Thao tác này không thể khôi phục.
          </Fragment>
        ),
        cancelText: "Hủy",
        cancelAction: () => {
          setShowDialog(false);
          setContentDialog(null);
        },
        defaultText: "Xóa",
        defaultAction: async () => {
            if(tab === 1 || tab === 3){
                const response = await BusinessProcessService.bpmDeleteNode(item.nodeId);
                if (response.code === 0) {
                  showToast(`Xóa Node thành công`, "success");
                  getListNode(params)
                } else {
                    showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
                }
            } else {
                const param = {
                  ...(item.linkId ? {linkId: item.linkId} : {}),
                  fromNodeId: item.fromNodeId,
                  toNodeId: item.toNodeId
                }
                const response = await BusinessProcessService.bpmDeleteLinkNode(param);
                if (response.code === 0) {
                showToast(`Xóa Link thành công`, "success");
                getListLinkNode(paramsLink)
                } else {
                    showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
                }
            }
            
            setShowDialog(false);
            setContentDialog(null);
        },
      };
      setContentDialog(contentDialog);
      setShowDialog(true);
  };

  const showDialogConfirmSave = (item?: any) => {
    const contentDialog: IContentDialog = {
      color: "warning",
      className: "dialog-warning",
      isCentered: true,
      isLoading: true,
      title: <Fragment>Lưu vào CSDL...</Fragment>,
      message: (
        <Fragment>
          Bạn có chắc chắn muốn lưu {(tab === 1 || tab === 3) ? 'Node' : 'Link'} đã chọn {item ? <strong>{item.name}</strong> : ""} vào CSDL?
        </Fragment>
      ),
      cancelText: "Hủy",
      cancelAction: () => {
        setShowDialog(false);
        setContentDialog(null);
      },
      defaultText: "Lưu",
      defaultAction: async () => {
          if(tab === 1){
            addNode(item);
          } else {
            addLinkNode(item)
          }
          
          setShowDialog(false);
          setContentDialog(null);
      },
    };
    setContentDialog(contentDialog);
    setShowDialog(true);
};

  const addNode = async (element) => {
    const body = {
      name: element.name,
      typeNode: element.typeNode,
      processId: element?.processId,
      nodeId: element.nodeId
    }
    const response = await BusinessProcessService.bpmAddNode(body);

    if (response.code == 0) {
      const result = response.result;
      showToast("Thêm Node vào CSDL thành công", "success");
      getListNode(params);
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
  };

  const addLinkNode = async (element) => {
    const body = {
      fromNodeId: element?.fromNodeId,
      toNodeId: element?.toNodeId,
      flowType: element?.flowType,
      config: element?.config,
      processId: element?.processId,
      linkId: element.linkId,
    }
    if(body.fromNodeId && body.fromNodeId){
      const response = await BusinessProcessService.bpmAddLinkNode(body);

      if (response.code == 0) {
        const result = response.result;
        showToast("Thêm Link vào CSDL thành công", "success");
        getListLinkNode(paramsLink);
      } else {
        showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
      }
    }
  };

  const actions = useMemo<IActionModal>(
      () => ({
        actions_right: {
          buttons: [
            {
              title: "Đóng",
              color: "primary",
              variant: "outline",
              callback: () => {
                handleClearForm();
              },
            },
          //   {
          //     title:  "Xác nhận",
          //     // type: "submit",
          //     color: "primary",
          //     disabled: lstAttributeSelected?.length > 0 ? false : true,
          //     // is_loading: isSubmit,
          //     callback: () => {
          //       handleSubmit(lstAttributeSelected)
          //     },
          //   },
          ],
        },
      }),
      []
    );

  const handleClearForm = () => {
    onHide(false);
    setTab(1);
    setNodeList([]);
    setNodeStartList([]);
    setParams({
      nodeId: "",
      limit: 10,
      processId: '',
    });
    setParamsStart({
      nodeId: "",
      limit: 10,
      processId: '',
    })
    setParamsLink({
        fromNodeId: "",
        limit: 10,
        processId: '',
      })
  };

  const bulkActionList: BulkActionItemModel[] = [
    {
      title: "Xóa",
      callback: () => showDialogConfirmDelete(),
    },
  ];

  return (
    <Fragment>
      <Modal
        isFade={true}
        isOpen={onShow}
        isCentered={true}
        staticBackdrop={true}
        size="xxl"
        toggle={() => !isSubmit && handleClearForm()}
        className="modal-debug-process"
      >
        <form className="form-debug-process">
          <ModalHeader title={`Debug (ProcessId: ${dataProcess?.id})`} toggle={() => !isSubmit && handleClearForm()} />
          <ModalBody>
              <div style={{display: 'flex', marginTop: '1rem', marginLeft: '2rem'}}>
                {dataTab.map((item, index) => (
                    <div 
                      key={index}
                      style={{borderBottom: tab === item.value ? '1px solid' : '', paddingLeft: 12, paddingRight: 12, paddingBottom: 3, cursor:'pointer'}}
                      onClick = {() => {
                        setTab(item.value);
                        setListIdChecked([]);
                      }}
                  >
                      <span style={{fontSize: 16, fontWeight:'500', color: tab === item.value ? '' : '#d3d5d7'}}>{item.label}</span>
                  </div>
                ))}
              </div>
                <div style={{maxHeight:'48rem', overflow:'auto'}}>
                    <SearchBox
                        name={(tab === 1 || tab === 3) ? "nodeId" : 'fromNodeId'}
                        params={tab === 1 ? params : tab === 3 ? paramsStart : paramsLink}
                        isSaveSearch={false}
                        // listSaveSearch={listSaveSearch}
                        updateParams={(paramsNew) => {
                            if(tab === 1){
                                setParams(paramsNew)
                            } else if(tab === 2) {
                                setParamsLink(paramsNew)
                            } else {
                              setParamsStart(paramsNew)
                            }
                        }}
                    />
                    {!isLoading && (tab === 1 ? (nodeList  && nodeList.length > 0) : tab === 3 ? (nodeStartList  && nodeStartList.length > 0) : (linkNodeList  && linkNodeList.length > 0)) ? (
                        <BoxTable
                            name="Danh sách Node"
                            titles={(tab === 1 || tab === 3) ? titlesNode : titlesLinkNode}
                            items={tab === 1 ? nodeList : tab === 3 ? nodeStartList : linkNodeList}
                            isPagination={true}
                            dataPagination={tab === 1 ? pagination : tab === 3 ? paginationStart : paginationLink}
                            dataMappingArray={(item, index) => dataMappingArray(item, index, (tab === 1 || tab === 3) ? 'node' : 'link')}
                            dataFormat={(tab === 1 || tab === 3) ? dataFormatNode : dataFormatLinkNode}
                            listIdChecked={listIdChecked}
                            isBulkAction={false}
                            bulkActionItems={bulkActionList}
                            striped={true}
                            setListIdChecked={(listId) => setListIdChecked(listId)}
                            actions={actionsTable}
                            actionType="inline"
                        />
                        ) : isLoading ? (
                        <Loading />
                        ) : (
                        <SystemNotification description={<span>Hiện tại chưa có {(tab === 1 || tab === 3) ? 'Node' : 'Link'} nào.</span>} type="no-item" />
                    )}
                </div>            
          </ModalBody>
          <ModalFooter actions={actions} />
        </form>
      </Modal>
      <Dialog content={contentDialog} isOpen={showDialog} />

      <ModalProblem
        onShow={isShowProblem}
        problemInfo={problemInfo}
        onHide={(reload) => {
          if (reload) {
            // getListOjectGroup(params);
          }
          setIsShowProblem(false);
        }}
      />
    </Fragment>
  );
}
