const now = "2026-05-20T08:30:00Z";
const day = (offset: number) => `2026-05-${String(10 + offset).padStart(2, "0")}T10:00:00Z`;

export const mockEmployees = [
  { id: 1, name: "Bùi Văn Chương" },
  { id: 2, name: "Đào văn dương" },
];

export const mockPatients = [
  "Bùi Văn Chương",
  "Đào văn dương",
  "Nguyễn Minh Anh",
  "Trần Thu Hà",
  "Lê Hoàng Nam",
  "Phạm Gia Hân",
  "Vũ Đức Long",
  "Hoàng Kim Chi",
  "Đặng Quốc Bảo",
  "Mai Thanh Trúc",
  "Ngô Bảo Ngọc",
  "Đỗ Nhật Minh",
];

export const mockProcesses = [
  { id: 1, code: "QT-KCB-001", name: "Quy trình tiếp nhận - khám ngoại trú", employeeId: 1, employeeName: "Bùi Văn Chương", status: 1, opType: "EX", createdTime: now },
  { id: 2, code: "QT-KCB-002", name: "Quy trình điều trị nội trú", employeeId: 2, employeeName: "Đào văn dương", status: 1, opType: "EX", createdTime: now },
  { id: 3, code: "QT-KCB-003", name: "Quy trình xét nghiệm & chẩn đoán", employeeId: 1, employeeName: "Bùi Văn Chương", status: 1, opType: "EX", createdTime: now },
  { id: 4, code: "QT-KCB-004", name: "Quy trình phẫu thuật thẩm mỹ", employeeId: 2, employeeName: "Đào văn dương", status: 0, opType: "EX", createdTime: now },
  { id: 5, code: "QT-KCB-005", name: "Quy trình chăm sóc sau điều trị", employeeId: 1, employeeName: "Bùi Văn Chương", status: 1, opType: "EX", createdTime: now },
  { id: 6, code: "QT-KCB-006", name: "Quy trình phân tích hình ảnh AI", employeeId: 2, employeeName: "Đào văn dương", status: 1, opType: "EX", createdTime: now },
  { id: 7, code: "QT-KCB-007", name: "Quy trình xuất viện & tái khám", employeeId: 1, employeeName: "Bùi Văn Chương", status: 1, opType: "EX", createdTime: now },
  { id: 8, code: "QT-KCB-008", name: "Quy trình cấp cứu nhanh", employeeId: 2, employeeName: "Đào văn dương", status: 0, opType: "EX", createdTime: now },
  { id: 9, code: "QT-CSK-001", name: "Quy trình chăm sóc sau khám (Demo E2E)", employeeId: 1, employeeName: "Bùi Văn Chương", status: 1, opType: "EX", createdTime: now },
];

