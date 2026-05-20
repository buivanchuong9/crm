import React, { Fragment, useEffect, useRef, useState } from "react";
import BpmnJS from "bpmn-js/dist/bpmn-modeler.production.min.js";
import { useParams, useNavigate } from "react-router-dom";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-js.css";
import copyPasteModule from "bpmn-js/lib/features/copy-paste";
import keyboardModule from "diagram-js/lib/features/keyboard";
import "./index.scss";
import ModalUserTask from "./partials/ModalUserTask";
import Button from "components/button/button";
import ModalServiceTask from "./partials/ModalServiceTask";
import ModalScriptTask from "./partials/ModalScriptTask";
import ModalManualTask from "./partials/ModalManualTask";
import ModalBusinessRuleTask from "./partials/ModalBusinessRuleTask";
import ModalReceiveTask from "./partials/ModalReceiveTask";
import { handDownloadFileOrigin, showToast } from "utils/common";
import BusinessProcessService from "services/BusinessProcessService";
import ModalSendTask from "./partials/ModalSendTask";
import ModalCallActivityTask from "./partials/ModalCallActivityTask";
import ModalParallelGatewayTask from "./partials/ModalParallelGateway";
import ModalSequenceFlow from "./partials/ModalSequenceFlow";
import ModalComplexGateway from "./partials/ModalComplexGateway";
import ModalExclusiveGateway from "./partials/ModalExclusiveGateway";
import ModalInclusiveGateway from "./partials/ModalInclusiveGateway";
import ModalSubprocess from "./partials/ModalSubprocess";
import ModalTimerStartEventTask from "./partials/ModalTimerStartEventTask/ModalTimerStartEventTask";
import ModalStartEvent from "./partials/ModalStartEvent";
import ModalEndEvent from "./partials/ModalEndEvent";
import ModalStartMessageEvent from "./partials/ModalStartMessageEvent";
import ModalEndMessageEvent from "./partials/ModalEndMessageEvent";
import Icon from "components/icon";
import { uploadDocumentFormData } from "utils/document";
import ModalIntermediateCatchEvent from "./partials/ModalIntermediateCatchEvent/ModalIntermediateCatchEvent";
import ModalLinkCatchEvent from "./partials/ModalLinkCatchEvent/ModalLinkCatchEvent";
import ModalLinkThrowEvent from "./partials/ModalLinkThrowEvent/ModalLinkThrowEvent";
import ModalImportProcess from "./partials/ModalImportProcess/ModalImportProcess";
import ModalExportProcess from "./partials/ModalExportProcess/ModalExportProcess";
import ModalMessageIntermediateThrowEvent from "./partials/ModalMessageIntermediateThrowEvent";
import ModalMessageIntermediateCatchEvent from "./partials/ModalMessageIntermediateCatchEvent";
import ModalSignalStartEvent from "./partials/ModalSignalStartEvent/ModalSignalStartEvent";
import ModalSignalEndEvent from "./partials/ModalSignalEndEvent/ModalSignalEndEvent";
import ModalConditionalStartEvent from "./partials/ModalConditionalStartEvent/ModalConditionalStartEvent";
import ModalCompensationIntermediateThrowEvent from "./partials/ModalCompensationIntermediateThrowEvent";
import ModalCompensationEndEvent from "./partials/ModalCompensationEndEvent";
import ModalEscalationEndEvent from "./partials/ModalEscalationEndEvent";
import ModalEscalationStartEvent from "./partials/ModalEscalationStartEvent";
import ModalTimerIntermediateCatchEvent from "./partials/ModalTimerIntermediateCatchEvent";
import ModalEscalationIntermediateThrowEvent from "./partials/ModalEscalationIntermediateThrowEvent";
import ModalSignalIntermediateThrowEvent from "./partials/ModalSignalIntermediateThrowEvent";
import { set } from "lodash";
import ModalSignalIntermediateCatchEvent from "./partials/ModalSignalIntermediateCatchEvent";
import ModalErrorEndEvent from "./partials/ModalErrorEndEvent";
import ModalErrorStartEvent from "./partials/ModalErrorStartEvent";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import ModalTerminateEndEvent from "./partials/ModalTerminateEndEvent";
import ModalCompensationStartEvent from "./partials/ModalCompensationStartEvent";

/**
 * Cho phép tạo mới một quy trình
 * @returns
 */
