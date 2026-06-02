# TÀI LIỆU YÊU CẦU VÀ MAP API CHO MODULE BPM (DÀNH CHO BACKEND TEAM) - CHI TIẾT PAYLOAD

Tài liệu này tổng hợp chi tiết tất cả các endpoints mà Frontend (React) đang gọi đến để phục vụ toàn bộ module BPM (Quy trình khám chữa bệnh), **bao gồm chi tiết Payload (Body Request)** để team BE thiết kế Schema/DTO tương ứng.

Base URL tham chiếu: Các API thường nằm sau tiền tố `prefixBpm` (Ví dụ: `/api/v1/bpm`).

---

## 1. QUẢN LÝ QUY TRÌNH KINH DOANH (Business Process & Diagram)
_File tham chiếu FE: `src/services/BusinessProcessService.ts`_

### 1.1 Lấy danh sách quy trình & Lấy chi tiết
- **GET** `/businessProcess/list` (Query: `?page=1&limit=20&name=...`)
- **GET** `/businessProcess/detail?id={id}`
- **GET** `/businessProcess/get?id={id}` (Lấy chi tiết bản vẽ)

### 1.2 Lưu bản vẽ quy trình (Save Diagram)
API này rất quan trọng, nó gửi lên cấu hình giao diện vẽ luồng (BPMN XML) từ ReactFlow/BpmnJS.
- **POST** `/businessProcess/update/config` (saveDiagram)
- **Body JSON (Request):**
```json
{
  "id": 123, // ID của quy trình
  "config": "<?xml version=\"1.0\" encoding=\"UTF-8\"?><definitions>...</definitions>" // XML string cực lớn
}
```

### 1.3 Cập nhật SLA cho quy trình hoặc Node
- **POST** `/businessProcess/update/sla`
- **Body JSON:** `{"id": 123, "slaTime": 24, "slaUnit": "HOURS", ...}`

---

## 2. QUẢN LÝ CẤU HÌNH NODE & LINK (Elements on Diagram)
Thay vì ném cục XML cho BE tự parse, FE sẽ bóc tách từng thao tác (kéo thả node, nối dây) thành các request nhỏ gửi lên BE ngay lập tức (Realtime saving).

### 2.1 Thêm Node mới vào bản vẽ (bpmAddNode)
- **POST** `/businessProcess/configNode/update`
- **Body JSON (Request):**
```json
{
  "name": "Kiểm tra hồ sơ", // Tên node
  "typeNode": "bpmn:UserTask", // Hoặc ServiceTask, SubProcess, StartEvent...
  "processId": 123, // ID quy trình cha
  "nodeId": "UserTask_012xyz", // ID auto-gen từ BpmnJS
  "childProcessId": null, // Nếu là SubProcess thì điền ID của sub-process
  "attachToNodeId": null // Dành cho Boundary Event (gắn vào node nào)
}
```

### 2.2 Xoá Node
- **DELETE** `/businessProcess/node/delete?nodeId={id_cua_node_trong_bpmn}`

### 2.3 Thêm / Cập nhật Liên kết dây (SequenceFlow / Link)
- **POST** `/businessProcess/updateConfig` (bpmAddLinkNode)
- **Body JSON (Request):**
```json
{
  "linkId": "SequenceFlow_456abc",
  "fromNodeId": "UserTask_012xyz", // Từ Node ID nào
  "toNodeId": "ServiceTask_789def", // Tới Node ID nào
  "flowType": "normal", // 'normal' hoặc 'condition'
  "config": "", // Điều kiện rẽ nhánh (nếu có)
  "processId": 123
}
```
- **DELETE** `/businessProcess/updateConfig?linkId={id}` (Xoá dây nối)

---

## 3. CẬP NHẬT CHI TIẾT TỪNG LOẠI TASK (Task Properties)
Mỗi node trên FE khi được click vào sẽ mở ra 1 Modal setting riêng. Khi người dùng bấm lưu cài đặt của Node đó, FE sẽ gọi đúng API tuỳ loại Task.

**Ví dụ với User Task (Các loại khác như ServiceTask, ScriptTask tương tự):**
- **GET** `/userTask/detail?nodeId={bpmn_node_id}`
- **POST** `/userTask/update`
```json
{
  "nodeId": "UserTask_012xyz",
  "assignee": "uuid_nhan_vien", 
  "candidateGroups": "uuid_phong_ban",
  "formKey": "form_kham_benh_01" // ID của E-form gắn với task này
}
```