/** BPMN XML cho quy trình chăm sóc sau khám - 4 bước chính (Demo E2E) */
export const e2eBpmnXml = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
  xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
  id="Definitions_E2E" targetNamespace="http://bpmn.io/schema/bpmn">
  <process id="Process_E2E" isExecutable="true">
    <startEvent id="SE_TiepNhan" name="Tiếp nhận bệnh nhân">
      <outgoing>Flow_01</outgoing>
    </startEvent>
    <userTask id="UT_KhamChanDoan" name="Khám &amp; chẩn đoán">
      <incoming>Flow_01</incoming>
      <outgoing>Flow_02</outgoing>
    </userTask>
    <exclusiveGateway id="GW_KiemTra" name="Cần điều trị?">
      <incoming>Flow_02</incoming>
      <outgoing>Flow_03</outgoing>
      <outgoing>Flow_04</outgoing>
    </exclusiveGateway>
    <userTask id="UT_DieuTri" name="Chăm sóc &amp; điều trị">
      <incoming>Flow_03</incoming>
      <outgoing>Flow_05</outgoing>
    </userTask>
    <userTask id="UT_TaiKham" name="Lên lịch tái khám">
      <incoming>Flow_04</incoming>
      <incoming>Flow_05</incoming>
      <outgoing>Flow_06</outgoing>
    </userTask>
    <endEvent id="EE_HoanTat" name="Hoàn tất chăm sóc">
      <incoming>Flow_06</incoming>
    </endEvent>
    <sequenceFlow id="Flow_01" sourceRef="SE_TiepNhan" targetRef="UT_KhamChanDoan" />
    <sequenceFlow id="Flow_02" sourceRef="UT_KhamChanDoan" targetRef="GW_KiemTra" />
    <sequenceFlow id="Flow_03" sourceRef="GW_KiemTra" targetRef="UT_DieuTri" name="Có" />
    <sequenceFlow id="Flow_04" sourceRef="GW_KiemTra" targetRef="UT_TaiKham" name="Không" />
    <sequenceFlow id="Flow_05" sourceRef="UT_DieuTri" targetRef="UT_TaiKham" />
    <sequenceFlow id="Flow_06" sourceRef="UT_TaiKham" targetRef="EE_HoanTat" />
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_E2E">
    <bpmndi:BPMNPlane id="BPMNPlane_E2E" bpmnElement="Process_E2E">
      <bpmndi:BPMNShape id="SE_TiepNhan_di" bpmnElement="SE_TiepNhan"><dc:Bounds x="152" y="242" width="36" height="36" /></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="UT_KhamChanDoan_di" bpmnElement="UT_KhamChanDoan"><dc:Bounds x="260" y="220" width="160" height="80" /></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="GW_KiemTra_di" bpmnElement="GW_KiemTra" isMarkerVisible="true"><dc:Bounds x="495" y="235" width="50" height="50" /></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="UT_DieuTri_di" bpmnElement="UT_DieuTri"><dc:Bounds x="620" y="120" width="160" height="80" /></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="UT_TaiKham_di" bpmnElement="UT_TaiKham"><dc:Bounds x="860" y="220" width="160" height="80" /></bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="EE_HoanTat_di" bpmnElement="EE_HoanTat"><dc:Bounds x="1092" y="242" width="36" height="36" /></bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_01_di" bpmnElement="Flow_01"><di:waypoint x="188" y="260" /><di:waypoint x="260" y="260" /></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_02_di" bpmnElement="Flow_02"><di:waypoint x="420" y="260" /><di:waypoint x="495" y="260" /></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_03_di" bpmnElement="Flow_03"><di:waypoint x="520" y="235" /><di:waypoint x="520" y="160" /><di:waypoint x="620" y="160" /></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_04_di" bpmnElement="Flow_04"><di:waypoint x="545" y="260" /><di:waypoint x="860" y="260" /></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_05_di" bpmnElement="Flow_05"><di:waypoint x="780" y="160" /><di:waypoint x="940" y="160" /><di:waypoint x="940" y="220" /></bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_06_di" bpmnElement="Flow_06"><di:waypoint x="1020" y="260" /><di:waypoint x="1092" y="260" /></bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>`;

/** Hồ sơ bệnh nhân gắn với quy trình E2E Demo (processId = 9) */
export const mockE2eProcessedObjects = [
  { id: 901, name: "Hồ sơ Nguyễn Minh Anh - Nám sâu vùng má", code: "HS-E2E-001", potId: "HS-E2E-001", customerId: 1, customerName: "Nguyễn Minh Anh", patientName: "Nguyễn Minh Anh", mainDiagnosis: "Nám sâu vùng má", priority: "high", employeeId: 1, employeeName: "Bùi Văn Chương", status: 1, processId: 9, processName: "Quy trình chăm sóc sau khám (Demo E2E)", createdTime: "2026-05-20T10:00:00Z", startTime: "2026-05-20T10:00:00Z", endTime: "", sheetId: 9 },
  { id: 902, name: "Hồ sơ Trần Thu Hà - Mụn viêm độ II", code: "HS-E2E-002", potId: "HS-E2E-002", customerId: 2, customerName: "Trần Thu Hà", patientName: "Trần Thu Hà", mainDiagnosis: "Mụn viêm độ II", priority: "normal", employeeId: 2, employeeName: "Đào văn dương", status: 2, processId: 9, processName: "Quy trình chăm sóc sau khám (Demo E2E)", createdTime: "2026-05-18T09:00:00Z", startTime: "2026-05-18T09:00:00Z", endTime: "2026-05-25T11:00:00Z", sheetId: 9 },
  { id: 903, name: "Hồ sơ Lê Hoàng Nam - Sẹo lõm sau mụn", code: "HS-E2E-003", potId: "HS-E2E-003", customerId: 3, customerName: "Lê Hoàng Nam", patientName: "Lê Hoàng Nam", mainDiagnosis: "Sẹo lõm sau mụn", priority: "urgent", employeeId: 1, employeeName: "Bùi Văn Chương", status: 0, processId: 9, processName: "Quy trình chăm sóc sau khám (Demo E2E)", createdTime: "2026-05-22T08:00:00Z", startTime: "2026-05-22T08:00:00Z", endTime: "", sheetId: 9 },
];

const diagnoses = [
  "Viêm da cơ địa",
  "Mụn viêm độ II",
  "Nám sâu vùng má",
  "Dị ứng thuốc",
  "Bỏng độ I",
  "Thâm nám sau điều trị",
  "Seo lõm sau mụn",
  "Viêm nang lông",
];

export const mockProcessedObjects = mockPatients.map((patient, index) => ({
  id: index + 1,
  name: `Hồ sơ ${patient} - ${diagnoses[index % diagnoses.length]}`,
  code: `HS-${String(index + 1).padStart(4, "0")}`,
  potId: `HS-${String(index + 1).padStart(4, "0")}`,
  customerName: patient,
  patientName: patient,
  mainDiagnosis: diagnoses[index % diagnoses.length],
  priority: index % 4 === 0 ? "urgent" : index % 3 === 0 ? "high" : "normal",
  employeeId: mockEmployees[index % mockEmployees.length].id,
  employeeName: mockEmployees[index % mockEmployees.length].name,
  status: index % 5,
  processId: (index % mockProcesses.length) + 1,
  processName: mockProcesses[index % mockProcesses.length].name,
  createdTime: day(index % 8),
  startTime: day(index % 8),
  endTime: index % 3 === 2 ? day(index % 8 + 3) : "",
  sheetId: 1,
}));

const workTitles = [
  "Tiếp nhận & đo sinh hiệu",
  "Khám lâm sàng da liễu",
  "Chỉ định xét nghiệm máu",
  "Phân tích ảnh AI vùng mặt",
  "Tư vấn phác đồ điều trị",
  "Thực hiện laser fractional",
  "Theo dõi sau liệu trình 7 ngày",
  "Tái khám định kỳ 2 tuần",
  "Cập nhật hồ sơ điều dưỡng",
  "Phê duyệt xuất viện",
];

const makeWorkOrder = (id: number, overrides: Record<string, any> = {}) => {
  const process = mockProcesses[(id - 1) % mockProcesses.length];
  const employee = mockEmployees[(id - 1) % mockEmployees.length];
  const patient = mockPatients[(id - 1) % mockPatients.length];
  const status = overrides.status ?? (id % 6 === 0 ? 2 : id % 5 === 0 ? 4 : id % 4 === 0 ? 1 : 0);
  const priorityLevel = overrides.priorityLevel ?? (id % 7 === 0 ? 4 : id % 3 === 0 ? 3 : id % 2);

  return {
    id,
    name: `${workTitles[(id - 1) % workTitles.length]} - ${patient}`,
    content: `Nhiệm vụ xử lý ca bệnh #${id} theo ${process.name}`,
    startTime: day((id - 1) % 10),
    endTime: status === 2 ? day((id - 1) % 10 + 2) : "",
    workLoad: 4 + (id % 4),
    workLoadUnit: "giờ",
    wteId: 1,
    docLink: "",
    projectId: process.id,
    projectName: process.name,
    opportunityId: 0,
    managerId: 1,
    managerName: "Bùi Văn Chương",
    employeeId: employee.id,
    employeeName: employee.name,
    participants: "",
    customers: patient,
    status,
    percent: status === 2 ? 100 : 15 + (id % 70),
    priorityLevel,
    nodeName: workTitles[(id - 1) % workTitles.length],
    iteration: 1,
    processId: process.id,
    potId: `HS-${String((id % 12) + 1).padStart(4, "0")}`,
    ...overrides,
  };
};

