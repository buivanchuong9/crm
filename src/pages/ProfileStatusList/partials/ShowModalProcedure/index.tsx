import React, { Fragment, useState, useEffect, useMemo } from "react";
import Loading from "components/loading";
import BoxTable from "components/boxTable/boxTable";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/modal/modal";
import { SystemNotification } from "components/systemNotification/systemNotification";
import { IActionModal } from "model/OtherModel";
import { IViewProcedureProps } from "model/profileStatus/PropsModel";
import { IProfileStatusResponse } from "model/profileStatus/ProfileStatusResponseModel";
import ImageThirdGender from "assets/images/third-gender.png";
import ProfileStatusService from "services/ProfileStatusService";
import BusinessProcessService from "services/BusinessProcessService";
import { showToast } from "utils/common";
import "./index.scss";

export default function ShowModalProcedure(props: IViewProcedureProps) {
  const { onShow, onHide, data, handleNextPage } = props;

  const [listProcedure, setListProcedure] = useState<IProfileStatusResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getListProcedure = async () => {
    setIsLoading(true);

    try {
      const param = {
        limit: 30,
        stateCode: data.stateCode,
      };

      const response = await ProfileStatusService.listProcedure(param);

      if (response.code === 0) {
        const result = response.result.items || [];
        
        // Get processId from the first item (assuming stateCode returns related processId)
        const processId = result.length > 0 ? result[0].processId : null;

        if (processId) {
          // Call businessProcess/list API with processId
          const businessResponse = await BusinessProcessService.list({
            processId,
            limit: 30,
          });

          if (businessResponse.code === 0) {
            setListProcedure(businessResponse.result.items || []);
          } else {
            setListProcedure([]);
          }
        } else {
          setListProcedure([]);
        }
      } else {
        setListProcedure([]);
        showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
      }
    } catch (error) {
      setListProcedure([]);
      showToast("Có lỗi xảy ra khi gọi API", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (data && onShow) {
      getListProcedure();
    }
  }, [data, onShow]);

  const titles = ["STT", "Mã quy trình", "Tên quy trình"];

  const dataFormat = ["text-center", "text-center", "", ""];

  const dataMappingArray = (item: IProfileStatusResponse, index: number) => [
    index + 1,
    item.code,
    item.name,
  ];

  const actions = useMemo<IActionModal>(
    () => ({
      actions_right: {
        buttons: [
          {
            title: "Đóng",
            color: "primary",
            variant: "outline",
            callback: () => {
              onHide(false);
            },
          },
        ],
      },
    }),
    []
  );

  return (
    <Fragment>
      <Modal isFade={true} isOpen={onShow} isCentered={true} staticBackdrop={true} toggle={() => onHide(false)} className="modal-procedure">
        <ModalHeader title={`Quy trình sử dụng trong ${data?.stateName}`} toggle={() => onHide(false)} />
        <ModalBody>
          <div className="list-procedure">
            {!isLoading && listProcedure && listProcedure.length > 0 ? (
              <BoxTable
                name="Quy trình"
                titles={titles}
                items={listProcedure}
                dataMappingArray={(item, index) => dataMappingArray(item, index)}
                dataFormat={dataFormat}
                striped={true}
              />
            ) : isLoading ? (
              <Loading />
            ) : (
              <SystemNotification
                description={
                  <span>
                    Hiện tại <strong>{data?.stateName}</strong> chưa có quy trình nào <br />
                    Hãy thêm mới quy trình rồi quay lại sau nhé!
                  </span>
                }
                type="no-item"
                titleButton="Thêm mới quy trình"
                action={() => {
                  handleNextPage();
                }}
              />
            )}
          </div>
        </ModalBody>
        <ModalFooter actions={actions} />
      </Modal>
    </Fragment>
  );
}