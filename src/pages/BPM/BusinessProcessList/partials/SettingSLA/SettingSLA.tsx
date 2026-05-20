import React, { Fragment } from "react";
import "./SettingSLA.scss";
import NummericInput from "components/input/numericInput";
import RadioList from "components/radio/radioList";
import Loading from "components/loading";
import TableOlaRule from "pages/BPM/BusinessProcessCreate/partials/ModalUserTask/partials/ModalOLA/partial/TableOlaRule";

export default function SettingSLA(props: any) {
  const { processId, valueSLA, setValueSLA, setDataConfigAdvanceEdit, setTypeNode, typeNode, isLoadingType, dataConfigAdvance, setTypeNodeChange } =
    props;

  // const SLA_TYPE = "SLA";
  // const {
  //   typeNode,
  //   setTypeNode,
  //   isSubmit,
  //   isLoadingType,
  //   onSubmit,
  //   clearForm,
  //   dataConfigAdvance,
  //   setDataConfigAdvanceEdit,
  // } = useOlaSetting({ dataNode: "", onHide: () => {}, processId: processId, typeOfNode: SLA_TYPE });

  return (
    <Fragment>
      <div className="setting-SLA-process">
        <div className="form-switch-type">
          <div className="form-group">
            <RadioList
              options={[
                { value: "basic", label: "Cơ bản" },
                { value: "advanced", label: "Nâng cao" },
              ]}
              value={typeNode}
              onChange={(e: any) => {
                const value = e.target.value;
                setTypeNode(value);
                setTypeNodeChange((prev) => prev !== value);
              }}
              title={"Loại cài đặt: "}
              name="typeNode"
            />
          </div>
        </div>
        {isLoadingType ? (
          <div className="icon-loading" style={{ height: "30rem" }}>
            <Loading />
          </div>
        ) : (
          <>
            {typeNode === "advanced" ? (
              <TableOlaRule
                dataNode={null}
                processId={processId}
                childProcessId={processId}
                dataConfigAdvance={dataConfigAdvance}
                setDataConfigAdvanceEdit={setDataConfigAdvanceEdit}
              />
            ) : (
              <>
                <div className="box_line_date">
                  <span className="title_time">Thời gian phản hồi:</span>
                  <div className="box_setting_time">
                    <div className="box_time">
                      <div className="form-group">
                        <NummericInput
                          name="score"
                          id="score"
                          // label="Số lượng thực tế"
                          fill={false}
                          value={valueSLA.planResponseDay}
                          onChange={(e: any) => {
                            const value = e.target.value || "";
                            setValueSLA({ ...valueSLA, planResponseDay: value });
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
                          // label="Số lượng thực tế"
                          fill={false}
                          value={valueSLA.planResponseHour}
                          onChange={(e: any) => {
                            const value = e.target.value || "";
                            setValueSLA({ ...valueSLA, planResponseHour: value });
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
                          // label="Số lượng thực tế"
                          fill={false}
                          value={valueSLA.planResponseMinute}
                          onChange={(e: any) => {
                            const value = e.target.value || "";
                            setValueSLA({ ...valueSLA, planResponseMinute: value });
                          }}
                        />
                      </div>
                      <div>
                        <span className="title_time">phút</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="box_line_date">
                  <span className="title_time">Thời gian xử lý:</span>
                  <div className="box_setting_time">
                    <div className="box_time">
                      <div className="form-group">
                        <NummericInput
                          name="score"
                          id="score"
                          // label="Số lượng thực tế"
                          fill={false}
                          value={valueSLA.planExecutionDay}
                          onChange={(e) => {
                            const value = e.target.value || "";
                            setValueSLA({ ...valueSLA, planExecutionDay: value });
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
                          // label="Số lượng thực tế"
                          fill={false}
                          value={valueSLA.planExecutionHour}
                          onChange={(e) => {
                            const value = e.target.value || "";
                            setValueSLA({ ...valueSLA, planExecutionHour: value });
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
                          // label="Số lượng thực tế"
                          fill={false}
                          value={valueSLA.planExecutionMinute}
                          onChange={(e: any) => {
                            const value = e.target.value || "";
                            setValueSLA({ ...valueSLA, planExecutionMinute: value });
                          }}
                        />
                      </div>
                      <div>
                        <span className="title_time">phút</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </Fragment>
  );
}