export const mockWorkOrders = Array.from({ length: 36 }, (_, i) => makeWorkOrder(i + 1));

export const mockBpmTriggers = Array.from({ length: 24 }, (_, i) => {
  const process = mockProcesses[i % mockProcesses.length];
  const status = i % 6;
  return {
    id: i + 1,
    processId: process.id,
    processName: process.name,
    fromNodeId: 1000 + (i % 4),
    toNodeId: 1001 + (i % 4),
    potId: `HS-${String((i % 12) + 1).padStart(4, "0")}`,
    createdTime: day(i % 10),
    status,
    messageError: status === 5 ? "Lỗi kết nối dịch vụ AI phân tích ảnh" : "",
  };
});

export const mockWorkflowTasks = Array.from({ length: 18 }, (_, i) => {
  const process = mockProcesses[i % mockProcesses.length];
  const patient = mockPatients[i % mockPatients.length];
  return {
    id: 101 + i,
    potId: `HS-${String((i % 12) + 1).padStart(4, "0")}`,
    nodeId: 11 + (i % 5),
    nodeName: workTitles[i % workTitles.length],
    processId: process.id,
    processName: process.name,
    customerName: patient,
    employeeName: mockEmployees[i % mockEmployees.length].name,
    departmentName: "Khoa Da liễu",
    projectName: diagnoses[i % diagnoses.length],
    bidPackpage: `Bước ${(i % 4) + 1}`,
    status: i % 3,
    receivedTime: day(i % 8),
    planResponseDay: 0,
    planResponseHour: 2 + (i % 4),
    planResponseMinute: 0,
    planExecutionDay: 1,
    planExecutionHour: 0,
    planExecutionMinute: 0,
  };
});

