/**
 * ActionCell — Cột Thao tác theo mẫu SaaS hiện đại
 *
 * Bố cục:
 *  [🎨 Thiết kế]  [⊞ Cài đặt Grid]  [⋮]
 *   ─ nút chính ─  ─  nút chính ─   └─ dropdown:
 *                                        • Sao chép
 *                                        • Sửa thông tin
 *                                        ─────────────
 *                                        • Xóa (màu đỏ)
 *
 * Đã bỏ hoàn toàn: Debug, Export SLA
 */
import React, { useEffect, useRef, useState } from "react";
import Icon from "components/icon";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

interface ActionCellProps {
  item: any;
  permissions: Record<string, number>;
  listIdChecked: number[];
  onDesign: () => void;
  onSettingGrid: () => void;
  onEdit: () => void;
  onClone: () => void;
  onDelete: () => void;
}

export default function ActionCell({
  item,
  permissions,
  listIdChecked,
  onDesign,
  onSettingGrid,
  onEdit,
  onClone,
  onDelete,
}: ActionCellProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const isMultiSelect = listIdChecked.length > 0;

  return (
    <div className="action-cell" style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "center" }}>
      {/* ── Nút chính 1: Thiết kế quy trình ── */}
      <Tippy content="Thiết kế quy trình" placement="top">
        <button
          className="action-btn action-btn--primary"
          onClick={onDesign}
          disabled={isMultiSelect}
          style={btnStyle(isMultiSelect)}
        >
          <Icon name="Settings" style={{ width: 15, height: 15 }} />
        </button>
      </Tippy>

      {/* ── Nút chính 2: Cài đặt Grid ── */}
      <Tippy content="Cài đặt Grid" placement="top">
        <button
          className="action-btn action-btn--secondary"
          onClick={onSettingGrid}
          disabled={isMultiSelect}
          style={btnStyle(isMultiSelect)}
        >
          <Icon name="SettingGrid" style={{ width: 15, height: 15 }} />
        </button>
      </Tippy>

      {/* ── Nút 3 chấm → dropdown ── */}
      <div ref={dropdownRef} style={{ position: "relative" }}>
        <Tippy content="Thêm thao tác" placement="top">
          <button
            className="action-btn action-btn--more"
            onClick={() => setOpen((p) => !p)}
            style={btnStyle(false, true)}
          >
            <span style={{ fontSize: 16, fontWeight: 700, lineHeight: 1, letterSpacing: 0 }}>⋮</span>
          </button>
        </Tippy>

        {open && (
          <div className="action-dropdown" style={dropdownStyle}>
            {/* Sao chép */}
            <DropItem
              icon={<Icon name="Copy" style={{ width: 14 }} />}
              label="Sao chép quy trình"
              onClick={() => { setOpen(false); onClone(); }}
            />

            {/* Sửa thông tin — chỉ hiện nếu có quyền */}
            {permissions["PROCESS_MANAGEMENT_UPDATE"] === 1 && (
              <DropItem
                icon={<Icon name="PencilSimpleLine" style={{ width: 14 }} />}
                label="Sửa thông tin"
                onClick={() => { setOpen(false); onEdit(); }}
              />
            )}

            {/* Divider */}
            <div style={{ borderTop: "1px solid #f0f0f0", margin: "4px 0" }} />

            {/* Xóa — chỉ hiện nếu có quyền */}
            {permissions["PROCESS_MANAGEMENT_DELETE"] === 1 && (
              <DropItem
                icon={<Icon name="TrashRox" style={{ width: 14 }} className="icon-delete-active" />}
                label="Xóa quy trình"
                onClick={() => { setOpen(false); onDelete(); }}
                danger
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Helper Components ── */
function DropItem({
  icon,
  label,
  onClick,
  danger = false,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  danger?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        width: "100%",
        padding: "7px 12px",
        border: "none",
        background: hovered ? (danger ? "#fff1f0" : "#f5f5f5") : "transparent",
        color: danger ? "#ff4d4f" : "#333",
        fontSize: 13,
        cursor: "pointer",
        textAlign: "left",
        borderRadius: 4,
        transition: "background 0.15s",
      }}
    >
      {icon}
      {label}
    </button>
  );
}

/* ── Style helpers ── */
const btnStyle = (disabled: boolean, isMini = false): React.CSSProperties => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: isMini ? 26 : 28,
  height: 28,
  border: "1px solid #e5e7eb",
  borderRadius: 6,
  background: disabled ? "#f3f4f6" : "#fff",
  cursor: disabled ? "not-allowed" : "pointer",
  opacity: disabled ? 0.5 : 1,
  transition: "all 0.15s",
  padding: 0,
});

const dropdownStyle: React.CSSProperties = {
  position: "absolute",
  right: 0,
  top: "calc(100% + 4px)",
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: 8,
  boxShadow: "0 6px 20px rgba(0,0,0,0.10)",
  minWidth: 180,
  zIndex: 9999,
  padding: "4px",
};
