import { http, HttpResponse } from "msw";
import {
  mockArtifacts,
  mockBpmForms,
  mockBpmTriggers,
  mockBusinessRuleItems,
  mockBusinessRules,
  mockDecisionInputs,
  mockDecisionOutputs,
  mockE2eProcessedObjects,
  mockFormCategories,
  mockObjectAttributes,
  mockObjectGroups,
  mockProcessErrorLogs,
  mockProcessedObjects,
  mockProcesses,
  mockProcessPermissions,
  mockServiceLevels,
  mockVariableDeclares,
  mockVariableInstances,
  mockWorkflowSteps,
  mockWorkflowTasks,
  mockWorkOrders,
  now,
  e2eBpmnXml,
} from "../data/bpmClinicalMockData";
import { buildDetailResponse, buildListResponse, buildOkResponse, getRequestInfo, parseQueryParams } from "./utils";

const processes = [...mockProcesses];
let processPermissions = [...mockProcessPermissions];

const defaultBpmnXml = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
  xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
  id="Definitions_1"
  targetNamespace="http://bpmn.io/schema/bpmn">
  <process id="Process_1" isExecutable="true">
    <startEvent id="StartEvent_1" name="Tiếp nhận bệnh nhân">
      <outgoing>Flow_1</outgoing>
    </startEvent>
    <userTask id="Task_1" name="Thu thập triệu chứng">
      <incoming>Flow_1</incoming>
      <outgoing>Flow_2</outgoing>
    </userTask>
    <exclusiveGateway id="Gateway_1" name="Đủ dữ liệu?">
      <incoming>Flow_2</incoming>
      <outgoing>Flow_3</outgoing>
      <outgoing>Flow_4</outgoing>
    </exclusiveGateway>
    <serviceTask id="Task_2" name="Phân tích AI">
      <incoming>Flow_3</incoming>
      <outgoing>Flow_5</outgoing>
    </serviceTask>
    <userTask id="Task_3" name="Bác sĩ kết luận">
      <incoming>Flow_5</incoming>
      <incoming>Flow_4</incoming>
      <outgoing>Flow_6</outgoing>
    </userTask>
    <endEvent id="EndEvent_1" name="Kết thúc quy trình">
      <incoming>Flow_6</incoming>
    </endEvent>
    <sequenceFlow id="Flow_1" sourceRef="StartEvent_1" targetRef="Task_1" />
    <sequenceFlow id="Flow_2" sourceRef="Task_1" targetRef="Gateway_1" />
    <sequenceFlow id="Flow_3" sourceRef="Gateway_1" targetRef="Task_2" name="Có" />
    <sequenceFlow id="Flow_4" sourceRef="Gateway_1" targetRef="Task_3" name="Không" />
    <sequenceFlow id="Flow_5" sourceRef="Task_2" targetRef="Task_3" />
    <sequenceFlow id="Flow_6" sourceRef="Task_3" targetRef="EndEvent_1" />
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="StartEvent_1_di" bpmnElement="StartEvent_1"><dc:Bounds x="150" y="180" width="36" height="36" /></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_1_di" bpmnElement="Task_1"><dc:Bounds x="250" y="160" width="140" height="80" /></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_1_di" bpmnElement="Gateway_1" isMarkerVisible="true"><dc:Bounds x="450" y="175" width="50" height="50" /></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_2_di" bpmnElement="Task_2"><dc:Bounds x="560" y="70" width="150" height="80" /></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_3_di" bpmnElement="Task_3"><dc:Bounds x="760" y="160" width="160" height="80" /></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="EndEvent_1_di" bpmnElement="EndEvent_1"><dc:Bounds x="980" y="180" width="36" height="36" /></bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_1_di" bpmnElement="Flow_1"><di:waypoint x="186" y="198" /><di:waypoint x="250" y="200" /></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_2_di" bpmnElement="Flow_2"><di:waypoint x="390" y="200" /><di:waypoint x="450" y="200" /></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_3_di" bpmnElement="Flow_3"><di:waypoint x="475" y="175" /><di:waypoint x="475" y="110" /><di:waypoint x="560" y="110" /></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_4_di" bpmnElement="Flow_4"><di:waypoint x="500" y="200" /><di:waypoint x="760" y="200" /></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_5_di" bpmnElement="Flow_5"><di:waypoint x="710" y="110" /><di:waypoint x="840" y="110" /><di:waypoint x="840" y="160" /></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_6_di" bpmnElement="Flow_6"><di:waypoint x="920" y="200" /><di:waypoint x="980" y="198" /></bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>`;

const processDiagramXml: Record<number, string> = Object.fromEntries(processes.map((p) => [p.id, defaultBpmnXml]));
// Override process 9 with the full E2E demo BPMN
processDiagramXml[9] = e2eBpmnXml;
const stateMappings = [
  { id: 1, stateCode: "NEW", stateName: "Mới tiếp nhận", color: "#64748B" },
  { id: 2, stateCode: "IN_PROGRESS", stateName: "Đang xử lý", color: "#2563EB" },
  { id: 3, stateCode: "WAITING", stateName: "Chờ kết quả", color: "#D97706" },
  { id: 4, stateCode: "DONE", stateName: "Hoàn thành", color: "#16A34A" },
  { id: 5, stateCode: "REJECTED", stateName: "Từ chối", color: "#DC2626" },
];

let nextStateMappingId = 10;
let nextWorkflowStepId = 10000;

type ProcessDiagram = { status: number; nodes: Array<any>; configs: Array<any> };

const buildProcessDiagram = (processId: number): ProcessDiagram => {
  const offsetX = ((processId - 1) % 3) * 30;
  const offsetY = Math.floor((processId - 1) / 3) * 20;
  const startId = processId * 1000 + 1;

  return {
    status: processId % 2 === 0 ? 1 : 0,
    nodes: [
      {
        id: startId,
        processId,
        typeNode: "input",
        name: "Bắt đầu",
        code: "start",
        position: { x: 80 + offsetX, y: 220 + offsetY },
        point: null,
        configData: null,
      },
      {
        id: startId + 1,
        processId,
        typeNode: "default",
        name: "Tiếp nhận hồ sơ",
        code: "do",
        position: { x: 280 + offsetX, y: 210 + offsetY },
        point: null,
        configData: { assigneeType: "EMPLOYEE" },
      },
      {
        id: startId + 2,
        processId,
        typeNode: "default",
        name: "Khám chuyên khoa",
        code: "do",
        position: { x: 500 + offsetX, y: 210 + offsetY },
        point: null,
        configData: { department: "Da liễu" },
      },
      {
        id: startId + 3,
        processId,
        typeNode: "default",
        name: "Đủ điều kiện điều trị?",
        code: "condition",
        position: { x: 730 + offsetX, y: 210 + offsetY },
        point: null,
        configData: { expression: "priority in ['high','urgent']" },
      },
      {
        id: startId + 4,
        processId,
        typeNode: "default",
        name: "Thực hiện phác đồ",
        code: "do",
        position: { x: 970 + offsetX, y: 130 + offsetY },
        point: null,
        configData: { formCode: "FORM-TREATMENT" },
      },
      {
        id: startId + 5,
        processId,
        typeNode: "default",
        name: "Theo dõi sau điều trị",
        code: "do",
        position: { x: 970 + offsetX, y: 300 + offsetY },
        point: null,
        configData: { nextVisitInDays: 7 },
      },
      {
        id: startId + 6,
        processId,
        typeNode: "output",
        name: "Kết thúc",
        code: "done",
        position: { x: 1240 + offsetX, y: 220 + offsetY },
        point: null,
        configData: null,
      },
    ],
    configs: [
      { id: startId + 5000, fromNodeId: startId, toNodeId: startId + 1, condition: 0 },
      { id: startId + 5001, fromNodeId: startId + 1, toNodeId: startId + 2, condition: 0 },
      { id: startId + 5002, fromNodeId: startId + 2, toNodeId: startId + 3, condition: 0 },
      { id: startId + 5003, fromNodeId: startId + 3, toNodeId: startId + 4, condition: 1 },
      { id: startId + 5004, fromNodeId: startId + 3, toNodeId: startId + 5, condition: 0 },
      { id: startId + 5005, fromNodeId: startId + 4, toNodeId: startId + 6, condition: 0 },
      { id: startId + 5006, fromNodeId: startId + 5, toNodeId: startId + 6, condition: 0 },
    ],
  };
};

const mockProcessDiagrams: Record<number, ProcessDiagram> = Object.fromEntries(
  processes.map((process) => [process.id, buildProcessDiagram(process.id)])
);
const workflowStepsByProcess: Record<number, any[]> = processes.reduce((acc, process) => {
  const existing = mockWorkflowSteps.filter((step) => Number(step.processId) === Number(process.id));
  if (existing.length > 0) {
    acc[process.id] = existing.map((item: any) => ({ ...item, stateCode: item.stateCode || "NEW" }));
  } else {
    acc[process.id] = [
      { id: ++nextWorkflowStepId, processId: process.id, stepName: "Tiếp nhận", stepNumber: 1, stateCode: "NEW", stateName: "Mới tiếp nhận" },
      { id: ++nextWorkflowStepId, processId: process.id, stepName: "Khám lâm sàng", stepNumber: 2, stateCode: "IN_PROGRESS", stateName: "Đang xử lý" },
      { id: ++nextWorkflowStepId, processId: process.id, stepName: "Kết luận", stepNumber: 3, stateCode: "DONE", stateName: "Hoàn thành" },
    ];
  }
  return acc;
}, {} as Record<number, any[]>);

let mockNextNodeId = 2000;
let mockNextConfigId = 8000;

const getProcessIdFromRequest = (request: Request) => {
  const url = new URL(request.url);
  const raw = url.searchParams.get("id") || url.searchParams.get("processId");
  const id = Number(raw);
  return Number.isFinite(id) && id > 0 ? id : 1;
};

const getProcessDiagram = (processId: number) => {
  if (!mockProcessDiagrams[processId]) {
    mockProcessDiagrams[processId] = { status: 0, nodes: [], configs: [] };
  }
  return mockProcessDiagrams[processId];
};

const normalizePath = (pathname: string) => pathname.toLowerCase();
const getWorkflowStepsByProcess = (processIdParam?: number) => {
  const processId = Number(processIdParam) > 0 ? Number(processIdParam) : 1;
  if (!workflowStepsByProcess[processId]) {
    workflowStepsByProcess[processId] = [];
  }
  return workflowStepsByProcess[processId];
};

const resolveList = (pathname: string, params: Record<string, any>) => {
  if (pathname.includes("businessprocess") && pathname.includes("/list")) return processes;
  if (pathname.includes("bpmtrigger")) return mockBpmTriggers;
  if (pathname.includes("variabledeclare")) return mockVariableDeclares;
  if (pathname.includes("variableinstance")) return mockVariableInstances;
  if (pathname.includes("servicelevel")) return mockServiceLevels;
  if (pathname.includes("processedobject")) return [...mockProcessedObjects, ...mockE2eProcessedObjects];
  if (pathname.includes("workorder")) return mockWorkOrders;
  if (pathname.includes("workflowstatus")) return mockWorkflowTasks;
  if (pathname.includes("businessruleitem")) {
    const ruleId = Number(params.businessRuleId) || 1;
    return mockBusinessRuleItems[ruleId] || [];
  }
  if (pathname.includes("businessrule")) return mockBusinessRules;
  if (pathname.includes("process-permission")) return processPermissions;
  if (pathname.includes("decisiontableinput")) {
    const ruleId = Number(params.businessRuleId) || 1;
    return mockDecisionInputs[ruleId] || [];
  }
  if (pathname.includes("decisiontableoutput")) {
    const ruleId = Number(params.businessRuleId) || 1;
    return mockDecisionOutputs[ruleId] || [];
  }
  if (pathname.includes("objectgroup")) return mockObjectGroups;
  if (pathname.includes("objectattribute")) return mockObjectAttributes;
  if (pathname.includes("formcategory") || pathname.includes("bpmformpopup") || pathname.includes("bpmform")) {
    return pathname.includes("bpmform") && !pathname.includes("bpmformpopup") ? mockBpmForms : mockFormCategories;
  }
  if (pathname.includes("artifactmetadata") || pathname.includes("bpmformartifact")) return mockArtifacts;
  if (pathname.includes("workflow/list") || pathname.includes("/step")) return getWorkflowStepsByProcess(Number(params.processId));
  if (pathname.includes("statemapping")) return stateMappings;
  if (pathname.includes("report") || pathname.includes("sla")) {
    return processes.map((p) => ({ id: p.id, name: p.name, total: 24, done: 18, pending: 6, avgTime: 3.4 }));
  }
  return [{ id: 1, name: "Mock BPM item", code: "BPM-MOCK", status: 1, createdTime: now }];
};

const getNodeIdFromParams = (params: Record<string, any>) => params.nodeId || params.id || "Task_1";

const buildNodeDetail = (params: Record<string, any>, processId: number) => {
  const nodeId = getNodeIdFromParams(params);
  return {
    id: nodeId,
    nodeId,
    processId,
    childProcessId: processId,
    formId: 1,
    bpmFormId: 1,
    name: "Khám lâm sàng",
    title: "Khám lâm sàng",
    typeNode: "bpmn:UserTask",
    assigneeType: "EMPLOYEE",
    employeeId: 1,
    employeeName: "Bùi Văn Chương",
    departmentId: 1,
    departmentName: "Khoa Da liễu",
    businessRuleId: 1,
    businessRuleName: "Luật phân loại mức ưu tiên ca",
    serviceCode: "AI_SKIN_ANALYSIS",
    config: "{}",
  };
};

const bpmApiRegex =
  /\/(bpmapi|application|cs|adminapi)\/.*(bpm|businessprocess|processedobject|workorder|workflow|sla|artifact|form|participant|objectgroup|objectattribute|businessrule|bpmtrigger|process-permission|decisiontable|formcategory|bpmformpopup|statemapping|variable|servicelevel|findbycriteria|state)/i;

export const bpmHandlers = [
  http.all(bpmApiRegex, async ({ request }) => {
    const info = getRequestInfo(request);
    const method = info.method;
    const pathname = normalizePath(info.pathname);
    const params = parseQueryParams(request);
    const processId = getProcessIdFromRequest(request);
    const processDiagram = getProcessDiagram(processId);
    const list = resolveList(pathname, params);

    if (pathname.includes("/businessprocess/detail") || pathname.includes("/businessprocess/get")) {
      const processInfo = processes.find((item) => item.id === processId) || processes[0];
      return HttpResponse.json(
        buildDetailResponse({
          ...processInfo,
          id: processId,
          status: processDiagram.status,
          config: processDiagramXml[processId] || defaultBpmnXml,
          nodes: processDiagram.nodes,
          configs: processDiagram.configs,
        })
      );
    }

    if (pathname.includes("/businessprocess/update/config") && method === "POST") {
      const body = (await request.json().catch(() => ({}))) as any;
      const targetProcessId = Number(body?.id || processId) || 1;
      processDiagramXml[targetProcessId] = body?.config || processDiagramXml[targetProcessId] || defaultBpmnXml;
      return HttpResponse.json(buildOkResponse({ id: targetProcessId, config: processDiagramXml[targetProcessId] }));
    }

    // Manage default process permissions (create/update/delete) for mock
    if (pathname.includes("/process-permission/update") && method === "POST") {
      const body = (await request.json().catch(() => ({}))) as any;
      const id = Number(body?.id) || 0;
      if (id > 0) {
        const foundIndex = processPermissions.findIndex((p) => Number(p.id) === id);
        if (foundIndex >= 0) {
          processPermissions[foundIndex] = { ...processPermissions[foundIndex], ...body };
        } else {
          processPermissions.push({ ...body, id });
        }
        return HttpResponse.json(buildOkResponse(processPermissions.find((p) => Number(p.id) === id)));
      }

      const nextId = processPermissions.reduce((max, p) => Math.max(max, Number(p.id || 0)), 0) + 1;
      const newItem = { id: nextId, name: body?.name || `Config ${nextId}`, uri: body?.uri || "", processCode: body?.processCode || "", processName: body?.processName || "" };
      processPermissions.push(newItem);
      return HttpResponse.json(buildOkResponse(newItem));
    }

    if (pathname.includes("/process-permission/delete") && method === "DELETE") {
      const id = Number(params.id) || 0;
      const before = processPermissions.length;
      processPermissions = processPermissions.filter((p) => Number(p.id) !== id);
      const after = processPermissions.length;
      return HttpResponse.json(buildOkResponse({ id, deleted: before !== after }));
    }

    if (pathname.includes("/bpmtrigger/activate")) {
      const triggerId = Number(params.id) || 1;
      const trigger = mockBpmTriggers.find((item) => Number(item.id) === triggerId);
      if (trigger) {
        trigger.status = 2;
        trigger.messageError = "";
      }
      return HttpResponse.json(buildOkResponse({ id: triggerId, activated: true, status: 2 }));
    }

    if (pathname.includes("/workflow/update") && method === "POST") {
      const body = (await request.json().catch(() => ({}))) as any;
      const processIdForStep = Number(body?.processId) > 0 ? Number(body.processId) : 1;
      const steps = getWorkflowStepsByProcess(processIdForStep);
      const state = stateMappings.find((item) => item.stateCode === (body?.stateCode || body?.status));
      const existingIndex = steps.findIndex((item) => Number(item.id) === Number(body?.id));
      const payload = {
        id: existingIndex >= 0 && body?.id ? Number(body.id) : ++nextWorkflowStepId,
        processId: processIdForStep,
        stepName: body?.stepName || "",
        stepNumber: Number(body?.stepNumber || body?.step || steps.length + 1),
        stateCode: body?.stateCode || body?.status || "",
        stateName: body?.stateName || state?.stateName || "",
      };

      if (existingIndex >= 0) {
        steps[existingIndex] = { ...steps[existingIndex], ...payload };
      } else {
        steps.push(payload);
        steps.sort((a, b) => Number(a.stepNumber) - Number(b.stepNumber));
      }
      return HttpResponse.json(buildOkResponse(payload));
    }

    if (pathname.includes("/workflow/delete") && method === "DELETE") {
      const id = Number(params.id);
      Object.keys(workflowStepsByProcess).forEach((key) => {
        workflowStepsByProcess[Number(key)] = workflowStepsByProcess[Number(key)].filter((step) => Number(step.id) !== id);
      });
      return HttpResponse.json(buildOkResponse({ id, deleted: true }));
    }

    if (pathname.includes("/statemapping/update") && method === "POST") {
      const body = (await request.json().catch(() => ({}))) as any;
      const existingIndex = stateMappings.findIndex((item) => Number(item.id) === Number(body?.id));
      const payload = {
        id: existingIndex >= 0 && body?.id ? Number(body.id) : ++nextStateMappingId,
        stateCode: body?.stateCode ?? body?.code ?? `STATE_${Date.now()}`,
        stateName: body?.stateName ?? body?.name ?? "Trạng thái mới",
        color: body?.color ?? "#64748B",
      };

      if (existingIndex >= 0) {
        stateMappings[existingIndex] = payload;
      } else {
        stateMappings.push(payload);
      }
      return HttpResponse.json(buildOkResponse(payload));
    }

    if (pathname.includes("/statemapping/list")) {
      let result = [...stateMappings];
      if (params.stateCode !== undefined && params.stateCode !== "") {
        result = result.filter((item) => String(item.stateCode) === String(params.stateCode));
      }
      if (params.keyword) {
        const q = String(params.keyword).toLowerCase();
        result = result.filter(
          (item) => item.stateName.toLowerCase().includes(q) || item.stateCode.toLowerCase().includes(q)
        );
      }
      return HttpResponse.json(buildListResponse(result, params));
    }

    if (pathname.includes("/statemapping/delete") && method === "DELETE") {
      const id = Number(params.id);
      const foundIndex = stateMappings.findIndex((item) => Number(item.id) === id);
      if (foundIndex >= 0) {
        stateMappings.splice(foundIndex, 1);
      }
      return HttpResponse.json(buildOkResponse({ id, deleted: true }));
    }

    if (pathname.includes("/bpmconfignode/update/name") && method === "POST") {
      const body = (await request.json().catch(() => ({}))) as any;
      return HttpResponse.json(buildOkResponse({ id: body?.nodeId || `Node_${Date.now()}`, name: body?.name || "Node mock" }));
    }

    if (pathname.includes("/bpmconfignode/update") && method === "POST") {
      const body = (await request.json().catch(() => ({}))) as any;
      return HttpResponse.json(
        buildOkResponse({
          id: body?.nodeId || `Node_${Date.now()}`,
          nodeId: body?.nodeId || `Node_${Date.now()}`,
          processId: Number(body?.processId || processId),
          childProcessId: Number(body?.processId || processId),
          name: body?.name || "",
          typeNode: body?.typeNode || "bpmn:Task",
        })
      );
    }

    if (pathname.includes("/bpmconfignode/delete") && method === "DELETE") {
      return HttpResponse.json(buildOkResponse({ deleted: true }));
    }

    if (pathname.includes("/bpmconfiglinknode/update") && method === "POST") {
      const body = (await request.json().catch(() => ({}))) as any;
      return HttpResponse.json(
        buildOkResponse({
          id: body?.linkId || `Flow_${Date.now()}`,
          linkId: body?.linkId || `Flow_${Date.now()}`,
          fromNodeId: body?.fromNodeId || "",
          toNodeId: body?.toNodeId || "",
          processId: Number(body?.processId || processId),
        })
      );
    }

    if (pathname.includes("/bpmconfiglinknode/delete") && method === "DELETE") {
      return HttpResponse.json(buildOkResponse({ deleted: true }));
    }

    if (pathname.includes("/businessprocess/confignode/update") && method === "POST") {
      const body = (await request.json().catch(() => ({}))) as any;
      const targetProcessId = Number(body?.processId || processId) || 1;
      const targetDiagram = getProcessDiagram(targetProcessId);
      const existingNodeIndex = targetDiagram.nodes.findIndex((node) => Number(node.id) === Number(body?.id));
      const normalizedNode = {
        id: existingNodeIndex >= 0 ? Number(body.id) : ++mockNextNodeId,
        processId: targetProcessId,
        typeNode: body?.typeNode || "default",
        name: body?.name || "Node mới",
        configData: body?.configData ?? null,
        position: body?.position || { x: 100, y: 100 },
        code: body?.code || "do",
        point: body?.point ?? null,
      };

      if (existingNodeIndex >= 0) {
        targetDiagram.nodes[existingNodeIndex] = normalizedNode;
      } else {
        targetDiagram.nodes.push(normalizedNode);
      }

      return HttpResponse.json(buildOkResponse(normalizedNode));
    }

    if (pathname.includes("/businessprocess/node/delete") && method === "DELETE") {
      const url = new URL(request.url);
      const nodeId = Number(url.searchParams.get("nodeId"));
      const targetDiagram = getProcessDiagram(processId);
      targetDiagram.nodes = targetDiagram.nodes.filter((node) => Number(node.id) !== nodeId);
      targetDiagram.configs = targetDiagram.configs.filter(
        (item) => Number(item.fromNodeId) !== nodeId && Number(item.toNodeId) !== nodeId
      );
      return HttpResponse.json(buildOkResponse({ nodeId }));
    }

    if (pathname.includes("/businessprocess/updateconfig") && method === "POST") {
      const body = (await request.json().catch(() => ({}))) as any;
      const targetProcessId = Number(body?.processId || processId) || 1;
      const targetDiagram = getProcessDiagram(targetProcessId);
      const nextConfigs = Array.isArray(body?.configs) ? body.configs : [];
      targetDiagram.configs = nextConfigs.map((item: any) => ({
        id: item?.id ? Number(item.id) : ++mockNextConfigId,
        fromNodeId: Number(item?.fromNodeId),
        toNodeId: Number(item?.toNodeId),
        condition: Number(item?.condition ?? 0),
      }));
      return HttpResponse.json(buildOkResponse({ processId: targetProcessId, configs: targetDiagram.configs }));
    }

    if (pathname.includes("/bpmconfignode/list")) {
      const targetProcessId = Number(params.processId || params.childProcessId || processId) || 1;
      const nodes = getProcessDiagram(targetProcessId).nodes.map((node) => ({
        ...node,
        nodeId: node.id,
        label: node.name,
        title: node.name,
      }));
      return HttpResponse.json(buildListResponse(nodes, params));
    }

    if (pathname.includes("/bpmconfiglinknode/list")) {
      const targetProcessId = Number(params.processId || params.childProcessId || processId) || 1;
      const links = getProcessDiagram(targetProcessId).configs.map((config) => ({
        ...config,
        linkId: config.id,
        sourceRef: config.fromNodeId,
        targetRef: config.toNodeId,
        name: config.condition ? "Đạt điều kiện" : "Mặc định",
      }));
      return HttpResponse.json(buildListResponse(links, params));
    }

    if (pathname.includes("/bpmconfiglinknode/get")) {
      return HttpResponse.json(
        buildDetailResponse({
          id: params.linkId || "Flow_1",
          linkId: params.linkId || "Flow_1",
          fromNodeId: params.fromNodeId || "Task_1",
          toNodeId: params.toNodeId || "Task_2",
          processId,
          condition: "priority == 'high'",
          name: "Đủ điều kiện",
        })
      );
    }

    if (pathname.includes("/bpmconfignode/get")) {
      return HttpResponse.json(
        buildDetailResponse(buildNodeDetail(params, processId))
      );
    }

    if (
      pathname.includes("/usertask/get") ||
      pathname.includes("/servicetask/get") ||
      pathname.includes("/scripttask/get") ||
      pathname.includes("/manualtask/get") ||
      pathname.includes("/sendtask/get") ||
      pathname.includes("/receivetask/get") ||
      pathname.includes("/callactivity/get") ||
      pathname.includes("/parallelgateway/get") ||
      pathname.includes("/exclusivegateway/get") ||
      pathname.includes("/inclusivegateway/get") ||
      pathname.includes("/complexgateway/get") ||
      pathname.includes("/subprocess/get") ||
      pathname.includes("/timertask/get") ||
      pathname.includes("/starttask/get") ||
      pathname.includes("/message") ||
      pathname.includes("/signal") ||
      pathname.includes("/error") ||
      pathname.includes("/compensation") ||
      pathname.includes("/conditional")
    ) {
      return HttpResponse.json(buildDetailResponse(buildNodeDetail(params, processId)));
    }

    if (pathname.includes("/bpmform/get")) {
      return HttpResponse.json(buildDetailResponse({ ...mockBpmForms[0], formId: 1, formSchema: mockBpmForms[0].schema }));
    }

    if (pathname.includes("/bpmformdata/getbynodeid")) {
      return HttpResponse.json(
        buildDetailResponse({
          nodeId: params.nodeId || "Task_1",
          potId: params.potId || "HS-0001",
          data: {
            patientName: "Bùi Văn Chương",
            diagnosis: "Viêm da cơ địa",
            priority: "high",
            aiScore: 82,
          },
        })
      );
    }

    if (pathname.includes("/artifactdata") || pathname.includes("/dataform") || pathname.includes("/bpmarkifactdata")) {
      return HttpResponse.json(
        buildDetailResponse({
          customerName: "Bùi Văn Chương",
          phone: "0369062042",
          diagnosis: "Viêm da cơ địa - mức độ trung bình",
          priority: "high",
        })
      );
    }

    if (pathname.includes("/findbycriteria")) {
      let result = [...mockProcessErrorLogs];
      if (params.processId) {
        result = result.filter((item) => Number(item.processId) === Number(params.processId));
      }
      if (params.nodeId) {
        result = result.filter((item) => String(item.nodeId) === String(params.nodeId));
      }
      if (params.potId) {
        result = result.filter((item) => String(item.potId) === String(params.potId));
      }
      return HttpResponse.json(buildListResponse(result, params));
    }

    const isList =
      pathname.includes("/list") ||
      pathname.includes("/page") ||
      pathname.includes("/search") ||
      pathname.includes("/filter") ||
      pathname.includes("/select");
    const isDetail = pathname.includes("/get") || pathname.includes("/detail") || pathname.includes("/info");

    if (method === "GET" || method === "POST") {
      if (isList) return HttpResponse.json(buildListResponse(list, params));
      if (isDetail) {
        const id = Number(params.id) || 1;
        const item = list.find((entry: any) => Number(entry.id) === id) || list[0] || {};
        return HttpResponse.json(buildDetailResponse(item));
      }
    }

    return HttpResponse.json(buildOkResponse({ id: 999, ...(list[0] || {}) }));
  }),
];
