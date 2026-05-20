import React, { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import Textarea from "components/textarea/textarea";
import { IActionModal } from "model/OtherModel";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/modal/modal";
import Dialog, { IContentDialog } from "components/dialog/dialog";
import "./ModalAdjustBidPackage.scss";
import AttachmentComponent from "components/AttachmentComponent/AttachmentComponent";
import SelectCustom from "components/selectCustom/selectCustom";
import ConfirmBidOpenModal from "./ConfirmBidOpenModal/ConfirmBidOpenModal";
import Icon from "components/icon";
import EmployeeService from "services/EmployeeService";
import DocumentService from "services/DocumentService";
import ImageThirdGender from "assets/images/third-gender.png";

interface TenderDoc {
    id: number;
    note: string | null;
    required: boolean;
    documentName: string | null;
    documentType: string;
    createdAt: Date;
    docType: string | null;
    attachments: string | null;
    position: number | null;
    packageId: number;
    name: string;
    data: string | null;
    dataHeader: string | null;
  }

export default function ModalAdjustBidPackage({ onShow, onHide, data }) {
  const [tenderDocs, setTenderDocs] = useState<TenderDoc[]>([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [contentDialog, setContentDialog] = useState<IContentDialog | null>(null);
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [activeByItem, setActiveByItem] = useState({});
  const [notesByItem, setNotesByItem] = useState({});
  const [selectedUsersByItem, setSelectedUsersByItem] = useState({});
  const [dropdownsByItem, setDropdownsByItem] = useState({});
  const [attachmentsByItem, setAttachmentsByItem] = useState({});
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const [adjustmentPayload, setAdjustmentPayload] = useState([]);
  const [userUnchecked, setUserUnchecked] = useState<number[]>([]);
  const [showDialog, setShowDialog] = useState(false);

  const fetchDefaultEmployee = async () => {
    const res = await EmployeeService.list({ name: "", page: 1, limit: 1 });
    if (res.code === 0 && res.result.items.length > 0) {
      const emp = res.result.items[0];
      return { id: emp.id, name: emp.name, avatar: emp.avatar };
    }
    return null;
  };  

  const fetchDefaultTenderDocument = async (): Promise<TenderDoc[]> => {
    const res = await DocumentService.tenderDocument({ packageId: data.id });
    if (res.code === 0 && Array.isArray(res.result) && res.result.length > 0) {
      // Mỗi phần tử trong res.result là object thô từ API,
      // ta map nó thành TenderDoc (với createdAt chuyển về Date)
      return res.result.map(item => ({
        id:              item.id,
        note:            item.note,
        required:        item.required,
        documentName:    item.documentName,
        documentType:    item.documentType,
        createdAt:       new Date(item.createdAt),
        docType:         item.docType,
        attachments:     item.attachments,
        position:        item.position,
        packageId:       item.packageId,
        name:            item.name,
        data:            item.data,
        dataHeader:      item.dataHeader,
      }));
    }
    // Nếu không có result hoặc code ≠ 0, trả về mảng rỗng
    return [];
  };

  const loadDefaultEmployeeForTab = async (tabId: number) => {
    setDropdownsByItem(prev => ({ ...prev, [tabId]: prev[tabId] || [0] }));
    setAttachmentsByItem(prev => ({ ...prev, [tabId]: prev[tabId] || [] }));
    setActiveByItem(prev => ({ ...prev, [tabId]: prev[tabId] ?? false }));

    if (!selectedUsersByItem[tabId] || selectedUsersByItem[tabId].length === 0) {
      const emp = await fetchDefaultEmployee();
      if (emp) {
        setSelectedUsersByItem(prev => ({ ...prev, [tabId]: [emp] }));
      }
    }
  };

  const handleAttachmentChange = (files) => {
    setAttachmentsByItem(prev => ({
      ...prev,
      [activeTab]: files,
    }));
  };

  useEffect(() => {
    if (data?.id && onShow) {
      fetchDefaultTenderDocument().then(docs => {
        setTenderDocs(docs);
        if (docs.length > 0) {
          const firstId = docs[0].id;
          setActiveTab(firstId);
          // Khởi tạo các map state cho mỗi doc
          docs.forEach(doc => {
            setDropdownsByItem(prev => ({ ...prev, [doc.id]: [0] }));
            setAttachmentsByItem(prev => ({ ...prev, [doc.id]: [] }));
            setActiveByItem(prev => ({ ...prev, [doc.id]: false }));
          });
          loadDefaultEmployeeForTab(firstId);
        }
      });
    }
  }, [data, onShow]);

  const handleClear = (acc, reload = false) => {
    onHide(acc, reload);
    setAttachmentsByItem({});
    setAdjustmentPayload([]);
    setCheckedItems([]);
    setIsModalConfirmOpen(false);
  };

  const handleAddDropdown = (e) => {
    e.preventDefault();
    setDropdownsByItem(prev => ({
      ...prev,
      [activeTab]: [...(prev[activeTab] || []), Date.now()],
    }));
  };

  const handleRemove = (index) => {
    setSelectedUsersByItem(prev => {
      const updated = [...(prev[activeTab] || [])];
      updated.splice(index, 1);
      return { ...prev, [activeTab]: updated };
    });
    setDropdownsByItem(prev => {
      const updated = [...(prev[activeTab] || [])];
      updated.splice(index, 1);
      return { ...prev, [activeTab]: updated };
    });
  };

  const buildAdjustmentPayload = useCallback(() => {
    return checkedItems.map(itemId => {
      const item = tenderDocs.find(t => t.id === itemId);
      const users = selectedUsersByItem[itemId] || [];
      return {
        itemId,
        itemName: item?.name || itemId,
        documentType: item?.documentType || itemId,
        adjusters: users.map(u => ({ id: u.id, name: u.name })),
        note: notesByItem[itemId] || "",
        attachments: attachmentsByItem[itemId] || [],
        requireApproval: activeByItem[itemId] || false,
      };
    });
  }, [checkedItems, tenderDocs, selectedUsersByItem, notesByItem, attachmentsByItem, activeByItem]);

  const toggleCheck = (id: number) => {
    setCheckedItems(prev => {
      const isChecked = prev.includes(id);
      const next = isChecked ? prev.filter(i => i !== id) : [...prev, id];
      setUserUnchecked(p => isChecked ? [...p, id] : p.filter(u => u !== id));
      return next;
    });
  };

  useEffect(() => {
    const autoChecked = [...checkedItems];
    tenderDocs.forEach(({ id }) => {
      const hasNoteOrFile = notesByItem[id] || (attachmentsByItem[id]?.length > 0);
      const alreadyChecked = checkedItems.includes(id);
      const manuallyUnchecked = userUnchecked.includes(id);
      if (hasNoteOrFile && !alreadyChecked && !manuallyUnchecked) autoChecked.push(id);
    });
    if (autoChecked.length !== checkedItems.length) setCheckedItems(autoChecked);
  }, [notesByItem, attachmentsByItem]);

  const loadedOptionEmployee = async (search, loadedOptions, { page }) => {
    const res = await EmployeeService.list({ name: search, page, limit: 10 });
    if (res.code !== 0) return { options: [], hasMore: false };
    return {
      options: res.result.items.map(item => ({
        value: item.id,
        label: item.name,
        avatar: item.avatar,
      })),
      hasMore: res.result.loadMoreAble,
      additional: { page: page + 1 },
    };
  };

  const formatOptionLabelEmployee = ({ label, avatar }) => (
    <div className="selected--item">
      <div className="avatar"><img src={avatar || ImageThirdGender} alt={label} /></div>
      {label}
    </div>
  );

  const actions = useMemo<IActionModal>(() => ({
    actions_right: {
      buttons: [
        {
          title: "Đóng",
          color: "primary",
          variant: "outline",
          disabled: isSubmit,
          callback: () => handleClear(false),
        },
        {
          title: "Gửi yêu cầu điều chỉnh",
          color: "primary",
          disabled: isSubmit,
          is_loading: isSubmit,
          callback: () => {
            setAdjustmentPayload(buildAdjustmentPayload());
            setIsModalConfirmOpen(true);
          },
        },
      ],
    },
  }), [isSubmit, buildAdjustmentPayload]);


  return (
    <Fragment>
      <Modal
        isFade
        isOpen={onShow}
        isCentered
        staticBackdrop
        size="full"
        toggle={() => !isSubmit && handleClear(false)}
        className="modal-extend"
      >
        <form className="form-extend">
          <ModalHeader title="Điều chỉnh gói thầu" toggle={() => !isSubmit && handleClear(false)} />
          <ModalBody>
            <div className="container_extend_bid_package">
              <div className="body-content-adjust-bid-package">
                <div className="tender-file-list">
                  <h2 className="title">Hồ sơ mời thầu</h2>
                  <h3 className="sub-title">Hồ sơ kỹ thuật</h3>
                  {tenderDocs.map(({ id, name }) => (
                    <div
                      key={id}
                      className={`tender-item ${activeTab === id ? "active" : ""}`}
                      onClick={() => {
                        setActiveTab(id);
                        setDropdownsByItem(prev => ({ ...prev, [id]: prev[id] || [0] }));
                        setAttachmentsByItem(prev => ({ ...prev, [id]: prev[id] || [] }));
                        setActiveByItem(prev => ({ ...prev, [id]: prev[id] || false }));
                        loadDefaultEmployeeForTab(id);
                      }}
                    >
                      <div className="checkbox-wrapper">
                        {(notesByItem[id] || (attachmentsByItem[id]?.length > 0)) && (
                          <input
                            type="checkbox"
                            checked={checkedItems.includes(id)}
                            onChange={(e) => {
                              e.stopPropagation();
                              toggleCheck(id);
                            }}
                          />
                        )}
                      </div>
                      <span className="label">{name}</span>
                    </div>
                  ))}
                </div>
                <div className="form-extend-content">
                  <div className="form-adjuster">
                    <div className="user-adjuster">
                      <label className="label">Người điều chỉnh hồ sơ</label>
                      {(dropdownsByItem[activeTab] || []).map((_, index) => (
                        <div key={index} className="dropdown-wrapper">
                          <SelectCustom
                            id={`adjuster-${index}`}
                            name={`adjuster-${index}`}
                            value={
                              selectedUsersByItem[activeTab]?.[index]
                                ? {
                                  value: selectedUsersByItem[activeTab][index].id,
                                  label: selectedUsersByItem[activeTab][index].name,
                                  avatar: selectedUsersByItem[activeTab][index].avatar,
                                }
                                : null
                            }
                            options={[]}
                            placeholder="Chọn người điều chỉnh"
                            fill={true}
                            loadOptionsPaginate={loadedOptionEmployee}
                            additional={{ page: 1 }}
                            isAsyncPaginate={true}
                            isFormatOptionLabel={true}
                            formatOptionLabel={formatOptionLabelEmployee}
                            onChange={(e) => {
                              const userSelected = {
                                id: e.value,
                                name: e.label,
                                avatar: e.avatar,
                              };
                              setSelectedUsersByItem(prev => {
                                const updated = [...(prev[activeTab] || [])];
                                updated[index] = userSelected;
                                return { ...prev, [activeTab]: updated };
                              });
                            }}
                          />

                          <button className="remove-button" onClick={() => handleRemove(index)}>✕</button>
                        </div>
                      ))}
                      <button className="add-button" onClick={handleAddDropdown}>
                        <Icon name="AddBiddingBlack" />
                        <span>Thêm người điều chỉnh</span>
                      </button>
                    </div>
                    <div className="request-approval">
                      <div>Yêu cầu phê duyệt</div>
                      <div className={`toggle-button ${activeByItem[activeTab] ? "active" : ""}`}
                           onClick={() => setActiveByItem(prev => ({ ...prev, [activeTab]: !prev[activeTab] }))}>
                        <div className="toggle-thumb" />
                      </div>
                    </div>
                  </div>
                  <div className="form-note">
                    <div className="form-group">
                      <label className="form-label">Lý do điều chỉnh</label>
                      <Textarea
                        value={notesByItem[activeTab] || ""}
                        onChange={(e) => setNotesByItem(prev => ({ ...prev, [activeTab]: e.target.value }))}
                        placeholder="Nhập lý do điều chỉnh"
                        maxLength={500}
                      />
                    </div>
                    <AttachmentComponent
                      listAttactment={attachmentsByItem[activeTab] || []}
                      setListAttactment={files => handleAttachmentChange(files)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter actions={actions} />
        </form>
      </Modal>

      <ConfirmBidOpenModal
        onShow={isModalConfirmOpen}
        onHide={(reload) => {
          if (reload) {
            handleClear(false, true);
          } else {
            setIsModalConfirmOpen(false);
          }
        }}
        data={data}
        adjustmentPayload={adjustmentPayload}
      />

      <Dialog content={contentDialog} isOpen={showDialog} />
    </Fragment>
  );
}