export const mockProcessErrorLogs = Array.from({ length: 12 }, (_, i) => {
  const process = mockProcesses[i % mockProcesses.length];
  const patient = mockPatients[i % mockPatients.length];
  return {
    id: i + 1,
    processId: process.id,
    processName: process.name,
    nodeId: 1000 + ((i % 5) + 1),
    nodeName: workTitles[i % workTitles.length],
    potId: `HS-${String((i % 12) + 1).padStart(4, "0")}`,
    patientName: patient,
    errorCode: i % 2 === 0 ? "AI_TIMEOUT" : "RULE_VALIDATION_FAILED",
    message: i % 2 === 0 ? "Dịch vụ AI phân tích ảnh phản hồi quá thời gian" : "Thiếu dữ liệu đầu vào cho luật xử lý y khoa",
    createdTime: day(i % 10),
    stackTrace: "Mock stack: bpm-engine -> node-executor -> clinical-rule-adapter",
  };
});

export const mockVariableDeclares = [
  { id: 1, processId: 1, name: "Tên bệnh nhân", code: "patientName", dataType: "String", defaultValue: "Bùi Văn Chương" },
  { id: 2, processId: 1, name: "Chẩn đoán", code: "diagnosis", dataType: "String", defaultValue: "Viêm da cơ địa" },
  { id: 3, processId: 1, name: "Mức ưu tiên", code: "priority", dataType: "String", defaultValue: "high" },
  { id: 4, processId: 2, name: "Số ngày điều trị", code: "treatmentDays", dataType: "Number", defaultValue: 7 },
  { id: 5, processId: 3, name: "Có sốt", code: "hasFever", dataType: "Boolean", defaultValue: false },
  { id: 6, processId: 6, name: "Điểm AI", code: "aiScore", dataType: "Number", defaultValue: 82 },
];

export const mockVariableInstances = mockVariableDeclares.map((item, index) => ({
  ...item,
  id: index + 101,
  variableDeclareId: item.id,
  value: item.defaultValue,
  potId: `HS-${String((index % 12) + 1).padStart(4, "0")}`,
}));

export const mockServiceLevels = [
  { id: 1, processId: 1, nodeId: 1002, nodeName: "Khám lâm sàng", planResponseHour: 2, planExecutionHour: 8, warningPercent: 80 },
  { id: 2, processId: 1, nodeId: 1003, nodeName: "Phân tích AI", planResponseHour: 1, planExecutionHour: 2, warningPercent: 75 },
  { id: 3, processId: 2, nodeId: 2002, nodeName: "Thực hiện phác đồ", planResponseHour: 4, planExecutionHour: 24, warningPercent: 70 },
];

