import React from "react";
// ============================================================
// 🏥 CLINIC MODE — Chỉ giữ 5 modal thiết yếu cho phòng khám
// ============================================================
import ModalUserTask from "../partials/ModalUserTask";
import ModalServiceTask from "../partials/ModalServiceTask";
import ModalExclusiveGateway from "../partials/ModalExclusiveGateway";
import ModalStartEvent from "../partials/ModalStartEvent";
import ModalEndEvent from "../partials/ModalEndEvent";
import ModalSequenceFlow from "../partials/ModalSequenceFlow";

/**
 * modalMap — ánh xạ BPMN type → Component cấu hình
 *
 * Chỉ 6 entry tương ứng với 5 loại node cốt lõi + SequenceFlow
 * (để cấu hình điều kiện trên các mũi tên rẽ nhánh từ Gateway).
 */
const modalMap: Record<string, React.ComponentType<any>> = {
  "bpmn:UserTask": ModalUserTask,           // Bác sĩ / lễ tân thao tác
  "bpmn:ServiceTask": ModalServiceTask,      // AI phân tích, gửi SMS tự động
  "bpmn:ExclusiveGateway": ModalExclusiveGateway, // Rẽ nhánh điều kiện (XOR)
  "bpmn:StartEvent": ModalStartEvent,        // Điểm bắt đầu quy trình
  "bpmn:EndEvent": ModalEndEvent,            // Điểm kết thúc quy trình
  "bpmn:SequenceFlow": ModalSequenceFlow,    // Cấu hình điều kiện trên mũi tên
};

interface BpmnModalsProps {
  activeModal: string | null;
  dataNode: any;
  processId: string | number;
  clearModalNode: () => void;
  changeNameNodeXML: (node: any, name: string) => void;
  setDataNode: (node: any) => void;
}

export default function BpmnModals({
  activeModal,
  dataNode,
  processId,
  clearModalNode,
  changeNameNodeXML,
  setDataNode,
}: BpmnModalsProps) {
  const ModalComponent = activeModal ? modalMap[activeModal] : null;

  if (!ModalComponent) return null;

  return (
    <ModalComponent
      onShow={true}
      dataNode={dataNode}
      processId={processId}
      disable={false}
      onHide={() => clearModalNode()}
      changeNameNodeXML={changeNameNodeXML}
      setDataNode={setDataNode}
    />
  );
}
