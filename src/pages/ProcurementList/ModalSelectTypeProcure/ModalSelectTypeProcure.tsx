import React, { Fragment, useState, useEffect, useCallback, useMemo } from "react";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/modal/modal";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import FieldCustomize from "components/fieldCustomize/fieldCustomize";
import { IActionModal } from "model/OtherModel";
import { IFieldCustomize, IFormData, IValidation } from "model/FormModel";
import { useActiveElement } from "utils/hookCustom";
import Validate, { handleChangeValidate } from "utils/validate";
import { showToast } from "utils/common";
import { isDifferenceObj } from "reborn-util";
import "./ModalSelectTypeProcure.scss";
import ProcurementTypeService from "services/ProcurementTypeService";
import { useNavigate } from "react-router-dom";
import PurchaseRequestService from "services/PurchaseRequestService";

export default function ModalSelectTypeProcure(props: any) {
  const { onShow, onHide, data } = props;

  const focusedElement = useActiveElement();

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [contentDialog, setContentDialog] = useState<IContentDialog>(null);

  const values = useMemo(
    () =>
    ({
      onSchedule: '1'
    } as any),
    [data, onShow]
  );

  const [formData, setFormData] = useState<IFormData>({ values: values });  

  const validations: IValidation[] = [
    {
      name: "onSchedule",
      rules: "required",
    },
    // {
    //   name: "codd",
    //   rules: "required|min:0",
    // }
  ];

  const listFieldBasic = useMemo(
    () =>
      [
        {
          label: "Loại gói thầu",
          name: "onSchedule",
          type: "radio",
          options: [
            {
              value: "1",
              label: "Xây dựng cơ bản trong tổng tiến độ",
            },
            {
              value: "0",
              label: "Xây dựng cơ bản ngoài tổng tiến độ",
            },
          ],
        },
        // {
        //   label: "Node bắt đầu",
        //   name: "nodeName",
        //   type: "text",
        //   fill: true,
        //   required: true,
        // },
      ] as IFieldCustomize[],
    [formData?.values]
  );

  useEffect(() => {
    setFormData({ ...formData, values: values, errors: {} });
    setIsSubmit(false);

    return () => {
      setIsSubmit(false);
    };
  }, [values]);

  const onSubmit = async (e) => {
    e.preventDefault();


    setIsSubmit(true);
    // handClearForm(true, formData.values.onSchedule);
    getPurchaseRequestInit(formData.values.onSchedule);

    // const body: any = {
    //   ...(formData.values as any),
    //   ...(data ? { id: data.id } : {}),
    // };

    // const response = await ProcurementTypeService.update(body);

    // if (response.code === 0) {
    //   showToast(`${data ? "Cập nhật" : "Thêm mới"} loại yêu cầu mua sắm thành công`, "success");
    //   onHide(true);
    // } else {
    //   showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    //   setIsSubmit(false);
    // }
  };

  const handClearForm = (acc, onSchedule, workId?) => {
    onHide(acc, onSchedule, workId);
    setIsSubmit(false);
    setRequestId(null);
  };

  const actions = useMemo<IActionModal>(
    () => ({
      actions_right: {
        buttons: [
          {
            title: "Hủy",
            color: "primary",
            variant: "outline",
            disabled: isSubmit,
            callback: () => {
              !isDifferenceObj(formData.values, values) ? handClearForm(false, null) : showDialogConfirmCancel();
            },
          },
          {
            title: "Tiếp tục",
            type: "submit",
            color: "primary",
            disabled: isSubmit, 
            //     || !isDifferenceObj(formData.values, values) 
            //     || (formData.errors && Object.keys(formData.errors).length > 0)
            //     || !formData.values.name,
            is_loading: isSubmit,
          },
        ],
      },
    }),
    [formData, values, isSubmit]
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
        onHide(false);
        setShowDialog(false);
        setContentDialog(null);
      },
    };
    setContentDialog(contentDialog);
    setShowDialog(true);
  };

  const checkKeyDown = useCallback(
    (e) => {
      const { keyCode } = e;
      if (keyCode === 27 && !showDialog) {
        if (isDifferenceObj(formData.values, values)) {
          showDialogConfirmCancel();
          if (focusedElement instanceof HTMLElement) {
            focusedElement.blur();
          }
        } else {
          onHide(false);
        }
      }
    },
    [formData]
  );

  useEffect(() => {
    window.addEventListener("keydown", checkKeyDown);

    return () => {
      window.removeEventListener("keydown", checkKeyDown);
    };
  }, [checkKeyDown]);


  const navigate = useNavigate();

  const [requestId, setRequestId] = useState(null);

  useEffect(() => {
    if(requestId){
      const timer = setInterval(async () => {
        const response = await PurchaseRequestService.getRequestSubmitter({requestId: requestId});
        if(response.code == 0) {
          const result = response.result;
        
          if (result.workId) {
            clearInterval(timer);
            setRequestId(null);
            handClearForm(true, formData.values.onSchedule, result.workId);
            // navigate('/bpm/task_assignment', {state: {viewDetail: true, workId: result.workId, isHandleTask: true}});
            setIsSubmit(false);
          }
        }
        
      }, 2000, requestId);
  
      return () => clearInterval(timer);
    }
    
  }, [requestId]);

  const getPurchaseRequestInit = async (onSchedule) => {
    const params = {
      processCode: 'YCMS',
      onSchedule: onSchedule
    }
    const response = await PurchaseRequestService.getPurchaseRequestInit(params);

    if (response.code == 0) {
      const result = response.result;
      if(result){
        setRequestId(result.requestId);
      }

    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
  }


  return (
    <Fragment>
      <Modal
        isFade={true}
        isOpen={onShow}
        isCentered={true}
        staticBackdrop={true}
        toggle={() => !isSubmit && handClearForm(false, null)}
        className="modal-select-type-procure"
        size="sm"
      >
        <form className="form-select-type-procure" onSubmit={(e) => onSubmit(e)}>
          <ModalHeader
            title={`Thêm mới yêu cầu mua sắm`}
            toggle={() => {
              handClearForm(false, null);
            }}
          />
          <ModalBody>
            <div className="list-form-group">
              <div className="list-field-item list-field-basic">
                {listFieldBasic.map((field, index) => (
                  <FieldCustomize
                    key={index}
                    field={field}
                    handleUpdate={(value) => handleChangeValidate(value, field, formData, validations, listFieldBasic, setFormData)}
                    formData={formData}
                  />
                ))}
              </div>
            </div>
          </ModalBody>
          <ModalFooter actions={actions} />
        </form>
      </Modal>
      <Dialog content={contentDialog} isOpen={showDialog} />
    </Fragment>
  );
}
