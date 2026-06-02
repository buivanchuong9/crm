# BPM API — Báo cáo tích hợp & Gap Analysis

> Ngày tạo: 2026-06-02  
> Mục đích: Liệt kê tất cả endpoint trong BPM API doc đã được map vào frontend, và những gì còn thiếu cần BE hỗ trợ thêm.

---

## 1. Đã map xong (urls.ts → bpmapi)

### 1.1 Ca bệnh chờ xử lý — `urlsApi.userTask.*`

| Key trong urls.ts | Endpoint BPM API | Trước đây |
|---|---|---|
| `userTask.list` | `GET /bpmapi/userTask/list` | `/bpmapi/workOrder/list` |
| `userTask.detail` | `GET /bpmapi/userTask/get?id=` | `/bpmapi/workOrder/get` |
| `userTask.update` | `POST /bpmapi/userTask/update` | `/adminapi/workOrder/update` |
| `userTask.updateStatus` | `POST /bpmapi/userTask/updateStatus` | `/adminapi/workOrder/update/status` |
| `userTask.updateRating` | `POST /bpmapi/userTask/updateRating` | `/adminapi/workOrder/update/review` |
| `userTask.addWorkExchange` | `POST /bpmapi/userTask/addWorkExchange` | `/saleapi/workExchange/update` |
| `userTask.updateParticipant` | `POST /bpmapi/userTask/updateParticipant` | `/adminapi/workOrder/update/participant` |
| `userTask.updateCustomer` | `POST /bpmapi/userTask/updateCustomer` | `/adminapi/workOrder/update/customer` |
| `userTask.updatePriorityLevel` | `POST /bpmapi/userTask/updatePriorityLevel` | `/adminapi/workOrder/update/priorityLevel` |
| `userTask.updatePause` | `POST /bpmapi/userTask/updatePause` | `/adminapi/workOrder/update/pause` |

### 1.2 BPM Designer — `urlsApi.businessProcess.*`

| Key trong urls.ts | Endpoint BPM API |
|---|---|
| `businessProcess.list` | `GET /bpmapi/businessProcess/list` |
| `businessProcess.update` | `POST /bpmapi/businessProcess/update` (upsert) |
| `businessProcess.detail` / `get` | `GET /bpmapi/businessProcess/detail?id=` |
| `businessProcess.delete` | `DELETE /bpmapi/businessProcess/delete?id=` |
| `businessProcess.clone` | `POST /bpmapi/businessProcess/clone` |
| `businessProcess.saveDiagram` | `POST /bpmapi/businessProcess/update/config` |
| `businessProcess.updateSLA` | `POST /bpmapi/businessProcess/update/sla` |
| `businessProcess.addNode` | `POST /bpmapi/businessProcess/configNode/update` |
| `businessProcess.deleteNode` | `DELETE /bpmapi/businessProcess/node/delete?id=` |
| `businessProcess.updateLinkNode` | `POST /bpmapi/businessProcess/updateConfig` |
| `businessProcess.bpmAddNode` | `POST /bpmapi/bpmConfigNode/update` |
| `businessProcess.bpmDeleteNode` | `DELETE /bpmapi/bpmConfigNode/delete` |
| `businessProcess.bpmListNode` | `GET /bpmapi/bpmConfigNode/list` |
| `businessProcess.bpmDetailNode` | `GET /bpmapi/bpmConfigNode/get` |
| `businessProcess.bpmAddLinkNode` | `POST /bpmapi/bpmConfigLinkNode/update` |
| `businessProcess.bpmDeleteLinkNode` | `DELETE /bpmapi/bpmConfigLinkNode/delete` |
| `businessProcess.updateUserTask` | `POST /bpmapi/bpmForm/update` (BPM Designer node config) |
| `businessProcess.detailUserTask` | `GET /bpmapi/bpmForm/get` (BPM Designer node config) |
| `businessProcess.detailUserTaskNode` | `GET /bpmapi/userTask/detail?nodeId=` (**mới thêm**) |
| `businessProcess.cloneFormMapping` | `POST /bpmapi/formMapping/clone` |
| `businessProcess.listBpmForm` | `GET /bpmapi/bpmForm/list` |
| `businessProcess.updateVariableDeclare` | `POST /bpmapi/variableDeclare/update` |
| `businessProcess.listVariableDeclare` | `GET /bpmapi/variableDeclare/list` |

---

## 2. Chưa có trong BPM API doc — FE đang gọi endpoint cũ (cần BE xác nhận)

Những endpoint này vẫn đang trỏ sang `/adminapi` hoặc `/saleapi`, vì BPM API doc không đề cập.  
**BE cần xác nhận**: có migrate sang `/bpmapi` không, hay giữ nguyên.

