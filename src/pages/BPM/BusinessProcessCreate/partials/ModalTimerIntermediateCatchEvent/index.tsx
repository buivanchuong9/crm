import React, { Fragment, useState, useEffect, useMemo } from "react";
import { IActionModal } from "model/OtherModel";
import Modal, { ModalBody, ModalFooter } from "components/modal/modal";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import { isDifferenceObj } from "reborn-util";
import "./index.scss";
import Input from "components/input/input";
import SelectCustom from "components/selectCustom/selectCustom";
import TextArea from "components/textarea/textarea";
import NummericInput from "components/input/numericInput";
import RadioList from "components/radio/radioList";
import BusinessProcessService from "services/BusinessProcessService";
import { showToast } from "utils/common";
import ModalSetting from "../ModalUserTask/partials/ModalSetting";
import ModalSelectNodeOther from "../ModalSelectNodeOther";
import ModalDebug from "../ModalUserTask/partials/ModalDebug";
import DatePickerCustom from "components/datepickerCustom/datepickerCustom";
import moment from "moment";
import Checkbox from "components/checkbox/checkbox";
import ListButtonHeader from "../../components/ListButtonHeader/ListButtonHeader";
import CycleConfig from "../../components/CycleConfig";

export default function ModalTimerIntermediateCatchEvent({ onShow, onHide, dataNode, processId, changeNameNodeXML, disable }) {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<IContentDialog>(null);
  const [isModalClone, setIsModalClone] = useState(false);
  const [isModalSetting, setIsModalSetting] = useState(false);
  const [isModalDebug, setIsModalDebug] = useState(false);
  const [data, setData] = useState(null);
  const [childProcessId, setChildProcessId] = useState(null);
  const [config, setConfig] = useState(null);

  useEffect(() => {
    if (dataNode && onShow) {
      getDetailTask(dataNode.id);
      if (dataNode?.businessObject?.$parent?.id && dataNode.businessObject?.$parent?.$type === "bpmn:SubProcess") {
        getDetailNode(dataNode?.id);
      }
    }
  }, [dataNode, onShow]);

  const getDetailNode = async (nodeId) => {
    const response = await BusinessProcessService.bpmDetailNode(nodeId);

    if (response.code == 0) {
      const result = response.result;
      setChildProcessId(result?.processId);
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
  };

  const [repeatDuration, setRepeatDuration] = useState({
    year: "",
    month: "",
    week: "",
    day: "",
    hour: "",
    minute: "",
    second: "",
  });

  const getDetailTask = async (id) => {
    const response = await BusinessProcessService.detailTimerIntermediateCatchEvent(id);

    if (response.code == 0) {
      const result = response.result;
      const configData = JSON.parse(result.config) || [];
      let configDefault = {
        year: [],
        quarter: [],
        month: [],
        week: [],
        day: [],
        hour: [],
        minute: [],
        second: [],
      };
      let _configData = [];
      if (configData.length > 0 && Array.isArray(configData)) {
        configData.forEach((item) => {
          configDefault = {
            year: item.year && item.year != "" ? item.year.split(",").map((i) => ({ label: parseInt(i), value: parseInt(i) })) : [],
            quarter: item.quarter && item.quarter != "" ? item.quarter.split(",").map((i) => ({ label: parseInt(i), value: parseInt(i) })) : [],
            month: item.month && item.month != "" ? item.month.split(",").map((i) => ({ label: parseInt(i), value: parseInt(i) })) : [],
            week: item.dayOfWeek && item.dayOfWeek != "" ? item.dayOfWeek.split(",").map((i) => ({ label: parseInt(i), value: parseInt(i) })) : [],
            day: item.dayOfMonth && item.dayOfMonth != "" ? item.dayOfMonth.split(",").map((i) => ({ label: parseInt(i), value: parseInt(i) })) : [],
            hour: item.hour && item.hour != "" ? item.hour.split(",").map((i) => ({ label: parseInt(i), value: parseInt(i) })) : [],
            minute: item.minute && item.minute != "" ? item.minute.split(",").map((i) => ({ label: parseInt(i), value: parseInt(i) })) : [],
            second: item.second && item.second != "" ? item.second.split(",").map((i) => ({ label: parseInt(i), value: parseInt(i) })) : [],
          };
          _configData.push(configDefault);
        });
      }

      const _repeatDuration = JSON.parse(result.repeatDuration) || null;
      if (_repeatDuration) {
        setRepeatDuration(_repeatDuration);
      }

      if (configData) {
        if (result.timerType === "Cycle" && _configData.length > 0) {
          setConfig(_configData);
        } else {
          setConfig(configData);
        }
      } else {
        setConfig({ date: "" });
      }
      const data = {
        ...result,
      };
      setData(data);
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
  };

  const values = useMemo(
    () => ({
      id: null,
      name: data?.name ?? "",
      code: data?.code ?? "",
      description: data?.description ?? "",
      // timerType: data?.timerType ?? "Cycle",
      timerType: data?.timerType ?? "Date",
      config: data?.config ?? "",
      nodeId: dataNode?.id ?? null,
      processId: childProcessId ?? processId ?? null,
      workflowId: data?.workflowId ?? null,
      start: data?.start ?? null,
      executionCount: data?.executionCount ?? null,
    }),
    [onShow, data, processId, dataNode, childProcessId]
  );

  const [formData, setFormData] = useState(values);

  useEffect(() => {
    setFormData(values);

    return () => {
      setIsSubmit(false);
    };
  }, [values]);

  const onSubmit = async (e) => {
    e.preventDefault();

    setIsSubmit(true);
    let configCylce = [];
    if (formData?.timerType == "Cycle" && config?.length) {
      configCylce = config?.map((item) => {
        let itemCylce = {
          second: item.second.map((i) => i.value).join(",") || null,
          minute: item.minute.map((i) => i.value).join(",") || null,
          hour: item.hour.map((i) => i.value).join(",") || null,
          dayOfMonth: item.day.map((i) => i.value).join(",") || null,
          month: item.month.map((i) => i.value).join(",") || null,
          dayOfWeek: item.week.map((i) => i.value).join(",") || null,
          year: item.year.map((i) => i.value).join(",") || null,
        };

        return itemCylce;
      });
    }

    const body = {
      id: data?.id ?? null,
      name: formData.name ?? "",
      code: formData?.code ?? "",
      description: formData?.description ?? "",
      timerType: formData?.timerType ?? "",
      config: formData?.timerType == "Cycle" ? JSON.stringify(configCylce) : JSON.stringify(config) ?? "",
      nodeId: dataNode?.id ?? null,
      processId: formData?.processId ?? null,
      workflowId: formData?.workflowId ?? null,
      start: formData?.start ?? null,
      executionCount: formData?.executionCount ?? null,
      repeatDuration: JSON.stringify(repeatDuration),
    };

    const response = await BusinessProcessService.updateTimerIntermediateCatchEvent(body);

    if (response.code === 0) {
      showToast(`Cập nhật biểu mẫu thành công`, "success");
      handleClear(false);
      changeNameNodeXML(dataNode, body.name);
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
      setIsSubmit(false);
    }
  };

  const actions = useMemo<IActionModal>(
    () => ({
      actions_right: {
        buttons: [
          {
            title: disable ? "Đóng" : "Hủy",
            color: "primary",
            variant: "outline",
            disabled: isSubmit,
            callback: () => {
              !isDifferenceObj(formData, values) ? handleClear(false) : showDialogConfirmCancel();
            },
          },
          ...(disable
            ? []
            : ([
                {
                  title: "Cập nhật",
                  type: "submit",
                  color: "primary",
                  disabled: isSubmit,
                  // || !isDifferenceObj(formData, values),
                  is_loading: isSubmit,
                },
              ] as any)),
        ],
      },
    }),
    [formData, values, isSubmit, disable]
  );

  const showDialogConfirmCancel = () => {
    const contentDialog: IContentDialog = {
      color: "warning",
      className: "dialog-cancel",
      isCentered: true,
      isLoading: false,
      title: <Fragment>{`Hủy bỏ thao tác ${data ? "chỉnh sửa" : "thêm mới"}`}</Fragment>,
      message: <Fragment>Bạn có chắc chắn muốn hủy bỏ? Thao tác này không thể khôi phục.</Fragment>,
      cancelText: "Quay lại",
      cancelAction: () => {
        setShowDialog(false);
        setContentDialog(null);
      },
      defaultText: "Xác nhận",
      defaultAction: () => {
        handleClear(false);
        setShowDialog(false);
        setContentDialog(null);
      },
    };
    setContentDialog(contentDialog);
    setShowDialog(true);
  };

  const handleClear = (acc) => {
    onHide(acc);
    setData(null);
    setConfig(null);
    setRepeatDuration({
      year: "",
      month: "",
      week: "",
      day: "",
      hour: "",
      minute: "",
      second: "",
    });
  };

  const optionTime = [
    {
      label: "Theo giây",
      value: "second",
    },
    {
      label: "Theo phút",
      value: "minute",
    },
    {
      label: "Theo giờ",
      value: "hour",
    },
    {
      label: "Theo ngày",
      value: "day",
    },
    {
      label: "Theo ngày tuần",
      value: "week",
    },
    {
      label: "Theo tháng",
      value: "month",
    },
    {
      label: "Theo năm",
      value: "year",
    },
    // {
    //   label: "Tuỳ chỉnh nâng cao",
    //   value: "advance",
    // },
  ];

  return (
    <Fragment>
      <Modal
        isFade={true}
        isOpen={onShow}
        isCentered={true}
        staticBackdrop={true}
        size="xl"
        toggle={() => !isSubmit && handleClear(false)}
        className="modal-timer-start-event-task"
      >
        <form className="form-timer-start-event-task" onSubmit={(e) => onSubmit(e)}>
          {/* <CronConfigUI /> */}
          <div className="container-header">
            <div className="box-title">
              <h4>{"Cài đặt nhiệm vụ"}</h4>
            </div>

            <ListButtonHeader
              data={data}
              dataNode={dataNode}
              processId={processId}
              disable={disable}
              isSubmit={isSubmit}
              setIsModalClone={() => setIsModalClone(true)}
              setIsModalSetting={() => setIsModalSetting(true)}
              setIsModalDebug={() => setIsModalDebug(true)}
              handleClear={() => handleClear(false)}
            />
          </div>
          <ModalBody>
            <div className="list-form-group">
              <div className="form-group">
                <Input
                  id="name"
                  name="name"
                  label="Tên nhiệm vụ"
                  fill={true}
                  required={true}
                  placeholder={"Tên nhiệm vụ"}
                  value={formData.name}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ ...formData, name: value });
                  }}
                />
              </div>

              <div className="form-group">
                <Input
                  id="code"
                  name="code"
                  label="Mã nhiệm vụ"
                  fill={true}
                  required={false}
                  placeholder={"Mã nhiệm vụ"}
                  value={formData.code}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ ...formData, code: value });
                  }}
                />
              </div>

              <div className="form-group">
                <TextArea
                  name="description"
                  value={formData.description}
                  label="Mô tả nhiệm vụ"
                  fill={true}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ ...formData, description: value });
                  }}
                  placeholder="Nhập mô tả"
                />
              </div>

              <div className="form-group">
                <SelectCustom
                  id="timerType"
                  name="timerType"
                  label="Loại timer"
                  fill={true}
                  special={true}
                  required={true}
                  options={[
                    {
                      value: "Date",
                      label: "Date",
                    },
                    {
                      value: "Duration",
                      label: "Duration",
                    },
                    {
                      value: "Cycle",
                      label: "Cycle",
                    },
                  ]}
                  value={formData.timerType ? { value: formData.timerType, label: formData.timerType } : null}
                  onChange={(e) => {
                    setFormData({ ...formData, timerType: e.value });
                    if (e.value === "Date") {
                      setConfig({ date: "" });
                    }
                    if (e.value === "Duration") {
                      setConfig({ day: "", hour: "", minute: "", second: "" });
                    }
                    if (e.value === "Cycle") {
                      setConfig([
                        {
                          year: [],
                          quarter: [],
                          month: [],
                          week: [],
                          day: [],
                          hour: [],
                          minute: [],
                          second: [],
                        },
                      ]);
                    }
                  }}
                  // isAsyncPaginate={false}
                  // isFormatOptionLabel={false}
                  placeholder="Chọn loại timer"
                />
              </div>

              {formData.timerType === "Date" && config ? (
                <div className="form-group">
                  <DatePickerCustom
                    label="Cấu hình thời gian"
                    name="date"
                    fill={true}
                    required={false}
                    isFmtText={true}
                    value={config.date ? moment(config.date).format("DD/MM/YYYY HH:mm:ss") : ""}
                    onChange={(e) => {
                      setConfig({ ...config, date: e });
                    }}
                    hasSelectTime={true}
                    timeIntervals={15}
                    placeholder="DD/MM/YYYY"
                  />
                </div>
              ) : null}

              {formData.timerType === "Duration" && config ? (
                <div className="box_line_date">
                  <span className="title_time">Cấu hình thời gian</span>
                  <div className="box_setting_time">
                    <div className="box_time">
                      <div className="form-group">
                        <NummericInput
                          name="score"
                          id="score"
                          fill={false}
                          value={config.day}
                          onChange={(e) => {
                            const value = e.target.value || "";
                            setConfig({ ...config, day: value });
                          }}
                        />
                      </div>
                      <div>
                        <span className="title_time">ngày</span>
                      </div>
                    </div>

                    <div className="box_time">
                      <div className="form-group">
                        <NummericInput
                          name="score"
                          id="score"
                          fill={false}
                          value={config.hour}
                          onChange={(e) => {
                            const value = e.target.value || "";
                            setConfig({ ...config, hour: value });
                          }}
                        />
                      </div>
                      <div>
                        <span className="title_time">giờ</span>
                      </div>
                    </div>

                    <div className="box_time">
                      <div className="form-group">
                        <NummericInput
                          name="score"
                          id="score"
                          fill={false}
                          value={config.minute}
                          onChange={(e) => {
                            const value = e.target.value || "";
                            setConfig({ ...config, minute: value });
                          }}
                        />
                      </div>
                      <div>
                        <span className="title_time">phút</span>
                      </div>
                    </div>

                    <div className="box_time">
                      <div className="form-group">
                        <NummericInput
                          name="second"
                          id="second"
                          fill={false}
                          value={config.second}
                          onChange={(e) => {
                            const value = e.target.value || "";
                            setConfig({ ...config, second: value });
                          }}
                        />
                      </div>
                      <div>
                        <span className="title_time">giây</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              {formData.timerType === "Cycle" ? (
                <div className="box-cycle">
                  <CycleConfig
                    setFormData={setFormData}
                    formData={formData}
                    repeatDuration={repeatDuration}
                    setRepeatDuration={setRepeatDuration}
                    config={config}
                    setConfig={setConfig}
                  />
                </div>
              ) : null}
            </div>
          </ModalBody>
          <ModalFooter actions={actions} />
        </form>
      </Modal>

      <Dialog content={contentDialog} isOpen={showDialog} />
      <ModalSetting
        onShow={isModalSetting}
        dataNode={dataNode}
        processId={childProcessId || processId}
        onHide={(reload) => {
          if (reload) {
            // getListOjectGroup(params);
          }
          setIsModalSetting(false);
        }}
      />
      <ModalSelectNodeOther
        onShow={isModalClone}
        data={dataNode}
        processId={childProcessId || processId}
        onHide={(reload) => {
          if (reload) {
            getDetailTask(dataNode.id);
          }
          setIsModalClone(false);
        }}
      />
      <ModalDebug
        onShow={isModalDebug}
        dataNode={dataNode}
        processId={childProcessId || processId}
        onHide={(reload) => {
          if (reload) {
            // getListOjectGroup(params);
          }
          setIsModalDebug(false);
        }}
      />
    </Fragment>
  );
}