export const mockBusinessRules = [
  { id: 1, name: "Luật phân loại mức ưu tiên ca", code: "RULE-PRIORITY", linkedCount: 2 },
  { id: 2, name: "Luật chỉ định xét nghiệm bổ sung", code: "RULE-LAB", linkedCount: 1 },
  { id: 3, name: "Luật chuyển chuyên khoa", code: "RULE-REFERRAL", linkedCount: 0 },
  { id: 4, name: "Luật cảnh báo dị ứng thuốc", code: "RULE-ALLERGY", linkedCount: 3 },
  { id: 5, name: "Luật tái khám định kỳ", code: "RULE-FOLLOWUP", linkedCount: 1 },
  { id: 6, name: "Luật phê duyệt phác đồ điều trị", code: "RULE-APPROVE", linkedCount: 2 },
];

export const mockDecisionInputs: Record<number, any[]> = {
  1: [
    { id: 1, businessRuleId: 1, code: "age", name: "Tuổi bệnh nhân", dataType: "Number", position: 1 },
    { id: 2, businessRuleId: 1, code: "severity", name: "Mức độ nặng", dataType: "String", position: 2 },
  ],
  2: [
    { id: 3, businessRuleId: 2, code: "symptomDays", name: "Số ngày có triệu chứng", dataType: "Number", position: 1 },
    { id: 4, businessRuleId: 2, code: "hasFever", name: "Có sốt", dataType: "Boolean", position: 2 },
  ],
  4: [
    { id: 5, businessRuleId: 4, code: "allergen", name: "Dị nguyên", dataType: "String", position: 1 },
  ],
};

export const mockDecisionOutputs: Record<number, any[]> = {
  1: [{ id: 1, businessRuleId: 1, code: "priorityLevel", name: "Mức ưu tiên", dataType: "Number", position: 1 }],
  2: [{ id: 2, businessRuleId: 2, code: "labPanel", name: "Gói xét nghiệm", dataType: "String", position: 1 }],
  4: [{ id: 3, businessRuleId: 4, code: "blockDrug", name: "Chặn thuốc", dataType: "Boolean", position: 1 }],
};

export const mockBusinessRuleItems: Record<number, any[]> = {
  1: [
    { id: 1, businessRuleId: 1, inputs: JSON.stringify({ age: 65, severity: "cao" }), outputs: JSON.stringify({ priorityLevel: 4 }) },
    { id: 2, businessRuleId: 1, inputs: JSON.stringify({ age: 30, severity: "thấp" }), outputs: JSON.stringify({ priorityLevel: 2 }) },
    { id: 3, businessRuleId: 1, inputs: JSON.stringify({ age: 45, severity: "trung bình" }), outputs: JSON.stringify({ priorityLevel: 3 }) },
  ],
  2: [
    { id: 4, businessRuleId: 2, inputs: JSON.stringify({ symptomDays: 7, hasFever: true }), outputs: JSON.stringify({ labPanel: "CBC + CRP" }) },
    { id: 5, businessRuleId: 2, inputs: JSON.stringify({ symptomDays: 2, hasFever: false }), outputs: JSON.stringify({ labPanel: "CBC" }) },
  ],
  4: [
    { id: 6, businessRuleId: 4, inputs: JSON.stringify({ allergen: "penicillin" }), outputs: JSON.stringify({ blockDrug: true }) },
  ],
};

export const mockProcessPermissions = [
  { id: 1, name: "Mặc định tiếp nhận ngoại trú", uri: "/treatmentHistory/", processCode: "QT-KCB-001", processName: "Quy trình tiếp nhận - khám ngoại trú" },
  { id: 2, name: "Mặc định điều trị nội trú", uri: "/ticket/", processCode: "QT-KCB-002", processName: "Quy trình điều trị nội trú" },
  { id: 3, name: "Mặc định tái khám", uri: "/treatmentHistory/", processCode: "QT-KCB-007", processName: "Quy trình xuất viện & tái khám" },
  { id: 4, name: "Mặc định bảo hành điều trị", uri: "/warranty/", processCode: "QT-KCB-005", processName: "Quy trình chăm sóc sau điều trị" },
  { id: 5, name: "Mặc định hỗ trợ sau khám", uri: "/ticket/", processCode: "QT-KCB-005", processName: "Quy trình chăm sóc sau điều trị" },
  { id: 6, name: "Mặc định xử lý AI", uri: "/treatmentHistory/", processCode: "QT-KCB-006", processName: "Quy trình phân tích hình ảnh AI" },
];