const BusinessProcessCreate = () => {
  const takeUrlProcessLocalStorage = JSON.parse(localStorage.getItem("backUpUrlProcess") || "");

  const modelerRef = useRef(null);
  const bpmnModeler = useRef(null);
  const tooltipRef = useRef(null);

  const { id } = useParams();
  const navigate = useNavigate();
  const [dataNode, setDataNode] = useState(null);

  const [nodeId, setNodeId] = useState(null);
  const [dataProcess, setDataProcess] = useState(null);
  const [dataConfig, setDataConfig] = useState("");
  const [isExportProcess, setIsExportProcess] = useState(false);
  const [isImportProcess, setIsImportProcess] = useState(false);
  const [listNodeSelected, setListNodeSelected] = useState([]);
  console.log("listNodeSelected", listNodeSelected);

  const [newNode, setNewNode] = useState({
    type: "useTask",
    nodeId: "UserTask_1",
    nameNode: "Xử lý",
  });

  const importNode = () => {
    const parser = new DOMParser();
    const xmlString = dataConfig; // XML gốc
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");

    // Tạo node mới
    const userTask = xmlDoc.createElement(newNode.type);
    userTask.setAttribute("id", newNode.nodeId);
    userTask.setAttribute("name", newNode.nameNode);

    // Chèn vào <process>
    const processEl = xmlDoc.getElementsByTagName("process")[0];
    processEl.appendChild(userTask);

    // Chuyển lại về string
    const serializer = new XMLSerializer();
    const newXml = serializer.serializeToString(xmlDoc);

    console.log(newXml);
    setDataConfig(newXml);
  };

  const getDetailBusinessProcess = async (id) => {
    const response = await BusinessProcessService.getDetailDiagram(id);

    if (response.code == 0) {
      const result = response.result;
      if (result.config) {
        setDataConfig(result.config);
        setDataProcess(result);
      }
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
  };

  useEffect(() => {
    if (id) {
      getDetailBusinessProcess(id);
    }
  }, [id]);

  //modal start event
  const [isModalStartEvent, setIsModalStartEvent] = useState(false);
  //modal end event
  const [isModalEndEvent, setIsModalEndEvent] = useState(false);
  //modal user task
  const [isModalUserTask, setIsModalUserTask] = useState(false);
  //modal service task
  const [isModalServiceTask, setIsModalServiceTask] = useState(false);
  //modal script task
  const [isModalScriptTask, setIsModalScriptTask] = useState(false);
  //modal manual task
  const [isModalManualTask, setIsModalManualTask] = useState(false);
  //modal business rule task
  const [isModaBusinessRuleTask, setIsModalBusinessRuleTask] = useState(false);
  //modal send task
  const [isModaSendTask, setIsModalSendTask] = useState(false);
  //modal Message Intermediate Throw Event
  const [isModalMessageIntermediateThrowEvent, setIsModalMessageIntermediateThrowEvent] = useState(false);
  //modal Message Intermediate catch Event
  const [isModalMessageIntermediateCatchEvent, setIsModalMessageIntermediateCatchEvent] = useState(false);
  //modal receive task
  const [isModaReceiveTask, setIsModalReceiveTask] = useState(false);
  //modal call activity task
  const [isModalCallActivityTask, setIsModalCallActivityTask] = useState(false);
  //modal Parallel Gateway
  const [isModalParallelGateway, setIsModalParallelGateway] = useState(false);
  //modal Exclusive Gateway
  const [isModalExclusiveGateway, setIsModalExclusiveGateway] = useState(false);
  //modal Inclusive Gateway
  const [isModalInclusiveGateway, setIsModalInclusiveGateway] = useState(false);
  //modal sequence flow
  const [isModalSequenceFlow, setIsModalSequenceFlow] = useState(false);
  //modal complex gateway
  const [isModalComplexGateway, setIsModalComplexGateway] = useState(false);
  //modal subprocess
  const [isModalSubprocess, setIsModalSubprocess] = useState(false);
  //modal timer start event
  const [isModalTimerStartEvent, setIsModalTimeStartEvent] = useState(false);
  //modal Intermediate Catch Event
  const [isModalIntermediateCatchEvent, setIsModalIntermediateCatchEvent] = useState(false);
  //modal Link Catch Event
  const [isModalLinkCatchEvent, setIsModalLinkCatchEvent] = useState(false);
  //modal Link Throw Event
  const [isModalLinkThrowEvent, setIsModalLinkThrowEvent] = useState(false);
  //modal message start event
  const [isModalStartMessageEvent, setIsModalStartMessageEvent] = useState(false);
  //modal message end event
  const [isModalEndMessageEvent, setIsModalEndMessageEvent] = useState(false);
  //modal signal start event
  const [isModalSignalStartEvent, setIsModalSignalStartEvent] = useState(false);
  //modal signal end event
  const [isModalSignalEndEvent, setIsModalSignalEndEvent] = useState(false);
  //modal signal start event
  const [isModalConditionalStartEvent, setIsModalConditionalStartEvent] = useState(false);
  //modal escalation Intermediate Throw Event
  const [isModalEscalationIntermediateThrowEvent, setIsModalEscalationIntermediateThrowEvent] = useState(false);
  //modal compensation Intermediate Throw Event
  const [isModalCompensationIntermediateThrowEvent, setIsModalCompensationIntermediateThrowEvent] = useState(false);
  //modal compensation end event
  const [isModalCompensationEndEvent, setIsModalCompensationEndEvent] = useState(false);
  // modal escalation end event
  const [isModalEscalationEndEvent, setIsModalEscalationEndEvent] = useState(false);
  // modal escalation start event
  const [isModalEscalationStartEvent, setIsModalEscalationStartEvent] = useState(false);
  //modal timer Intermediate Catch Event
  const [isModalTimerIntermediateCatchEvent, setIsModalTimerIntermediateCatchEvent] = useState(false);
  //modal signal Intermediate Throw Event
  const [isModalSignalIntermediateThrowEvent, setIsModalSignalIntermediateThrowEvent] = useState(false);
  //modal signal Intermediate Catch Event
  const [isModalSignalIntermediateCatchEvent, setIsModalSignalIntermediateCatchEvent] = useState(false);
  //modal error end event
  const [isModalErrorEndEvent, setIsModalErrorEndEvent] = useState(false);
  // modal error start event
  const [isModalErrorStartEvent, setIsModalErrorStartEvent] = useState(false);
  //terminate end event
  const [isModalTerminateEndEvent, setIsModalTerminateEndEvent] = useState(false);
  //compensation start event
  const [isModalCompensationStartEvent, setIsModalCompensationStartEvent] = useState(false);

  useEffect(() => {
    if (id) {
      // setProcessId(+id);
      // getDettailProcess(+id);
    }
  }, [id]);

  const getTypeNode = (element) => {
    let elementType = element.type;
    if (element.type === "bpmn:IntermediateCatchEvent") {
      if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:ConditionalEventDefinition") {
        elementType = "bpmn:ConditionalCatchEvent";
      }
      if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:MessageEventDefinition") {
        elementType = "bpmn:MessageCatchEvent";
      }
      if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:MessageEventDefinition") {
        elementType = "bpmn:MessageIntermediateCatchEvent";
      }
      if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:EscalationEventDefinition") {
        elementType = "bpmn:EscalationStartEvent";
      }
      if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:TimerEventDefinition") {
        elementType = "bpmn:TimerIntermediateCatchEvent";
      }
      if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:SignalEventDefinition") {
        elementType = "bpmn:SignalIntermediateCatchEvent";
      }
    }

    if (element.type === "bpmn:IntermediateThrowEvent") {
      if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:MessageEventDefinition") {
        elementType = "bpmn:MessageIntermediateThrowEvent";
      }
      if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:EscalationEventDefinition") {
        elementType = "bpmn:EscalationIntermediateThrowEvent";
      }
      if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:CompensateEventDefinition") {
        elementType = "bpmn:CompensationIntermediateThrowEvent";
      }
      if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:SignalEventDefinition") {
        elementType = "bpmn:SignalIntermediateThrowEvent";
      }
    }

    if (element.type === "bpmn:StartEvent") {
      if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:MessageEventDefinition") {
        elementType = "bpmn:MessageStartEvent";
      }
      if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:SignalEventDefinition") {
        elementType = "bpmn:SignalStartEvent";
      }
      if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:ConditionalEventDefinition") {
        elementType = "bpmn:ConditionalStartEvent";
      }
      if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:EscalationEventDefinition") {
        elementType = "bpmn:EscalationStartEvent";
      }
      if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:TimerEventDefinition") {
        elementType = "bpmn:TimerStartEvent";
      }
      if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:ErrorEventDefinition") {
        elementType = "bpmn:ErrorStartEvent";
      }
      if (element.businessObject.$parent?.$type === "bpmn:SubProcess") {
        if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:CompensateEventDefinition") {
          elementType = "bpmn:CompensationStartEvent";
        }
      }
    }

    if (element.type === "bpmn:EndEvent") {
      if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:MessageEventDefinition") {
        elementType = "bpmn:MessageEndEvent";
      }
      if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:CompensateEventDefinition") {
        elementType = "bpmn:CompensationEndEvent";
      }
      if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:SignalEventDefinition") {
        elementType = "bpmn:SignalEndEvent";
      }
      if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:EscalationEventDefinition") {
        elementType = "bpmn:EscalationEndEvent";
      }
      if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:ErrorEventDefinition") {
        elementType = "bpmn:ErrorEndEvent";
      }
      if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:TerminateEventDefinition") {
        elementType = "bpmn:TerminateEndEvent";
      }
    }

    if (element.type === "bpmn:BoundaryEvent") {
      if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:CompensateEventDefinition") {
        elementType = "bpmn:CompensationBoundaryEvent";
      }
    }

    // if (element.type === "bpmn:StartEvent" && element.businessObject.$parent?.$type === "bpmn:SubProcess") {
    //   if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:CompensateEventDefinition") {
    //     elementType = "bpmn:CompensationStartEvent";
    //   }
    // }

    return elementType;
  };

  const addNode = async (element) => {
    const businessObject = element.businessObject;
    const body = {
      // id: nodeId || '',
      name: businessObject.name || "",
      typeNode: getTypeNode(element),
      processId: id,
      nodeId: element.id,
      ...(getTypeNode(element) === "bpmn:CompensationBoundaryEvent" ? { attachToNodeId: businessObject?.attachedToRef?.id } : {}),
    };
    const response = await BusinessProcessService.bpmAddNode(body);

    if (response.code == 0) {
      const result = response.result;
      // Thay đổi id của task này thành 'NewTaskId'
      // setTimeout(() => {
      //   modeling.updateProperties(taskElement, {
      //     id: result.id.toString()
      //   });
      // }, 0);
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
  };

  const addNameNode = async (nameNode, element) => {
    const body = {
      name: nameNode || "",
      nodeId: element.id,
    };
    const response = await BusinessProcessService.bpmAddNameNode(body);

    if (response.code == 0) {
      const result = response.result;
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
  };

  const deleteNode = async (nodeId) => {
    const response = await BusinessProcessService.bpmDeleteNode(nodeId);

    if (response.code == 0) {
      const result = response.result;
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
  };

  const addLinkNode = async (element, fromNodeId, toNodeId) => {
    const body = {
      // id: '',
      fromNodeId: fromNodeId,
      toNodeId: toNodeId,
      flowType: "normal", //normal, condition
      config: "",
      processId: id,
      linkId: element.id,
    };
    if (body.fromNodeId && body.fromNodeId) {
      const response = await BusinessProcessService.bpmAddLinkNode(body);

      if (response.code == 0) {
        const result = response.result;
      } else {
        showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
      }
    }
  };

  const deleteLinkNode = async (linkId) => {
    const param = {
      linkId: linkId,
    };
    const response = await BusinessProcessService.bpmDeleteLinkNode(param);

    if (response.code == 0) {
      const result = response.result;
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
  };

  //quy trình con

  const addChildProcess = async (element, projectId) => {
    const body = {
      // id: '',
      name: "",
      description: "",
      employeeId: null,
      parentId: projectId,
    };
    const response = await BusinessProcessService.update(body);

    if (response.code == 0) {
      const result = response.result;
      addNodeSubprocess(element, result.id, result.parentId);
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
  };

  const addNodeSubprocess = async (element, childProcessId, processId) => {
    const businessObject = element?.businessObject;
    const body = {
      // id: nodeId || '',
      name: businessObject?.name || "",
      typeNode: getTypeNode(element),
      processId: processId,
      childProcessId: childProcessId,
      nodeId: element.id,
      ...(getTypeNode(element) === "bpmn:CompensationBoundaryEvent" ? { attachToNodeId: businessObject?.attachedToRef?.id } : {}),
    };

    const response = await BusinessProcessService.bpmAddNode(body);

    if (response.code == 0) {
      const result = response.result;
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
  };

  const getDetailNode = async (nodeId, element) => {
    const response = await BusinessProcessService.bpmDetailNode(nodeId);

    if (response.code == 0) {
      const result = response.result;

      if (element.type === "bpmn:SequenceFlow") {
        addLinkInChildProcess(result?.childProcessId, element);
      } else if (element.type === "bpmn:SubProcess") {
        addChildProcess(element, result?.childProcessId);
      } else {
        addNodeInChildProcess(result?.childProcessId, element);
      }
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
  };

  const addNodeInChildProcess = async (childProcessId, element) => {
    const businessObject = element?.businessObject;
    const body = {
      // id: nodeId || '',
      name: businessObject?.name || "",
      typeNode: getTypeNode(element),
      processId: childProcessId,
      nodeId: element.id,
      ...(getTypeNode(element) === "bpmn:CompensationBoundaryEvent" ? { attachToNodeId: businessObject?.attachedToRef?.id } : {}),
    };
    const response = await BusinessProcessService.bpmAddNode(body);

    if (response.code == 0) {
      const result = response.result;
    } else {
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
  };

  const addLinkInChildProcess = async (childProcessId, element) => {
    const fromNodeId = element?.businessObject?.sourceRef?.id;
    const toNodeId = element?.businessObject?.targetRef?.id;

    const body = {
      // id: '',
      fromNodeId: fromNodeId,
      toNodeId: toNodeId,
      flowType: "normal", //normal, condition
      config: "",
      processId: childProcessId,
      linkId: element.id,
    };
    if (body.fromNodeId && body.fromNodeId) {
      const response = await BusinessProcessService.bpmAddLinkNode(body);

      if (response.code == 0) {
        const result = response.result;
      } else {
        showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
      }
    }
  };

  const [newBpmModeler, setNewBpmModeler] = useState(null);

  const changeNameNodeXML = (dataNode, nameNode) => {
    const elementRegistry = newBpmModeler.get("elementRegistry");
    const modeling = newBpmModeler.get("modeling");
    const elementNew = elementRegistry.get(dataNode.id);

    if (elementNew && elementNew.businessObject && elementNew.businessObject.name !== nameNode) {
      modeling.updateProperties(dataNode, {
        name: nameNode,
      });
      console.log("Tên đã thay đổi:", dataNode.businessObject.name);
    }
  };

  const checkType = (type) => {
    switch (type) {
      case "bpmn:Association":
        return false;
      case "bpmn:BusinessRuleTask":
        return true;
      case "bpmn:CallActivity":
        return true;
      case "bpmn:ComplexGateway":
        return true;
      case "bpmn:DataInputAssociation":
        return false;
      case "bpmn:DataObjectReference":
        return true;
      case "bpmn:DataStoreReference":
        return true;
      case "bpmn:EndEvent":
        return true;
      case "bpmn:ExclusiveGateway":
        return true;
      case "bpmn:Group":
        return false;
      case "bpmn:InclusiveGateway":
        return true;
      case "bpmn:IntermediateThrowEvent":
        return true;
      case "bpmn:IntermediateCatchEvent":
        return true;
      case "bpmn:Lane":
        return false;
      case "bpmn:ManualTask":
        return true;
      case "bpmn:ParallelGateway":
        return true;
      case "bpmn:Participant":
        return false;
      case "bpmn:ReceiveTask":
        return true;
      case "bpmn:ScriptTask":
        return true;
      case "bpmn:SendTask":
        return true;
      // case "bpmn:SequenceFlow":
      //   return true;
      case "bpmn:ServiceTask":
        return true;
      case "bpmn:StartEvent":
        return true;
      case "bpmn:SubProcess":
        return true;
      case "bpmn:Task":
        return true;
      case "bpmn:TextAnnotation":
        return false;
      case "bpmn:Transaction":
        return false;
      case "bpmn:UserTask":
        return true;
      case "label":
        return false;
      default:
        return true;
    }
  };

  //Ẩn luôn menu "Change Element" trong Context Pad
  function CustomContextPadProvider(contextPad, injector) {
    const replaceMenu = injector.get("replaceMenu", false);
    const modeling = injector.get("modeling");

    contextPad.registerProvider(this);

    this.getContextPadEntries = function (element) {
      const bo = element.businessObject;
      const locked = bo?.$attrs?.lockedChangeElement === "true";

      const entries = {};

      // Chỉ hiển thị nút "Change Element" nếu chưa bị khóa
      if (!locked && replaceMenu && replaceMenu._getReplaceOptions(element).length) {
        entries.replace = {
          group: "edit",
          className: "bpmn-icon-replace",
          title: "Change element type",
          action: {
            click: (event, element) => {
              replaceMenu.open(element, replaceMenu._getReplaceOptions(element));
            },
          },
        };
      }

      // ✅ Override lại nút delete mặc định
      entries.delete = {
        group: "edit",
        className: "bpmn-icon-trash",
        title: "Xoá phần tử",
        action: {
          click: (event, element) => {
            showDialogConfirmCancel(element, modeling);
            // const confirmDelete = window.confirm(
            //   `Bạn có chắc chắn muốn xoá node: ${element.id}?`
            // );

            // if (confirmDelete) {
            //   modeling.removeElements([element]);
            // } else {
            //   console.log("Huỷ xoá node:", element.id);
            // }
          },
        },
      };

      return entries;
    };
  }

  CustomContextPadProvider.$inject = ["contextPad", "injector"];

  useEffect(() => {
    // Khởi tạo BpmnJS modeler
    let isUpdatingTask = false;
    let isReplacing = false;
    let deleteDone = true;

    bpmnModeler.current = new BpmnJS({
      container: modelerRef.current,
      width: "100%",
      // height: '600px',
      // height:' calc(100vh - 165px)',
      height: " calc(97.5vh - 165px)",
      keyboard: {
        bindTo: window, // Bắt sự kiện bàn phím toàn cục
      },
      additionalModules: [
        copyPasteModule,
        keyboardModule,
        {
          __init__: ["customContextPad"],
          customContextPad: ["type", CustomContextPadProvider],
        },
      ],
    });

    setNewBpmModeler(bpmnModeler.current);

    //Đánh dấu element đã từng bị thay đổi
    bpmnModeler.current.on("commandStack.shape.replace.executed", function (event) {
      const { newShape } = event.context;

      if (newShape && newShape.businessObject) {
        console.log("newShape.businessObject", newShape.businessObject);
        if (newShape.businessObject.$type !== "bpmn:IntermediateCatchEvent" && newShape.businessObject.$type !== "bpmn:BoundaryEvent") {
          newShape.businessObject.$attrs.lockedChangeElement = "true";
        }
      }
    });

    // Chặn thay đổi loại element tiếp theo
    bpmnModeler.current.on("commandStack.shape.replace.canExecute", function (event) {
      const { context } = event;
      const element = context.oldShape || context.element;

      if (element?.businessObject?.$attrs?.lockedChangeElement === "true") {
        return false; // Chặn thay đổi loại
      }
    });

    // const modeler = new BpmnJS({
    //   container: '#canvas', // Khai báo container để render sơ đồ BPMN
    //   keyboard: { bindTo: window } // Tùy chọn để liên kết với bàn phím
    // });
    // Tải quy trình mẫu ban đầu
    //     const initialDiagram = `<?xml version="1.0" encoding="UTF-8"?>
    // <definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
    //   <process id="Process_1" isExecutable="true">
    //     <startEvent id="StartEvent_1" name="Start">
    //       <outgoing>Flow_06qq21j</outgoing>
    //     </startEvent>
    //     <sendTask id="SendTask_1" name="Send Message">
    //       <incoming>Flow_06qq21j</incoming>
    //       <outgoing>Flow_184bi33</outgoing>
    //     </sendTask>
    //     <endEvent id="EndEvent_1" name="End">
    //       <incoming>Flow_184bi33</incoming>
    //     </endEvent>
    //     <sequenceFlow id="Flow_06qq21j" sourceRef="StartEvent_1" targetRef="SendTask_1" />
    //     <sequenceFlow id="Flow_184bi33" sourceRef="SendTask_1" targetRef="EndEvent_1" />
    //   </process>
    //   <message id="Message_1" name="SendOrderMessage" />
    //   <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    //     <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
    //       <bpmndi:BPMNShape id="StartEvent_1_di" bpmnElement="StartEvent_1">
    //         <dc:Bounds x="173" y="102" width="36" height="36" />
    //       </bpmndi:BPMNShape>
    //       <bpmndi:BPMNShape id="SendTask_1_di" bpmnElement="SendTask_1">
    //         <dc:Bounds x="259" y="80" width="100" height="80" />
    //       </bpmndi:BPMNShape>
    //       <bpmndi:BPMNShape id="EndEvent_1_di" bpmnElement="EndEvent_1">
    //         <dc:Bounds x="409" y="102" width="36" height="36" />
    //       </bpmndi:BPMNShape>
    //       <bpmndi:BPMNEdge id="Flow_06qq21j_di" bpmnElement="Flow_06qq21j">
    //         <di:waypoint x="209" y="120" />
    //         <di:waypoint x="259" y="120" />
    //       </bpmndi:BPMNEdge>
    //       <bpmndi:BPMNEdge id="Flow_184bi33_di" bpmnElement="Flow_184bi33">
    //         <di:waypoint x="359" y="120" />
    //         <di:waypoint x="409" y="120" />
    //       </bpmndi:BPMNEdge>
    //     </bpmndi:BPMNPlane>
    //   </bpmndi:BPMNDiagram>
    // </definitions>`;

    const initialDiagram =
      dataConfig ||
      `<?xml version="1.0" encoding="UTF-8"?>
      <definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
        <process id="Process_1" isExecutable="true">
          
        </process>
        <message id="Message_1" name="SendOrderMessage" />
        <bpmndi:BPMNDiagram id="BPMNDiagram_1">
          <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
            
            
          </bpmndi:BPMNPlane>
        </bpmndi:BPMNDiagram>
      </definitions>`;

    // const elementRegistry = bpmnModeler.current.get('elementRegistry');
    // const modeling = bpmnModeler.current.get('modeling');

    // bpmnModeler.current.on('contextPad.click', function(event) {
    //   const element = event.currentTarget;
    //   console.log('elementPad', element);

    //   const action = event.originalEvent;

    //   // Kiểm tra nếu phần tử là một Task
    //   if (element && element.businessObject.$type.startsWith(element.type)) {
    //     console.log('Task được chọn từ contextPad:', element.businessObject.name || element.businessObject.id);

    //     // Kiểm tra loại task đã được chọn
    //     if (action === 'replace') {
    //       console.log('Người dùng đã chọn thay đổi loại task');

    //       // Lấy loại task mới từ event hoặc contextPad
    //       const newTaskType = action.replaceOptions.newElement.type;
    //       console.log('Loại task mới:', newTaskType);

    //       // Bạn có thể tiếp tục cập nhật loại task ở đây nếu cần
    //       updateTaskType(element, newTaskType);
    //     }
    //   }
    // });

    // bpmnModeler.current.on('commandStack.element.updateProperties.executed', function(event) {
    //   console.log('event', event);

    //   const element = event.context.element;
    //   console.log('element12', element);

    //   const changedProperties = event.context.properties;
    //   console.log('changedProperties',changedProperties);
    //   console.log('changedProperties[]',element.businessObject.$type.startsWith(element.type));

    //   // Kiểm tra nếu phần tử là một Task và thuộc tính 'bpmn:type' bị thay đổi
    //   if (element.businessObject.$type.startsWith(element.type)) {
    //     if (changedProperties && changedProperties['bpmn:type']) {
    //       console.log('Loại Task đã thay đổi thành:', changedProperties['bpmn:type']);
    //       // updateTaskType(element.type, changedProperties['bpmn:type']);
    //     } else {
    //       console.log('Task đã được thay đổi:', element.businessObject.$type);
    //       // updateTaskType(element.type, element.businessObject.$type);
    //     }

    //   }
    // });

    // bpmnModeler.current.on('shape.added', (event) => {
    //   const element = event.element;
    //   console.log('elementAdd', element);

    //   if (element.type === "bpmn:SequenceFlow") {
    //     const fromNodeId = element?.businessObject?.sourceRef?.id;
    //     const toNodeId = element?.businessObject?.targetRef?.id
    //     addLinkNode(element, fromNodeId, toNodeId)

    //   } else {
    //     // Giả sử bạn đã có id của task hiện tại là 'Task_1'
    //     const taskElement = elementRegistry.get(element.id);
    //     // Kiểm tra nếu phần tử là một Task
    //     addNode(element)
    //   }
    // });

    // Lắng nghe sự kiện copy
    bpmnModeler.current.on("copyPaste.copyElement", function (event) {
      console.log("Đang copy element:", event.element);
    });

    // Lắng nghe sự kiện paste
    bpmnModeler.current.on("copyPaste.pasteElement", function (event) {
      console.log("Đang paste element:", event.element);
    });

    bpmnModeler.current.on("commandStack.connection.delete.postExecuted", function (event) {
      const connection = event.context.connection;
      if (isReplacing) {
        // Nếu xoá đang diễn ra trong quá trình thay thế, bỏ qua xử lý
        // console.log('Xoá trong quá trình thay thế, bỏ qua.');
        return;
      }

      // Kiểm tra nếu connection là một Sequence Flow
      if (connection.businessObject.$type === "bpmn:SequenceFlow") {
        console.log("Sequence Flow đã bị xoá:", connection);
        isUpdatingTask = true;
        deleteLinkNode(connection?.id);
      }
    });

    bpmnModeler.current.on("commandStack.connection.create.postExecuted", function (event) {
      const connection = event.context.connection;
      const fromNodeId = connection?.businessObject?.sourceRef?.id;
      const toNodeId = connection?.businessObject?.targetRef?.id;
      if (connection?.businessObject?.$parent?.id && connection.businessObject?.$parent?.$type === "bpmn:SubProcess") {
        getDetailNode(connection?.businessObject?.$parent?.id, connection);
      } else {
        addLinkNode(connection, fromNodeId, toNodeId);
      }
    });

    // Trước khi lệnh replace được thực thi
    bpmnModeler.current.on("commandStack.shape.replace.preExecute", function (event) {
      isReplacing = true; // Bắt đầu quá trình thay thế
      console.log("Bắt đầu quá trình thay thế");
    });

    // Sau khi lệnh replace hoàn tất
    bpmnModeler.current.on("commandStack.shape.replace.postExecuted", function (event) {
      isReplacing = false; // Kết thúc quá trình thay thế
      const element = event.context.newShape;
      console.log("Kết thúc quá trình thay thế", element);

      setTimeout(() => {
        if (checkType(element.type)) {
          if (element?.businessObject?.$parent?.id && element.businessObject?.$parent?.$type === "bpmn:SubProcess") {
            getDetailNode(element?.businessObject?.$parent?.id, element);
          } else if (element.type === "bpmn:SubProcess") {
            console.log("bpmn:SubProcess");
            // khi chuyên sang loại subprocess gọi api để tạo ra process con, lấy id process con cập nhật vào childProcessId của node
            addChildProcess(element, id);
          } else {
            addNode(element);
          }
        }
      }, 1000);
    });

    bpmnModeler.current.on("commandStack.shape.delete.postExecuted", function (event) {
      const { context } = event;
      const deletedElement = context.shape;
      console.log("Element deleted:", deletedElement);
      if (isReplacing) {
        // Nếu xoá đang diễn ra trong quá trình thay thế, bỏ qua xử lý
        // console.log('Xoá trong quá trình thay thế, bỏ qua.');
        deleteNode(deletedElement?.id);
        return;
      }

      isUpdatingTask = true;
      deleteNode(deletedElement?.id);
    });

    bpmnModeler.current.on("commandStack.shape.create.postExecuted", function (event) {
      const element = event.context.shape;
      if (isReplacing) {
        return;
      }
      console.log("element create shape", element);

      // if (element.type === 'bpmn:SubProcess') {
      //   console.log('SubProcess đã được tạo:', element);
      //   addChildProcess(element);
      //   isUpdatingTask=true;
      // }
      // Kiểm tra nếu phần tử là SubProcess
      if (checkType(element.type)) {
        if (element?.businessObject?.$parent?.id && element.businessObject?.$parent?.$type === "bpmn:SubProcess") {
          getDetailNode(element?.businessObject?.$parent?.id, element);
        } else if (element.type === "bpmn:SubProcess") {
          console.log("bpmn:SubProcess");
          // khi chuyên sang loại subprocess gọi api để tạo ra process con, lấy id process con cập nhật vào childProcessId của node
          addChildProcess(element, id);
        } else {
          addNode(element);
        }
      }
    });

    bpmnModeler.current.on("element.changed", (event) => {
      const element = event.element;
      const businessObject = element.businessObject;

      if (isUpdatingTask) {
        isUpdatingTask = false;
        return;
      }
      console.log("elementChange", element);

      if (checkType(element.type)) {
        if (element.type === "bpmn:SequenceFlow") {
          if (businessObject && businessObject.name) {
            console.log("Link name changed:", businessObject.name);
          }
          // addLinkNode(element, fromNodeId, toNodeId)
        } else {
          if (businessObject && businessObject.name) {
            console.log("Node name changed:", businessObject.name);
            addNameNode(businessObject.name, element);
          }
        }
      }

      // if(element?.businessObject?.$parent?.id && element.businessObject?.$parent?.$type === "bpmn:SubProcess"){
      //   if(checkType(element.type)){
      //     getDetailNode(element?.businessObject?.$parent?.id, element);
      //   }

      //   return;
      // }

      // if(checkType(element.type)){
      //   if (element.type === "bpmn:SequenceFlow") {
      //     const fromNodeId = element?.businessObject?.sourceRef?.id;
      //     const toNodeId = element?.businessObject?.targetRef?.id
      //     const taskElement = elementRegistry.get(element.id);
      //     addLinkNode(element, fromNodeId, toNodeId)

      //   } else {
      //     if(element.type === "bpmn:SubProcess"){
      //       console.log('bpmn:SubProcess');
      //       // khi chuyên sang loại subprocess gọi api để tạo ra process con, lấy id process con cập nhật vào childProcessId của node
      //       addChildProcess(element);
      //     } else {
      //       addNode(element)
      //     }
      //   }
      // }
    });

    const tooltip = tooltipRef.current;
    // Handle mouse over event
    bpmnModeler.current.on("element.hover", function (event) {
      const element = event.element;
      const name = element.id || "Unnamed";

      if (element.type === "bpmn:SequenceFlow") {
        console.log("Hover vào SequenceFlow:", element.id);
      }

      // Display tooltip
      tooltip.innerHTML = name;
      tooltip.style.display = "block";

      // Position the tooltip near the mouse pointer
      const mousePosition = event.originalEvent;
      tooltip.style.left = `${mousePosition.clientX + 10}px`; // Adjust for better visibility
      tooltip.style.top = `${mousePosition.clientY + 10}px`;
    });

    //Hàm để lấy ra nhiều node khi bấm shift và click chọn node
    const hookSelection = (modeler) => {
      const selection = modeler.get("selection");
      const eventBus = modeler.get("eventBus");

      let currentSelection = [];

      eventBus.on("element.click", function (event) {
        const element = event.element;

        // Nếu click vào canvas (root element) thì bỏ chọn hết
        if (!element || element.id === modeler.get("canvas").getRootElement().id) {
          currentSelection = [];
          selection.select([]);
          setListNodeSelected([]);
          return;
        }

        if (event.originalEvent.shiftKey) {
          // Nếu giữ Shift thì toggle
          if (currentSelection.find((e) => e.id === element.id)) {
            currentSelection = currentSelection.filter((e) => e.id !== element.id);
          } else {
            currentSelection = [...currentSelection, element];
          }
        } else {
          // Nếu không giữ Shift -> reset selection
          currentSelection = [element];
        }

        selection.select(currentSelection);
        setListNodeSelected(
          currentSelection.map((e) => {
            return {
              nodeId: e?.id,
              nodeName: e?.businessObject?.name,
            };
          })
        );

        console.log("Multi-select:", currentSelection);
      });
    };

    // Nhập quy trình vào modeler
    bpmnModeler.current
      .importXML(initialDiagram)
      .then(({ warnings }) => {
        hookSelection(bpmnModeler.current);
        if (warnings.length) {
          console.warn("Warnings", warnings);
        }

        // const startEvent = elementRegistry.get('StartEvent_1');
        // const endEvent = elementRegistry.get('EndEvent_1');

        // // Lấy Send Task dựa trên ID
        // const sendTaskElement = elementRegistry.get('SendTask_1');

        // // Cập nhật thông tin về Message
        // modeling.updateProperties(sendTaskElement, {
        //   'camunda:messageRef': 'Message_1'
        // });

        // // Bạn có thể định nghĩa message như sau
        // const moddle = bpmnModeler.current.get('moddle');

        // const message = moddle.create('bpmn:Message', { id: 'Message_1', name: 'SendOrderMessage' });

        // const definitions = bpmnModeler.current.getDefinitions();
        // definitions.rootElements.push(message);

        // // Thêm luồng từ Start Event tới Send Task
        // modeling.connect(startEvent, sendTaskElement);

        // // Thêm luồng từ Send Task tới End Event
        // modeling.connect(sendTaskElement, endEvent);
        bpmnModeler.current.on("element.click", (event) => {
          setNodeId(event.element.id);
          console.log("element.click", event);
        });

        bpmnModeler.current.on("element.dblclick", (event) => {
          const element = event.element;
          console.log("element", element);
          setDataNode(element);

          if (element.type === "bpmn:SendTask") {
            // console.log("Send Task được click:", element);
            setIsModalSendTask(true);
            //SendTask popup
          }

          if (element.type === "bpmn:ReceiveTask") {
            setIsModalReceiveTask(true);
          }
          if (element.type === "bpmn:UserTask") {
            //Bật cửa sổ popup cho phép cấu hình form-js
            setIsModalUserTask(true);
          }
          if (element.type === "bpmn:ServiceTask") {
            setIsModalServiceTask(true);
          }
          if (element.type === "bpmn:ScriptTask") {
            setIsModalScriptTask(true);
          }
          if (element.type === "bpmn:ManualTask") {
            setIsModalManualTask(true);
          }
          if (element.type === "bpmn:BusinessRuleTask") {
            setIsModalBusinessRuleTask(true);
          }
          if (element.type === "bpmn:CallActivity") {
            setIsModalCallActivityTask(true);
          }
          if (element.type === "bpmn:ParallelGateway") {
            setIsModalParallelGateway(true);
          }
          if (element.type === "bpmn:ExclusiveGateway") {
            setIsModalExclusiveGateway(true);
          }
          if (element.type === "bpmn:InclusiveGateway") {
            setIsModalInclusiveGateway(true);
          }
          if (element.type === "bpmn:ComplexGateway") {
            setIsModalComplexGateway(true);
          }
          if (element.type === "bpmn:SubProcess") {
            setIsModalSubprocess(true);
          }
          if (element.type === "bpmn:SequenceFlow") {
            setIsModalSequenceFlow(true);
          }

          if (element.type === "bpmn:StartEvent") {
            if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:TimerEventDefinition") {
              setIsModalTimeStartEvent(true);
            } else if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:MessageEventDefinition") {
              setIsModalStartMessageEvent(true);
            } else if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:SignalEventDefinition") {
              setIsModalSignalStartEvent(true);
            } else if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:ConditionalEventDefinition") {
              setIsModalConditionalStartEvent(true);
            } else if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:EscalationEventDefinition") {
              setIsModalEscalationStartEvent(true);
            } else if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:ErrorEventDefinition") {
              setIsModalErrorStartEvent(true);
            } else if (element.businessObject.$parent?.$type === "bpmn:SubProcess") {
              if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:CompensateEventDefinition") {
                setIsModalCompensationStartEvent(true);
              }
            } else {
              //Bật cửa sổ popup cho phép cấu hình start event
              setIsModalStartEvent(true);
            }
          }

          if (element.type === "bpmn:EndEvent") {
            if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:MessageEventDefinition") {
              setIsModalEndMessageEvent(true);
            } else if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:MessageEventDefinition") {
              setIsModalEndMessageEvent(true);
            } else if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:SignalEventDefinition") {
              setIsModalSignalEndEvent(true);
            } else if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:CompensateEventDefinition") {
              setIsModalCompensationEndEvent(true);
            } else if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:EscalationEventDefinition") {
              setIsModalEscalationEndEvent(true);
            } else if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:ErrorEventDefinition") {
              setIsModalErrorEndEvent(true);
            } else if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:TerminateEventDefinition") {
              setIsModalTerminateEndEvent(true);
            } else {
              //Bật cửa sổ popup cho phép cấu hình end event
              setIsModalEndEvent(true);
            }
          }

          if (element.type === "bpmn:IntermediateThrowEvent") {
            if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:TimerEventDefinition") {
              // setIsModalTimeStartEvent(true);
            } else if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:MessageEventDefinition") {
              setIsModalMessageIntermediateThrowEvent(true);
            } else if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:EscalationEventDefinition") {
              setIsModalEscalationIntermediateThrowEvent(true);
            } else if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:CompensateEventDefinition") {
              setIsModalCompensationIntermediateThrowEvent(true);
            } else if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:LinkEventDefinition") {
              setIsModalLinkThrowEvent(true);
            } else if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:SignalEventDefinition") {
              setIsModalSignalIntermediateThrowEvent(true);
            }
          }

          if (element.type === "bpmn:IntermediateCatchEvent") {
            if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:TimerEventDefinition") {
              setIsModalTimerIntermediateCatchEvent(true);
            } else if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:MessageEventDefinition") {
              setIsModalMessageIntermediateCatchEvent(true);
            } else if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:LinkEventDefinition") {
              setIsModalLinkCatchEvent(true);
            } else if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:ConditionalEventDefinition") {
              setIsModalIntermediateCatchEvent(true);
            } else if (element.businessObject.eventDefinitions[0]?.$type === "bpmn:SignalEventDefinition") {
              setIsModalSignalIntermediateCatchEvent(true);
            }
          }

          if (element.type === "bpmn:BoundaryEvent") {
          }
        });
      })
      .catch((err) => {
        console.error("Error importing BPMN diagram", err);
      });

    return () => {
      // Cleanup khi component bị hủy
      bpmnModeler.current.destroy();
    };
  }, [dataConfig]);

  // Hàm phóng to
  const handleZoomIn = () => {
    const canvas = bpmnModeler.current.get("canvas");
    const currentZoom = canvas.zoom();
    canvas.zoom(currentZoom + 0.2); // Tăng tỷ lệ zoom
  };

  // Hàm thu nhỏ
  const handleZoomOut = () => {
    const canvas = bpmnModeler.current.get("canvas");
    const currentZoom = canvas.zoom();
    canvas.zoom(currentZoom - 0.2); // Giảm tỷ lệ zoom
  };

  // Hàm để lưu quy trình dưới dạng XML
  const saveDiagram = async () => {
    try {
      const { xml } = await bpmnModeler.current.saveXML({ format: true });
      console.log("Saved BPMN 2.0 XML", xml);
      const body = {
        id: id,
        config: xml,
      };
      const response = await BusinessProcessService.saveDiagram(body);

      if (response.code === 0) {
        showToast(`Lưu biểu đồ thành công`, "success");
      } else {
        showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
      }
    } catch (err) {
      console.error("Could not save BPMN diagram", err);
    }
  };

  const [isLoadingExport, setIsLoadingEpxort] = useState(false);
  const exportDataProcess = async (processId) => {
    setIsLoadingEpxort(true);
    const body = {
      processId: +processId,
    };
    const response = await BusinessProcessService.exportDataProcess(body);

    if (response.code == 0) {
      const result = response.result;
      const requestId = result?.requestId;

      if (requestId) {
        setRequestId(requestId);
      } else {
        setIsLoadingEpxort(false);
      }
    } else {
      setIsLoadingEpxort(false);
      showToast(response.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau", "error");
    }
  };

  const [requestId, setRequestId] = useState(null);

  useEffect(() => {
    if (requestId) {
      const timer = setInterval(
        async () => {
          const response = await BusinessProcessService.getUrlExportDataProcess({ requestId: requestId });
          if (response.code == 0) {
            const result = response.result;
            const fileResponse = result.fileResponse;

            if (fileResponse) {
              handDownloadFileOrigin(fileResponse?.fileUrl, fileResponse?.fileName);
              showToast("Xuất dữ liệu thành công", "success");
              clearInterval(timer);
              setRequestId(null);
            }
            setIsLoadingEpxort(false);
          }
        },
        2000,
        requestId
      );

      return () => clearInterval(timer);
    }
  }, [requestId]);

  const [isLoadingFile, setIsLoadingFile] = useState<boolean>(false);
  const [showProgress, setShowProgress] = useState<number>(0);
  const handleUploadDocument = (e) => {
    e.preventDefault();

    const file = e.target.files[0];

    const dataImport = {
      file: file,
      processId: id,
    };

    const checkFile = file.type;
    setIsLoadingFile(true);

    if (checkFile.startsWith("application")) {
      uploadDocumentFormData(dataImport, onSuccess, onError, onProgress, "processData");
    }

    e.target.value = ""; // Reset the input value to allow re-uploading the same file
  };

  //* Xử lý tài liệu
  const onSuccess = (data) => {
    if (data) {
      showToast("Import dữ liệu quy trình thành công!", "success");
      getDetailBusinessProcess(id);
      const result = {
        fileUrl: data.fileUrl,
        type: data.extension,
        fileName: data.fileName,
        fileSize: data.fileSize,
      };

      setIsLoadingFile(false);
    }
  };

  const onError = (message) => {
    setIsLoadingFile(false);
    showToast(message.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau !", "error");
  };

  const onProgress = (percent) => {
    if (percent) {
      setShowProgress(percent.toFixed(0));
    }
  };

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [contentConfirmDelete, setContentConfirmDelete] = useState<IContentDialog>(null);

  const showDialogConfirmCancel = (element, modeling) => {
    const businessObject = element?.businessObject;
    const contentDialog: IContentDialog = {
      color: "warning",
      className: "dialog-cancel",
      isCentered: true,
      isLoading: false,
      title: <Fragment>{`Xoá ${element?.type === "bpmn:SequenceFlow" ? "Link Node" : "Node"} `}</Fragment>,
      message: (
        <Fragment>
          Bạn có chắc chắn muốn xoá {element?.type === "bpmn:SequenceFlow" ? "Link Node" : "Node"}{" "}
          <span style={{ fontWeight: "700" }}>{businessObject?.name || businessObject?.id}</span> ? Thao tác này không thể khôi phục.
        </Fragment>
      ),
      cancelText: "Quay lại",
      cancelAction: () => {
        setShowConfirmDelete(false);
        setContentConfirmDelete(null);
      },
      defaultText: "Xác nhận",
      defaultAction: () => {
        modeling.removeElements([element]);
        setShowConfirmDelete(false);
        setContentConfirmDelete(null);
      },
    };
    setContentConfirmDelete(contentDialog);
    setShowConfirmDelete(true);
  };

  return (
    <div>
      <div
        ref={modelerRef}
        style={{
          border: "1px solid #ccc",
          // height:' calc(100vh - 165px)',
          height: " calc(97.5vh - 165px)",
          backgroundColor: "white",
        }}
      />

      <div className="zoom-buttons">
        <div className="zoom-btn zoom-in" onClick={handleZoomIn}>
          +
        </div>
        <div className="zoom-btn zoom-out" onClick={handleZoomOut}>
          −
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "80%" }}>
          <span style={{ fontSize: 14 }}>Quy trình: {dataProcess?.name}</span>
        </div>
        <div style={{ fontSize: 14 }} ref={tooltipRef} />
      </div>

      <div style={{ display: "flex", marginTop: "1rem", justifyContent: "space-between" }}>
        {/* <Button
          color="primary"
          // variant="outline"
          onClick={importNode}
        >
          Import Node
        </Button> */}
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "1rem" }}>
            <Button
              color="primary"
              variant="outline"
              onClick={(e) => {
                navigate(
                  `/bpm/manage_processes?page=${takeUrlProcessLocalStorage?.page || 1}` +
                    `${takeUrlProcessLocalStorage.name ? `&name=${takeUrlProcessLocalStorage.name}` : ""}`
                );
              }}
            >
              Quay lại
            </Button>
          </div>
          <Button
            color="primary"
            // variant="outline"
            onClick={saveDiagram}
          >
            Lưu
          </Button>
        </div>

        <div style={{ display: "flex", gap: "0 1rem", alignItems: "flex-start" }}>
          {/* <label htmlFor="ImportData">
            <div 
              className="button-import"
              onClick={() => {
                setIsImportProcess(true);
              }}
            >
              Import
            </div>
          </label> */}
          <div
            className="button-import"
            onClick={() => {
              setIsImportProcess(true);
            }}
          >
            Import
          </div>
          <div
            className="button-export"
            onClick={() => {
              // exportDataProcess(id);
              setIsExportProcess(true);
            }}
          >
            Export
            {isLoadingExport && <Icon name="Loading" />}
          </div>
          {/* <Button
            color="primary"
            // variant="outline"
            onClick={() => exportDataProcess(id)}
          >
            Export
            {isLoadingExport && <Icon name="Loading" />}
          </Button> */}
        </div>

        <input type="file" accept=".xlsx,.xls" className="d-none" id="ImportData" onChange={(e) => handleUploadDocument(e)} />
      </div>

      <Dialog content={contentConfirmDelete} isOpen={showConfirmDelete} />

      <ModalUserTask
        onShow={isModalUserTask}
        dataNode={dataNode}
        processId={id}
        disable={false}
        onHide={(reload) => {
          if (reload) {
            // getListOjectGroup(params);
          }
          setIsModalUserTask(false);
          setDataNode(null);
        }}
      />

      <ModalServiceTask
        onShow={isModalServiceTask}
        dataNode={dataNode}
        processId={id}
        disable={false}
        onHide={(reload) => {
          if (reload) {
            // getListOjectGroup(params);
          }
          setIsModalServiceTask(false);
          setDataNode(null);
        }}
        changeNameNodeXML={changeNameNodeXML}
      />

      <ModalScriptTask
        onShow={isModalScriptTask}
        dataNode={dataNode}
        processId={id}
        disable={false}
        onHide={(reload) => {
          if (reload) {
            // getListOjectGroup(params);
          }
          setIsModalScriptTask(false);
          setDataNode(null);
        }}
        changeNameNodeXML={changeNameNodeXML}
      />

      <ModalManualTask
        onShow={isModalManualTask}
        dataNode={dataNode}
        processId={id}
        disable={false}
        onHide={(reload) => {
          if (reload) {
            // getListOjectGroup(params);
          }
          setIsModalManualTask(false);
          setDataNode(null);
        }}
        changeNameNodeXML={changeNameNodeXML}
      />

      <ModalStartEvent
        onShow={isModalStartEvent}
        dataNode={dataNode}
        processId={id}
        disable={false}
        onHide={(reload) => {
          if (reload) {
            // getListOjectGroup(params);
          }
          setIsModalStartEvent(false);
          setDataNode(null);
        }}
        changeNameNodeXML={changeNameNodeXML}
      />

      <ModalEndEvent
        onShow={isModalEndEvent}
        dataNode={dataNode}
        processId={id}
        disable={false}
        onHide={(reload) => {
          if (reload) {
            // getListOjectGroup(params);
          }
          setIsModalEndEvent(false);
          setDataNode(null);
        }}
        changeNameNodeXML={changeNameNodeXML}
      />
      <ModalErrorEndEvent
        onShow={isModalErrorEndEvent}
        dataNode={dataNode}
        processId={id}
        disable={false}
        onHide={(reload) => {
          if (reload) {
            // getListOjectGroup(params);
          }
          setIsModalErrorEndEvent(false);
          setDataNode(null);
        }}
        changeNameNodeXML={changeNameNodeXML}
      />
      <ModalErrorStartEvent
        onShow={isModalErrorStartEvent}
        dataNode={dataNode}
        processId={id}
        disable={false}
        onHide={(reload) => {
          if (reload) {
            // getListOjectGroup(params);
          }
          setIsModalErrorStartEvent(false);
          setDataNode(null);
        }}
        changeNameNodeXML={changeNameNodeXML}
      />

      <ModalBusinessRuleTask
        onShow={isModaBusinessRuleTask}
        // onShow={true}
        dataNode={dataNode}
        processId={id}
        disable={false}
        onHide={(reload) => {
          if (reload) {
            // getListOjectGroup(params);
          }
          setIsModalBusinessRuleTask(false);
          setDataNode(null);
        }}
        changeNameNodeXML={changeNameNodeXML}
      />

      <ModalSendTask
        onShow={isModaSendTask}
        dataNode={dataNode}
        processId={id}
        disable={false}
        onHide={(reload) => {
          if (reload) {
            // getListOjectGroup(params);
          }
          setIsModalSendTask(false);
          setDataNode(null);
        }}
        changeNameNodeXML={changeNameNodeXML}
      />

      <ModalReceiveTask
        onShow={isModaReceiveTask}
        dataNode={dataNode}
        processId={id}
        disable={false}
        onHide={(reload) => {
          if (reload) {
            // getListOjectGroup(params);
          }
          setIsModalReceiveTask(false);
          setDataNode(null);
        }}
        changeNameNodeXML={changeNameNodeXML}
      />

      <ModalMessageIntermediateThrowEvent
        onShow={isModalMessageIntermediateThrowEvent}
        dataNode={dataNode}
        processId={id}
        disable={false}
        onHide={(reload) => {
          if (reload) {
            // getListOjectGroup(params);
          }
          setIsModalMessageIntermediateThrowEvent(false);
          setDataNode(null);
        }}
        changeNameNodeXML={changeNameNodeXML}
      />

      <ModalMessageIntermediateCatchEvent
        onShow={isModalMessageIntermediateCatchEvent}
        dataNode={dataNode}
        processId={id}
        disable={false}
        onHide={(reload) => {
          if (reload) {
            // getListOjectGroup(params);
          }
          setIsModalMessageIntermediateCatchEvent(false);
          setDataNode(null);
        }}
        changeNameNodeXML={changeNameNodeXML}
      />

      <ModalCallActivityTask
        onShow={isModalCallActivityTask}
        dataNode={dataNode}
        processId={id}
        disable={false}
        onHide={(reload) => {
          if (reload) {
            // getListOjectGroup(params);
          }
          setIsModalCallActivityTask(false);
          setDataNode(null);
        }}
        changeNameNodeXML={changeNameNodeXML}
      />

      <ModalParallelGatewayTask
        onShow={isModalParallelGateway}
        dataNode={dataNode}
        processId={id}
        disable={false}
        onHide={(reload) => {
          if (reload) {
            // getListOjectGroup(params);
          }
          setIsModalParallelGateway(false);
          setDataNode(null);
        }}
      />

      <ModalExclusiveGateway
        onShow={isModalExclusiveGateway}
        dataNode={dataNode}
        processId={id}
        disable={false}
        onHide={(reload) => {
          if (reload) {
            // getListOjectGroup(params);
          }
          setIsModalExclusiveGateway(false);
          setDataNode(null);
        }}
      />

      <ModalInclusiveGateway
        onShow={isModalInclusiveGateway}
        dataNode={dataNode}
        processId={id}
        disable={false}
        onHide={(reload) => {
          if (reload) {
            // getListOjectGroup(params);
          }
          setIsModalInclusiveGateway(false);
          setDataNode(null);
        }}
      />

      <ModalComplexGateway
        onShow={isModalComplexGateway}
        dataNode={dataNode}
        processId={id}
        disable={false}
        onHide={(reload) => {
          if (reload) {
            // getListOjectGroup(params);
          }
          setIsModalComplexGateway(false);
          setDataNode(null);
        }}
      />

      <ModalSubprocess
        onShow={isModalSubprocess}
        dataNode={dataNode}
        processId={id}
        disable={false}
        onHide={(reload) => {
          if (reload) {
            // getListOjectGroup(params);
          }
          setIsModalSubprocess(false);
          setDataNode(null);
        }}
        changeNameNodeXML={changeNameNodeXML}
      />

      <ModalSequenceFlow
        onShow={isModalSequenceFlow}
        dataNode={dataNode}
        processId={id}
        disable={false}
        setDataNode={setDataNode}
        // statusMA={statusProcess}
        onHide={(reload) => {
          if (reload) {
            // getDettailProcess(+id);
          }
          setIsModalSequenceFlow(false);
          setDataNode(null);
          // if(reload !== 'not_close'){
          //   setModalConfigCondition(false);
          //   setDataNode(null);
          // }
        }}
      />
      <ModalTimerStartEventTask
        onShow={isModalTimerStartEvent}
        dataNode={dataNode}
        processId={id}
        disable={false}
        onHide={(reload) => {
          if (reload) {
            // getListOjectGroup(params);
          }
          setIsModalTimeStartEvent(false);
          setDataNode(null);
        }}
        changeNameNodeXML={changeNameNodeXML}
      />

      <ModalIntermediateCatchEvent
        onShow={isModalIntermediateCatchEvent}
        dataNode={dataNode}
        processId={id}
        disable={false}
        onHide={(reload) => {
          if (reload) {
            // getListOjectGroup(params);
          }
          setIsModalIntermediateCatchEvent(false);
          setDataNode(null);
        }}
        changeNameNodeXML={changeNameNodeXML}
      />

      <ModalLinkCatchEvent
        onShow={isModalLinkCatchEvent}
        dataNode={dataNode}
        processId={id}
        disable={false}
        onHide={(reload) => {
          if (reload) {
            // getListOjectGroup(params);
          }
          setIsModalLinkCatchEvent(false);
          setDataNode(null);
        }}
        changeNameNodeXML={changeNameNodeXML}
      />

      <ModalLinkThrowEvent
        onShow={isModalLinkThrowEvent}
        dataNode={dataNode}
        processId={id}
        disable={false}
        onHide={(reload) => {
          if (reload) {
            // getListOjectGroup(params);
          }
          setIsModalLinkThrowEvent(false);
          setDataNode(null);
        }}
        changeNameNodeXML={changeNameNodeXML}
      />
      <ModalEscalationStartEvent
        onShow={isModalEscalationStartEvent}
        dataNode={dataNode}
        processId={id}
        disable={false}
        onHide={(reload) => {
          if (reload) {
            // getListOjectGroup(params);
          }
          setIsModalEscalationStartEvent(false);
          setDataNode(null);
        }}
        changeNameNodeXML={changeNameNodeXML}
      />

      <ModalEscalationEndEvent
        onShow={isModalEscalationEndEvent}
        dataNode={dataNode}
        processId={id}
        disable={false}
        onHide={(reload) => {
          if (reload) {
            // getListOjectGroup(params);
          }
          setIsModalEscalationEndEvent(false);
          setDataNode(null);
        }}
        changeNameNodeXML={changeNameNodeXML}
      />

      <ModalStartMessageEvent
        onShow={isModalStartMessageEvent}
        dataNode={dataNode}
        processId={id}
        disable={false}
        onHide={(reload) => {
          if (reload) {
            // getListOjectGroup(params);
          }
          setIsModalStartMessageEvent(false);
          setDataNode(null);
        }}
        changeNameNodeXML={changeNameNodeXML}
      />

      <ModalEndMessageEvent
        onShow={isModalEndMessageEvent}
        dataNode={dataNode}
        processId={id}
        disable={false}
        onHide={(reload) => {
          if (reload) {
            // getListOjectGroup(params);
          }
          setIsModalEndMessageEvent(false);
          setDataNode(null);
        }}
        changeNameNodeXML={changeNameNodeXML}
      />

      <ModalSignalStartEvent
        onShow={isModalSignalStartEvent}
        dataNode={dataNode}
        processId={id}
        disable={false}
        onHide={(reload) => {
          if (reload) {
            // getListOjectGroup(params);
          }
          setIsModalSignalStartEvent(false);
          setDataNode(null);
        }}
        changeNameNodeXML={changeNameNodeXML}
      />

      <ModalSignalEndEvent
        onShow={isModalSignalEndEvent}
        dataNode={dataNode}
        processId={id}
        disable={false}
        onHide={(reload) => {
          if (reload) {
            // getListOjectGroup(params);
          }
          setIsModalSignalEndEvent(false);
          setDataNode(null);
        }}
        changeNameNodeXML={changeNameNodeXML}
      />

      <ModalEscalationIntermediateThrowEvent
        onShow={isModalEscalationIntermediateThrowEvent}
        dataNode={dataNode}
        processId={id}
        disable={false}
        onHide={(reload) => {
          if (reload) {
            // getListOjectGroup(params);
          }
          setIsModalEscalationIntermediateThrowEvent(false);
          setDataNode(null);
        }}
        changeNameNodeXML={changeNameNodeXML}
      />

      <ModalCompensationIntermediateThrowEvent
        onShow={isModalCompensationIntermediateThrowEvent}
        dataNode={dataNode}
        processId={id}
        disable={false}
        onHide={(reload) => {
          if (reload) {
            // getListOjectGroup(params);
          }
          setIsModalCompensationIntermediateThrowEvent(false);
          setDataNode(null);
        }}
        changeNameNodeXML={changeNameNodeXML}
      />

      <ModalCompensationEndEvent
        onShow={isModalCompensationEndEvent}
        dataNode={dataNode}
        processId={id}
        disable={false}
        onHide={(reload) => {
          if (reload) {
            // getListOjectGroup(params);
          }
          setIsModalCompensationEndEvent(false);
          setDataNode(null);
        }}
        changeNameNodeXML={changeNameNodeXML}
      />

      <ModalTimerIntermediateCatchEvent
        onShow={isModalTimerIntermediateCatchEvent}
        dataNode={dataNode}
        processId={id}
        disable={false}
        onHide={(reload) => {
          if (reload) {
            // getListOjectGroup(params);
          }
          setIsModalTimerIntermediateCatchEvent(false);
          setDataNode(null);
        }}
        changeNameNodeXML={changeNameNodeXML}
      />

      <ModalImportProcess
        onShow={isImportProcess}
        processId={id}
        onHide={(reload) => {
          if (reload) {
            getDetailBusinessProcess(id);
          }
          setIsImportProcess(false);
          setDataNode(null);
        }}
      />
      <ModalExportProcess
        onShow={isExportProcess}
        processId={id}
        listNodeSelected={listNodeSelected}
        onHide={(reload) => {
          if (reload) {
            getDetailBusinessProcess(id);
          }
          setIsExportProcess(false);
          setDataNode(null);
        }}
      />

      <ModalConditionalStartEvent
        onShow={isModalConditionalStartEvent}
        dataNode={dataNode}
        processId={id}
        disable={false}
        onHide={(reload) => {
          if (reload) {
            // getListOjectGroup(params);
          }
          setIsModalConditionalStartEvent(false);
          setDataNode(null);
        }}
        changeNameNodeXML={changeNameNodeXML}
      />

      <ModalSignalIntermediateThrowEvent
        onShow={isModalSignalIntermediateThrowEvent}
        dataNode={dataNode}
        processId={id}
        disable={false}
        onHide={(reload) => {
          if (reload) {
            // getListOjectGroup(params);
          }
          setIsModalSignalIntermediateThrowEvent(false);
          setDataNode(null);
        }}
        changeNameNodeXML={changeNameNodeXML}
      />

      <ModalSignalIntermediateCatchEvent
        onShow={isModalSignalIntermediateCatchEvent}
        dataNode={dataNode}
        processId={id}
        disable={false}
        onHide={(reload) => {
          if (reload) {
            // getListOjectGroup(params);
          }
          setIsModalSignalIntermediateCatchEvent(false);
          setDataNode(null);
        }}
        changeNameNodeXML={changeNameNodeXML}
      />

      <ModalTerminateEndEvent
        onShow={isModalTerminateEndEvent}
        dataNode={dataNode}
        processId={id}
        disable={false}
        onHide={(reload) => {
          if (reload) {
            // getListOjectGroup(params);
          }
          setIsModalTerminateEndEvent(false);
          setDataNode(null);
        }}
        changeNameNodeXML={changeNameNodeXML}
      />

      <ModalCompensationStartEvent
        onShow={isModalCompensationStartEvent}
        dataNode={dataNode}
        processId={id}
        disable={false}
        onHide={(reload) => {
          if (reload) {
            // getListOjectGroup(params);
          }
          setIsModalCompensationStartEvent(false);
          setDataNode(null);
        }}
        changeNameNodeXML={changeNameNodeXML}
      />
    </div>
  );
};

export default BusinessProcessCreate;