---

## 4. QUẢN LÝ CÔNG VIỆC VÀ HỒ SƠ CHỜ XỬ LÝ (Case Assignment / Work Order)
_File tham chiếu FE: `src/services/UserTaskService.ts`_
Đây là nơi xử lý Logic nghiệp vụ (Thực thi Process). Dữ liệu này hiển thị ở màn hình **Ca bệnh chờ xử lý, Đã hoàn thành**.

### 4.1 Cập nhật thông tin công việc / hồ sơ cơ bản
- **POST** `/userTask/update`
- **Body JSON (IWorkOrderRequestModel):**
```json
{
  "id": 456, // ID của Work Order / Instance
  "name": "Khám tổng quát KH Nguyễn Văn A",
  "content": "Ghi chú nội dung...",
  "contentDelta": "{}", // Delta JSON từ trình soạn thảo
  "startTime": "2026-06-02T10:00:00Z",
  "endTime": "2026-06-03T10:00:00Z",
  "workLoad": 1,
  "workLoadUnit": "DAY",
  "projectId": 789,
  "managerId": 12, // ID quản lý
  "employeeId": 34, // ID người phụ trách
  "participants": "[56, 78]", // Mảng ID người liên quan
  "customers": "[90]", // Mảng ID khách hàng
  "status": 1, // Trạng thái (0: Mới, 1: Đang làm, 2: Hoàn thành...)
  "percent": 50, // % Tiến độ
  "priorityLevel": 2 // 1: Thấp, 2: TB, 3: Cao, 4: Gấp
}
```

### 4.2 Cập nhật Trạng thái Task (Hoàn thành, Huỷ, Chuyển tiếp)
- **POST** `/userTask/updateStatus`
- **Body JSON (IUpdateStatusRequest):**
```json
{
  "id": 456, // Work Order ID
  "status": 2 // 2 là Hoàn thành (Ví dụ) => BE cần nhận biết Status này để đẩy BPM Engine đi tiếp
}
```

### 4.3 Cập nhật Đánh giá (Rating) cho Task
- **POST** `/userTask/updateRating`
- **Body JSON (IUpdateRatingRequestModal):**
```json
{
  "worId": 456,
  "mark": 5, // Đánh giá sao (1-5)
  "content": "Hoàn thành tốt"
}
```

### 4.4 Cập nhật / Trao đổi bình luận (Chat/Comments trong Task)
- **POST** `/userTask/addWorkExchange`
- **Body JSON:**
```json
{
  "worId": 456,
  "content": "Hồ sơ này cần bổ sung X quang",
  "employeeId": 34 // Người comment
}
```

### 4.5 Các API cập nhật nhỏ lẻ khác (Partial Updates)
BE cần xây dựng các API nhận tham số cụ thể để cập nhật nhanh:
- **POST** `/userTask/updateParticipant` => Body: `{"id": 456, "participants": "1,2,3"}`
- **POST** `/userTask/updateCustomer` => Body: `{"id": 456, "customers": "100"}`
- **POST** `/userTask/updatePriorityLevel` => Body: `{"id": 456, "priorityLevel": 3}`
- **POST** `/userTask/updatePause` => Body: (Giống `/userTask/update` nhưng đổi trạng thái thành Pause)

---

## 5. MAPPING FORM & BIẾN SỐ (Variables & Form)
- **GET** `/businessProcess/bpmForm/list`
- **POST** `/businessProcess/formMapping/clone`
- **POST** `/businessProcess/variableDeclare/update` (Khai báo biến nội bộ)
- **Body JSON (Variable Declare):**
```json
{
  "processId": 123,
  "variableName": "totalAmount",
  "variableType": "Integer", // String, Boolean, Date...
  "defaultValue": "0"
}
```

> **Ghi chú dành cho Senior Backend Engineer:** Các API liên quan đến Node/Link của BPMN cần được xử lý transaction an toàn. Frontend sẽ ném lên BE ID là chuỗi ngẫu nhiên do BPMN tạo ra (vd: `Event_0s58xyf`), BE cần lưu chuỗi này làm khóa chính/khóa phụ (`nodeId`) để đối soát với file XML gốc của ReactFlow/BpmnJS lúc render lại sơ đồ. Việc xử lý `updateStatus` từ User Task phải trigger được việc hoàn thành Task trong BPM Engine (Camunda/Flowable).
