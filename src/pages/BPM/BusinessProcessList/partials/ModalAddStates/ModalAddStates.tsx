import React, { Fragment, useState, useEffect } from "react";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/modal/modal";
import { showToast } from "utils/common";
import BusinessProcessService from "services/BusinessProcessService";
import Input from "components/input/input";
import Icon from "components/icon";
import Tippy from "@tippyjs/react";
import "./ModalAddStates.scss";

interface State {
  id: number;
  processId: number;
  stateCode: string | number;
  stateName: string;
  description?: string;
  workflowStep?: any;
  checkName?: boolean;
  checkState?: boolean;
}

export default function ModalAddState(props: any) {
  const { onShow, onHide, processId } = props;

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [listStates, setListStates] = useState<State[]>([]);
  const [listStateProcess, setListStateProcess] = useState<State[]>([]);
  const [newStateName, setNewStateName] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");

  const lockedStateCodes = [0, 1, 2, 3, 4, 5];

  const getListStates = async () => {
    setIsLoading(true);
    const param: any = {
      keyword: "",
      page: 1,
      limit: 100,
    };
    try {
      const response = await BusinessProcessService.listStates(param);
      if (response.code === 0 && response.result && response.result.items) {
        const states = response.result.items;
        setListStates(states);
        setListStateProcess(
          states.map((item: State) => ({
            ...item,
            checkName: false,
            checkState: !item.stateCode && item.stateCode !== 0 && item.stateCode !== "0",
          }))
        );
      } else {
        showToast("Không tìm thấy danh sách trạng thái", "error");
      }
    } catch (error) {
      showToast("Có lỗi xảy ra khi tải danh sách trạng thái", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (onShow) {
      getListStates();
    }
  }, [onShow]);

  const generateStateCode = () => {
    const maxStateCode =
      listStates.length > 0
        ? Math.max(...listStates.map((state) => Number(state.stateCode)), 5)
        : 5;
    return maxStateCode + 1;
  };

  const handleChangeValueState = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const value = e.target.value;
    setListStateProcess((current) =>
      current.map((obj) =>
        obj.id === id ? { ...obj, stateName: value, checkName: false } : obj
      )
    );
  };

  const handleBlurValueState = async (e: React.FocusEvent<HTMLInputElement>, id: number) => {
    const value = e.target.value;
    const item = listStateProcess.find((obj) => obj.id === id);
    if (!item) return;

    setListStateProcess((current) =>
      current.map((obj) =>
        obj.id === id
          ? {
              ...obj,
              checkName: !value,
              checkState: !obj.stateCode && obj.stateCode !== 0 && obj.stateCode !== "0",
            }
          : obj
      )
    );

    if (value && (item.stateCode || item.stateCode === 0 || item.stateCode === "0")) {
      const body = {
        id: item.id,
        processId: processId,
        stateCode: item.stateCode ?? "",
        stateName: value,
        workflowStep: null,
        description: item.description || "Trạng thái đã cập nhật",
      };
      await updateState(body);
    } else if (!value) {
      showToast("Tên trạng thái không được để trống", "error");
    }
  };

  const handleAddState = async () => {
    if (!newStateName) {
      showToast("Tên trạng thái không được để trống", "error");
      return;
    }
    setIsSubmit(true);
    const body = {
      processId: processId || 0,
      stateCode: generateStateCode(),
      stateName: newStateName,
      workflowStep: null,
      description: newDescription || "Trạng thái mới",
    };
    try {
      const response = await BusinessProcessService.createState(body);
      if (response.code === 0) {
        showToast("Thêm trạng thái thành công", "success");
        setNewStateName("");
        setNewDescription("");
        await getListStates();
      } else {
        showToast(response.message ?? "Có lỗi xảy ra khi thêm trạng thái", "error");
      }
    } catch (error) {
      showToast("Có lỗi xảy ra khi thêm trạng thái", "error");
    }
    setIsSubmit(false);
  };

  const updateState = async (body: State) => {
    try {
      const response = await BusinessProcessService.updateState({
        ...body,
        status: body.stateCode ?? "",
      });
      if (response.code === 0) {
        showToast("Cập nhật trạng thái thành công", "success");
        await getListStates();
      } else {
        showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
        setListStateProcess((current) =>
          current.map((obj) =>
            obj.id === body.id ? { ...obj, stateName: "", checkName: true } : obj
          )
        );
      }
    } catch (error) {
      showToast("Có lỗi xảy ra khi cập nhật trạng thái", "error");
    }
  };

  const handleDeleteState = async (id: number) => {
    setIsSubmit(true);
    try {
      const response = await BusinessProcessService.deleteState(id);
      if (response.code === 0) {
        showToast("Xóa trạng thái thành công", "success");
        await getListStates();
      } else {
        showToast(response.message ?? "Có lỗi xảy ra khi xóa trạng thái", "error");
      }
    } catch (error) {
      showToast("Có lỗi xảy ra khi xóa trạng thái", "error");
    }
    setIsSubmit(false);
  };

  return (
    <Fragment>
      <Modal
        isFade={true}
        isOpen={onShow}
        isCentered={true}
        staticBackdrop={true}
        toggle={() => onHide(true)}
        className="modal-edit-states"
        size="md"
      >
        <ModalHeader title="Chỉnh sửa trạng thái" toggle={() => onHide(true)} />
        <ModalBody>
          <div className="add-new-state">
            <Input
              fill={true}
              label="Thêm trạng thái mới"
              value={newStateName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewStateName(e.target.value)}
              placeholder="Nhập tên trạng thái"
              disabled={isSubmit}
              required={true}
              error={!newStateName && isSubmit}
              message="Tên trạng thái không được để trống"
            />
            <Input
              fill={true}
              label="Mô tả"
              value={newDescription}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewDescription(e.target.value)}
              placeholder="Nhập mô tả"
              disabled={isSubmit}
            />
            <button className="btn-add" onClick={handleAddState} disabled={isSubmit}>
              Thêm mới
            </button>
          </div>
          <div className="list-states">
            {isLoading ? (
              <p>Đang tải...</p>
            ) : listStateProcess.length === 0 ? (
              <p>Chưa có trạng thái nào</p>
            ) : (
              listStateProcess.map((state) => (
                <div key={state.id} className="state-item">
                  <Input
                    fill={true}
                    label=""
                    required={true}
                    value={state.stateName || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeValueState(e, state.id)}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleBlurValueState(e, state.id)}
                    placeholder="Nhập tên trạng thái"
                    error={state.checkName}
                    message="Tên trạng thái không được để trống"
                    disabled={isSubmit || lockedStateCodes.includes(Number(state.stateCode))}
                  />
                  <div className="actions">
                    <Tippy
                      content={
                        lockedStateCodes.includes(Number(state.stateCode))
                          ? "Không thể xóa"
                          : "Xóa"
                      }
                    >
                      <Icon
                        name="Trash"
                        onClick={() => {
                          if (!lockedStateCodes.includes(Number(state.stateCode))) {
                            handleDeleteState(state.id);
                          }
                        }}
                        style={{
                          cursor: lockedStateCodes.includes(Number(state.stateCode))
                            ? "not-allowed"
                            : "pointer",
                          opacity: lockedStateCodes.includes(Number(state.stateCode)) ? 0.5 : 1,
                        }}
                      />
                    </Tippy>
                  </div>
                </div>
              ))
            )}
          </div>
        </ModalBody>
        <ModalFooter
          actions={{
            actions_right: {
              buttons: [
                {
                  title: "Đóng",
                  color: "primary",
                  variant: "outline",
                  callback: () => onHide(true),
                },
              ],
            },
          }}
        />
      </Modal>
    </Fragment>
  );
}