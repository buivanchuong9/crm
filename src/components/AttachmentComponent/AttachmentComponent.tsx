import Icon from "components/icon";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import React, { useEffect, useState } from "react";
import { trimContent } from "reborn-util";
import FileService from "services/FileService";
import { formatFileSize, handDownloadFileOrigin, showToast } from "utils/common";
import { uploadDocumentFormData } from "utils/document";
import "./AttachmentComponent.scss";

export default function AttachmentComponent(props: any) {
  const { id, listAttactment, setListAttactment, dowloadButton, disAddAttachment } = props;
  const [isLoadingFile, setIsLoadingFile] = useState<boolean>(false);
  const [showProgress, setShowProgress] = useState<number>(0);

  //! đoạn này xử lý hình ảnh
  const handleUploadDocument = (e) => {
    e.preventDefault();

    const file = e.target.files[0];

    const checkFile = file.type;
    setIsLoadingFile(true);
    if (checkFile.startsWith("image")) {
      handUploadFile(file);
    }

    if (checkFile.startsWith("application")) {
      uploadDocumentFormData(file, onSuccess, onError, onProgress);
    }

    e.target.value = ""; // Reset the input value to allow re-uploading the same file
  };

  //* Xử lý tài liệu
  const onSuccess = (data) => {
    if (data) {
      const result = {
        fileUrl: data.fileUrl,
        type: data.extension,
        fileName: data.fileName,
        fileSize: data.fileSize,
      };

      setListAttactment([result, ...listAttactment]);
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

  useEffect(() => {
    if (isLoadingFile === false) {
      setShowProgress(0);
    }
  }, [isLoadingFile]);

  const [dragging, setDragging] = useState<boolean>(false);

  function handleDragStart(e) {
    e.preventDefault();
    setDragging(true);
  }

  function handleDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
  }

  function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();

    setDragging(false);

    const newFiles = [...listAttactment];
    const droppedFiles: any = Array.from(e.dataTransfer.files);
    console.log("droppedFiles", droppedFiles);

    droppedFiles.forEach((file) => {
      // const checkFile = file?.name.split("?")[0].split("#")[0].split(".").pop();
      // if (checkFile !== "xlsx") {
      //   showToast("File không đúng định dạng. Vui lòng kiểm tra lại !", "warning");
      //   return;
      // }

      const checkFile = file.type;

      if (!newFiles.find((f) => f.fileName === file.name)) {
        setIsLoadingFile(true);
        if (checkFile.startsWith("image")) {
          handUploadFile(file);
        }

        if (checkFile.startsWith("application")) {
          uploadDocumentFormData(file, onSuccess, onError, onProgress);
        }
      }
    });

    setListAttactment(newFiles);
  }

  const handUploadFile = async (file) => {
    await FileService.uploadFile({ data: file, onSuccess: processUploadSuccess, onError: uploadError, onProgress });
  };

  const processUploadSuccess = (data) => {
    const result = data?.fileUrl;
    const changeResult = {
      fileUrl: result,
      type: "image",
      fileName: data.fileName,
      fileSize: data?.fileSize,
    };
    setListAttactment([changeResult, ...listAttactment]);
    setIsLoadingFile(false);
  };

  const uploadError = (message) => {
    setIsLoadingFile(false);
    showToast(message.message ?? "Có lỗi xảy ra. Vui lòng thử lại sau !", "error");
  };

  const handleRemoveImageItem = (idx) => {
    const result = [...listAttactment];
    result.splice(idx, 1);
    setListAttactment(result);
  };

  const [downloadAll, setDownloadAll] = useState(false);
  // Hàm để tải và nén các file
  const downloadAndZipFiles = async (listFile) => {
    const zip = new JSZip();
    const folder = zip.folder("files");

    // Tải từng file và thêm vào file nén
    for (const url of listFile) {
      const response = await fetch(url.fileUrl);
      const blob = await response.blob();
      const fileName = url.fileName;
      folder.file(fileName, blob);
    }

    // Tạo file nén và tải xuống
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "files.zip");
    });
    setDownloadAll(false);
  };

  const handleDownloadAll = () => {
    setDownloadAll(true);
    downloadAndZipFiles(listAttactment);
  };

  return (
    <div className="attachments-component">
      <label className="title-attachment">Tệp đính kèm</label>
      {disAddAttachment ? null : (
        <div
          className={"wrapper-list-image"}
          draggable="true"
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onDragStart={handleDragStart}
        >
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <label htmlFor="imageUpload" className="action-upload-image">
              <div className={`wrapper-upload`}>
                <div>
                  <Icon name="UploadRox" />
                </div>
                <div>Nhấn hoặc thả vào để tải lên</div>
              </div>
            </label>
          </div>
        </div>
      )}

      {listAttactment && listAttactment.length > 0 ? (
        <div style={{ marginTop: "1rem" }}>
          <span style={{ fontSize: 12, fontWeight: "500", color: "#939394" }}>Đã tải lên</span>
        </div>
      ) : null}

      <div className="list-attachment">
        {isLoadingFile ? (
          <div className="item-attachment">
            <Icon name="FileXls" />
            <div className="data-file">
              <span style={{ fontSize: 14, fontWeight: "500" }}>Đang tải...</span>
              <div className="container-loading">
                <div className="item-loading" style={{ width: `${showProgress}%` }} />
              </div>
            </div>
          </div>
        ) : null}
        {listAttactment && listAttactment.length > 0
          ? listAttactment.map((item, index) => (
              <div
                key={index}
                className="item-attachment"
                onDoubleClick={() => {
                  if (item?.type !== "image") {
                    window.open(
                      `${process.env.APP_LINK}/app/view_document?name=${item.fileName}&url=${item.fileUrl}`,
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }
                }}
              >
                {item?.type == "image" ? <img src={item?.fileUrl} width={36} height={36} /> : <Icon name="FileXls" />}
                <div className="data-file">
                  <span style={{ fontSize: 14, fontWeight: "500" }}>
                    {item?.fileName ? trimContent(item?.fileName, 50, true, true) : ``}
                    {item?.fileName?.length > 50 ? `.${item?.type}` : ""}
                  </span>
                  <div>
                    <span style={{ fontSize: 12, fontWeight: "400", color: "#999999" }}>{item?.fileSize ? formatFileSize(item?.fileSize) : ``}</span>
                  </div>
                </div>

                {dowloadButton ? (
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handDownloadFileOrigin(item.fileUrl, item.fileName);
                    }}
                  >
                    <Icon name="DownLoadNew" style={{ width: "2rem", height: "2rem" }} />
                  </div>
                ) : disAddAttachment ? null : (
                  <div
                    style={{ marginTop: "-1rem", cursor: "pointer" }}
                    onClick={() => {
                      handleRemoveImageItem(index);
                    }}
                  >
                    <Icon name="Times" style={{ width: "2rem", height: "2rem" }} />
                  </div>
                )}
              </div>
            ))
          : null}
      </div>
      <input
        type="file"
        accept="image/*,.xlsx,.xls,.doc,.docx,.ppt,.pptx,.txt,.pdf"
        className="d-none"
        id="imageUpload"
        onChange={(e) => handleUploadDocument(e)}
      />
    </div>
  );
}