export const mockObjectGroups = [
  { id: 1, name: "Hồ sơ bệnh nhân ngoại trú", code: "PATIENT_OUTPATIENT", status: 1, description: "Đối tượng hồ sơ khám ngoại trú" },
  { id: 2, name: "Hồ sơ điều trị nội trú", code: "PATIENT_INPATIENT", status: 1, description: "Đối tượng hồ sơ nội trú" },
  { id: 3, name: "Hồ sơ phẫu thuật", code: "PATIENT_SURGERY", status: 1, description: "Đối tượng hồ sơ phẫu thuật" },
  { id: 4, name: "Hồ sơ xét nghiệm", code: "PATIENT_LAB", status: 1, description: "Đối tượng chỉ định xét nghiệm" },
];

export const mockObjectAttributes = [
  { id: 1, name: "Mức độ ưu tiên", fieldName: "priority", dataType: "select", status: 1, groupId: 1 },
  { id: 2, name: "Nhóm máu", fieldName: "bloodType", dataType: "select", status: 1, groupId: 1 },
  { id: 3, name: "Tiền sử dị ứng", fieldName: "allergyHistory", dataType: "text", status: 1, groupId: 1 },
  { id: 4, name: "Chẩn đoán chính", fieldName: "mainDiagnosis", dataType: "text", status: 1, groupId: 2 },
  { id: 5, name: "Ngày nhập viện", fieldName: "admissionDate", dataType: "date", status: 1, groupId: 2 },
];

export const mockFormCategories = [
  { id: 1, name: "Phiếu tiếp nhận bệnh nhân", code: "FORM-RECEPTION", status: 1, groupId: 1, groupName: "Hồ sơ bệnh nhân ngoại trú" },
  { id: 2, name: "Phiếu khám da liễu", code: "FORM-DERMA-EXAM", status: 1, groupId: 1, groupName: "Hồ sơ bệnh nhân ngoại trú" },
  { id: 3, name: "Phiếu chỉ định xét nghiệm", code: "FORM-LAB-ORDER", status: 1, groupId: 4, groupName: "Hồ sơ xét nghiệm" },
  { id: 4, name: "Phiếu phẫu thuật thẩm mỹ", code: "FORM-SURGERY", status: 1, groupId: 3, groupName: "Hồ sơ phẫu thuật" },
  { id: 5, name: "Phiếu tái khám", code: "FORM-FOLLOWUP", status: 1, groupId: 1, groupName: "Hồ sơ bệnh nhân ngoại trú" },
  { id: 6, name: "Phiếu chăm sóc sau điều trị", code: "FORM-AFTERCARE", status: 1, groupId: 2, groupName: "Hồ sơ điều trị nội trú" },
];

export const mockArtifacts = [
  { id: 1, name: "Bảng thông tin bệnh nhân", code: "ART-PATIENT-INFO", status: 1, type: "grid" },
  { id: 2, name: "Lưới chỉ định thuốc", code: "ART-PRESCRIPTION", status: 1, type: "grid" },
  { id: 3, name: "Khu vực upload ảnh da", code: "ART-SKIN-PHOTO", status: 1, type: "upload" },
  { id: 4, name: "Bình luận điều trường", code: "ART-COMMENT", status: 1, type: "comment" },
  { id: 5, name: "Chữ ký bác sĩ", code: "ART-SIGNATURE", status: 1, type: "signature" },
];

export const mockBpmForms = mockFormCategories.map((form) => ({
  ...form,
  schema: JSON.stringify({
    type: "default",
    components: [
      { key: "patientName", label: "Họ tên bệnh nhân", type: "textfield" },
      { key: "diagnosis", label: "Chẩn đoán", type: "textarea" },
    ],
  }),
}));

export const mockWorkflowSteps = mockProcesses.flatMap((process, pIndex) =>
  ["Tiếp nhận", "Khám lâm sàng", "Cận lâm sàng", "Kết luận"].map((step, sIndex) => ({
    id: pIndex * 10 + sIndex + 1,
    processId: process.id,
    stepName: step,
    stepNumber: sIndex + 1,
    name: step,
  }))
);

export { now };
