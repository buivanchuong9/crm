/**
 * ClinicPaletteProvider — Custom bpmn-js Palette Provider
 *
 * Chỉ giữ lại 5 loại node thiết yếu cho phòng khám:
 *  1. Start Event
 *  2. User Task   (Bác sĩ / Lễ tân thao tác)
 *  3. Service Task (AI phân tích, gửi SMS tự động)
 *  4. Exclusive Gateway / XOR (rẽ nhánh điều kiện)
 *  5. End Event
 *
 * Bỏ hoàn toàn:
 *  - Parallel / Inclusive / Complex Gateway
 *  - Script / Manual / Send / Receive / Business Rule Task
 *  - SubProcess / Call Activity
 *  - Mọi Intermediate Event (Timer, Signal, Message, Compensation, Escalation…)
 *  - Pools & Swimlanes
 *  - Data Object / Data Store
 */

const ALLOWED_ENTRIES = new Set([
  "create.start-event",
  "create.end-event",
  "create.user-task",
  "create.service-task",
  "create.exclusive-gateway",
  // lasso-tool + hand-tool để vẫn giữ UX kéo/chọn canvas
  "lasso-tool",
  "hand-tool",
  "space-tool",
  "global-connect-tool",
]);

export function ClinicPaletteProvider(palette: any, create: any, elementFactory: any, spaceTool: any, lassoTool: any, handTool: any, globalConnect: any) {
  palette.registerProvider(this);
}

ClinicPaletteProvider.$inject = [
  "palette",
  "create",
  "elementFactory",
  "spaceTool",
  "lassoTool",
  "handTool",
  "globalConnect",
];

ClinicPaletteProvider.prototype.getPaletteEntries = function (_element: any) {
  // Trả về object rỗng — bpmn-js sẽ vẫn render palette mặc định,
  // nhưng chúng ta sẽ dùng CSS filter để ẩn các entry không mong muốn.
  // Cách hiệu quả hơn: override bằng cách trả về entries tùy chỉnh.
  return {};
};

/**
 * PaletteFilter — module bitmask lọc entry từ palette mặc định
 * Cách dùng: đăng ký vào additionalModules của BpmnJS
 */
export function ClinicPaletteFilter(eventBus: any) {
  // Lắng nghe sau khi palette render xong rồi ẩn entry không mong muốn bằng DOM
  eventBus.on("palette.changed", () => {
    const paletteEl = document.querySelector(".djs-palette");
    if (!paletteEl) return;

    const entries = paletteEl.querySelectorAll("[data-action]");
    entries.forEach((entry: Element) => {
      const action = entry.getAttribute("data-action") as string;
      const el = entry as HTMLElement;
      if (!ALLOWED_ENTRIES.has(action)) {
        el.style.display = "none";
      } else {
        el.style.display = "";
      }
    });

    // Ẩn các separator (đường kẻ giữa) trở nên thừa sau khi ẩn entry
    const separators = paletteEl.querySelectorAll(".separator");
    separators.forEach((sep: Element) => {
      const sibling = sep.nextElementSibling as HTMLElement | null;
      if (sibling && sibling.style.display === "none") {
        (sep as HTMLElement).style.display = "none";
      } else {
        (sep as HTMLElement).style.display = "";
      }
    });
  });
}

ClinicPaletteFilter.$inject = ["eventBus"];

/** Module object để truyền vào additionalModules */
export const clinicPaletteModule = {
  __init__: ["clinicPaletteFilter"],
  clinicPaletteFilter: ["type", ClinicPaletteFilter],
};
