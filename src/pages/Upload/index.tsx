import React, { useEffect, useState } from "react";
import parser from "html-react-parser";
import Tippy from "@tippyjs/react";
import Icon from "components/icon";
import { getSearchParameters } from "reborn-util";
import DocumentService from "services/DocumentService";
import FileService from "services/FileService";
import { FILE_IMAGE_MAX } from "utils/constant";

import Button from "components/button/button";
import { showToast } from "utils/common";
import "./index.scss";

/**
 * Nhận tham số đầu vào gồm nodeId, processId, potId, fieldName => Cho phép render ra form tương ứng
 * @returns 
 */
export default function LinkUpload() {
  document.title = ""; //Ảnh hoặc file theo định dạng
  const params: any = getSearchParameters();

  //Định dạng là mảng JSON
  const [data, setData] = useState([]);
  const [nodeId, setNodeId] = useState('');
  const [processId, setProcessId] = useState(0);
  const [potId, setPotId] = useState(0);
  const [fieldName, setFieldName] = useState('');

  console.log(data);

  const handleImageUpload = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files[0].size > FILE_IMAGE_MAX) {
        showToast(`Ảnh tải lên giới hạn dung lượng không quá ${FILE_IMAGE_MAX / 1024 / 1024}MB`, "warning");
        e.target.value = "";
      } else {
        handUploadFile(e.target.files[0]);
        e.target.value = null;
      }
    }
  };

  const processUploadSuccess = (data) => {
    const result = data?.fileUrl;
    showImage(data);
  };

  const handUploadFile = async (file) => {
    await FileService.uploadFile({ data: file, onSuccess: processUploadSuccess });
  };

  /**
   * Show ra thông tin tải ảnh lên => Dùng thông tin này lưu vào tiếp vào data => Save vào db
   * @param item 
   */
  const showImage = (item) => {
    //Đẩy luôn res xuống db
    handSubmitForm(item);
  }

  /**
   * Lấy ra các tài liệu được cung cấp
   * @param id 
   * @returns 
   */
  const getDocuments = async (nodeId: string, processId: number, potId: number, fieldName: string) => {
    if (!nodeId || !processId || !potId || !fieldName) {
      console.log('getDocuments empty =>', nodeId, processId, potId, fieldName);
      return;
    };

    setNodeId(nodeId);
    setProcessId(processId);
    setPotId(potId);
    setFieldName(fieldName);

    const response = await DocumentService.detail(nodeId, processId, potId, fieldName);
    if (response.code === 0) {
      const result = response.result;
      console.log('result =>', result);

      setData(result == null ? [] : JSON.parse(result?.data || []));
    } else {
      showToast("Có lỗi xảy ra. Vui lòng thử lại sau !", "error");
    }
  };

  useEffect(() => {
    getDocuments(params?.nodeId, +params?.processId, +params?.potId, params?.fieldName);
  }, []);

  /**
   * Tải tài liệu lên (Luôn là 1 phần tử)
   * @param e 
   */
  const handSubmitForm = async (item: any) => {
    let dataSubmit = {
      nodeId,
      processId,
      potId,
      fieldName,
      data: JSON.stringify(item)
    }

    const response = await DocumentService.update(dataSubmit);
    console.log(response);

    //Tải lại lấy danh sách
    getDocuments(nodeId, processId, potId, fieldName);
  };

  return (
    <div className="page__link--survey">
      <form style={{ width: `62rem` }} className="form__add--voc" onSubmit={(e) => handSubmitForm(e)}>
        <div className="evaluate__survey">
          <div className="lst__star--rating">
            {
              (data != null && data.length > 0) ? data.map((item, idx) => {
                return (
                  <div key={idx}>
                    <img src={item?.fileUrl} width={96} height={96} />
                  </div>
                );
              }) : null
            }

            <div>
              <input type="file" name="Upload" accept="image/*" onChange={e => handleImageUpload(e)} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