| Key trong urls.ts | Endpoint hiện tại | Dùng ở đâu |
|---|---|---|
| `userTask.listPause` | `GET /bpmapi/workOrder/list/pause` | Màn hình tạm dừng |
| `userTask.delete` | `DELETE /adminapi/workOrder/delete` | Xóa ca bệnh |
| `userTask.relatedPeople` | `GET /adminapi/workOrder/get/related_people` | Thông tin liên quan |
| `userTask.updateOtherWorkOrder` | `POST /adminapi/workOrder/update/other_work_order` | CV liên quan |
| `userTask.getOtherWorkOrder` | `GET /adminapi/workOrder/get/other_work_order` | CV liên quan |
| `userTask.updateWorkInprogress` | `POST /saleapi/workInprogress/update` | Cập nhật tiến độ |
| `userTask.getWorkInprogress` | `GET /saleapi/workInprogress/get` | Chi tiết tiến độ |
| `userTask.getWorkInprogressList` | `GET /saleapi/workInprogress/list` | Danh sách tiến độ |
| `userTask.workExchange` | `GET /saleapi/workExchange/list` | Danh sách trao đổi (đọc) |
| `userTask.deleteWorkExchange` | `DELETE /saleapi/workExchange/delete` | Xóa trao đổi |
| `userTask.updateWorkExchange` | `GET /saleapi/workExchange/get` | Sửa trao đổi |
| `userTask.workReport` | `GET /adminapi/workOrder/report` | Báo cáo công việc |
| `userTask.exportOLA` | `GET /adminapi/ola/export` | Xuất OLA |
| `userTask.exportSLA` | `GET /adminapi/sla/export` | Xuất SLA |
| `userTask.employeeManagers` | `GET /system/employee/managers` | Danh sách người giao việc |
| `userTask.employeeAssignees` | `GET /system/employee/assignees` | Danh sách người nhận việc |

---

## 3. Alias trong BPM API doc — không cần thêm vào FE

Các alias này FE không cần gọi thẳng vì đã có URL chính:

| Alias (doc) | URL chính đã dùng trong FE |
|---|---|
| `POST /bpmapi/businessProcess/updateConfig` | `businessProcess.saveDiagram` = `/update/config` |
| `GET /bpmapi/businessProcess/get` | `businessProcess.get` |
| `POST /bpmapi/businessProcess/bpmForm/list` | `businessProcess.listBpmForm` |
| `POST /bpmapi/businessProcess/formMapping/clone` | `businessProcess.cloneFormMapping` |
| `POST /bpmapi/businessProcess/variableDeclare/update` | `businessProcess.updateVariableDeclare` |

---

## 4. API mới trong doc cần FE implement tiếp (tính năng chưa có)

| Endpoint | Mô tả | Ưu tiên |
|---|---|---|
| `POST /bpmapi/userTask/update` với body BPM Designer (`nodeKey`, `config.assignee`, `config.formKey`) | Lưu cấu hình UserTask node trực tiếp qua `/userTask/update` thay vì `/bpmForm/update` — cần test xem 2 endpoint có tương đương không | Trung bình |
| `GET /bpmapi/userTask/detail?nodeId=` | Chi tiết node config cho BPM Designer — đã thêm key `detailUserTaskNode` nhưng chưa gọi trong UI | Cao |

---

## 5. Sơ đồ menu → page → service → API

```
Mẫu quy trình điều trị  → /bpm/manage_processes       → BusinessProcessList    → businessProcess.list
Mô phỏng luồng điều trị → /bpm/process_simulation      → ProcessSimulation      → businessProcess.listBpmTrigger
Quản lý hồ sơ bệnh án   → /object_manage               → ProcessedObjectList    → processedObject.*
Xử lý hồ sơ             → /bpm/user_task_list           → UserTaskList           → userTask.list/detail
Cấu hình quy trình       → /config_bpm                  → ConfigBPM              → businessProcess.*
Phác đồ mặc định         → /bpm/manage_default_processes → ManageDefaultProcesses → manageDefaultProcesses.*
Phân công xử lý ca       → /bpm/task_assignment          → MiddleWorkList         → userTask.list
Ca bệnh chờ xử lý        → /bpm/pending_tasks            → PendingWorkList        → userTask.list (status=pending)
Ca bệnh đã hoàn thành    → /bpm/completed_tasks          → CompletedWorkList      → userTask.list (status=completed)
Ưu tiên xử lý ca         → /bpm/task_prioritization      → PriorityWorkList       → userTask.list (priority sort)
Luật xử lý y khoa        → /bpm/business_rule            → BusinessRule           → businessRule.*
```
