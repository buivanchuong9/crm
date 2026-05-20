import React, { useState } from "react";
import "./ActionRow.scss";
import Icon from "components/icon";
import SelectCustom from "components/selectCustom/selectCustom";

export interface INoteData {
  id: number;
  avatar: string;
  name: string;
  time: string;
  content: string;
  isEdit: boolean;
}

export interface IDetailAction {
  rowIndex: number;
  action: string;
  position: "top" | "bottom";
  stype?: string;
}
interface INoteFieldProps {
  onShow: boolean;
  onHide?: (reload: boolean) => void;
  rowIndex: number;
  callBack: (detailAction: IDetailAction) => void;
}

export default function ActionRow(props: INoteFieldProps) {
  const { rowIndex, callBack } = props;

  const [listTypeTitle, setListTypeTitle] = useState([
    { value: "H1", label: "LV1", isShow: false },
    { value: "H2", label: "LV2", isShow: false },
    { value: "H3", label: "LV3", isShow: false },
    { value: "H4", label: "LV4", isShow: false },
  ]);
  const [listTypeSum, setListTypeSum] = useState([
    { value: "H1", label: "LV1", level: 1, isShow: false },
    { value: "H2", label: "LV2", level: 2, isShow: false },
    { value: "H3", label: "LV3", level: 3, isShow: false },
    { value: "H4", label: "LV4", level: 4, isShow: false },
    { value: "H1", label: "ALL", level: 11, isShow: false },
  ]);
  const [listTitleSum, setListTitleSum] = useState([
    { value: "H1", label: "LV1", level: 1, isShow: false },
    { value: "H2", label: "LV2", level: 2, isShow: false },
    { value: "H3", label: "LV3", level: 3, isShow: false },
    { value: "H4", label: "LV4", level: 4, isShow: false },
  ]);
  const [typeTitle, setTypeTitle] = useState(null);
  const [typeTitleSum, setTypeTitleSum] = useState(null);
  const [typeSum, setTypeSum] = useState(null);

  return (
    <div className="modal-action-row-grid">
      <form className="form-action-group">
        <div className="list-action">
          <div
            className="item-action"
            onClick={() => {
              callBack({
                rowIndex: rowIndex,
                action: "insert",
                position: "top",
              });
            }}
          >
            Chèn 1 hàng lên trên
          </div>
          <div
            className="item-action"
            onClick={() => {
              callBack({
                rowIndex: rowIndex,
                action: "insert",
                position: "bottom",
              });
            }}
          >
            Chèn 1 hàng xuống dưới
          </div>

          <div
            className="item-action"
            onClick={() => {
              let newList = [...listTypeTitle];
              newList.map((item) => {
                item.isShow = false;
              });
              // newList[index].isShow = true;
              setListTypeTitle(newList);
            }}
          >
            <div className="action-name">Chèn tiêu đề</div>
            <SelectCustom
              name={"title"}
              disabled={false}
              options={listTypeTitle}
              value={typeTitle?.value || ""}
              onChange={(e) => setTypeTitle(e)}
              placeholder={`Chọn levlel`}
              fill={true}
            />
            <Icon name="CaretRight" />
            {typeTitle?.value ? (
              <>
                <div
                  className="sub-action"
                  onClick={() => {
                    callBack({
                      rowIndex: rowIndex,
                      action: "insertTitle",
                      position: "top",
                      stype: typeTitle.value,
                    });
                  }}
                >
                  Lên trên
                </div>
                <div
                  className="sub-action"
                  onClick={() => {
                    callBack({
                      rowIndex: rowIndex,
                      action: "insertTitle",
                      position: "bottom",
                      stype: typeTitle.value,
                    });
                  }}
                >
                  Xuống dưới
                </div>
              </>
            ) : null}
          </div>
          <div
            className="item-action"
            onClick={() => {
              let newList = [...listTitleSum];
              newList.map((item) => {
                item.isShow = false;
              });
              // newList[index].isShow = true;
              setListTypeTitle(newList);
            }}
          >
            <div className="action-name">Tiêu đề tổng</div>
            <SelectCustom
              name={"title"}
              disabled={false}
              options={listTitleSum}
              value={typeTitleSum?.value || ""}
              onChange={(e) => setTypeTitleSum(e)}
              placeholder={`Chọn levlel`}
              fill={true}
            />
            <Icon name="CaretRight" />
            {typeTitleSum?.value ? (
              <>
                <div
                  className="sub-action"
                  onClick={() => {
                    callBack({
                      rowIndex: rowIndex,
                      action: "insertTitleSum",
                      position: "top",
                      stype: typeTitleSum.value,
                    });
                  }}
                >
                  Lên trên
                </div>
                <div
                  className="sub-action"
                  onClick={() => {
                    callBack({
                      rowIndex: rowIndex,
                      action: "insertTitleSum",
                      position: "bottom",
                      stype: typeTitleSum.value,
                    });
                  }}
                >
                  Xuống dưới
                </div>
              </>
            ) : null}
          </div>
          <div
            className="item-action"
            onClick={() => {
              let newList = [...listTypeSum];
              newList.map((item) => {
                item.isShow = false;
              });
              // newList[index].isShow = true;
              setListTypeSum(newList);
            }}
          >
            <div className="action-name">Chèn hàng tổng</div>
            <SelectCustom
              name={"sum"}
              disabled={false}
              options={listTypeSum}
              value={typeSum?.value || ""}
              onChange={(e) => setTypeSum(e)}
              placeholder={`Chọn levlel`}
              fill={true}
            />
            <Icon name="CaretRight" />
            {typeSum?.value ? (
              <>
                <div
                  className="sub-action"
                  onClick={() => {
                    callBack({
                      rowIndex: rowIndex,
                      action: "insertSum",
                      position: "top",
                      stype: typeSum.level,
                    });
                  }}
                >
                  Lên trên
                </div>
                <div
                  className="sub-action"
                  onClick={() => {
                    callBack({
                      rowIndex: rowIndex,
                      action: "insertSum",
                      position: "bottom",
                      stype: typeSum.level,
                    });
                  }}
                >
                  Xuống dưới
                </div>
              </>
            ) : null}
          </div>
          <div
            className="item-action action-delete"
            onClick={() => {
              callBack({
                rowIndex: rowIndex,
                action: "delete",
                position: "bottom",
              });
            }}
          >
            Xoá hàng
          </div>
        </div>
      </form>
    </div>
  );
}
