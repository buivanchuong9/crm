import React, { useEffect, useMemo, useRef, useState } from "react";
import "./ViewDocumentBpm.scss";
import { getSearchParameters } from "reborn-util";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import Icon from "components/icon";
import { handDownloadFileOrigin } from "utils/common";


export default function ViewDocumentBpm(props: any) {
  const params: any = getSearchParameters();
  const url = params?.url || '';
  const name = params?.name || '';
  const decodedName = decodeURIComponent(name);

  const [fileContract, setFileContract] = useState([]);  

  useEffect(() => {
    if (url) {
      if (url.includes(".docx")) {
        setFileContract([
          {
            uri: url,
            fileType: "docx",
          },
        ]);
      }

      if (url.includes(".doc")) {
        setFileContract([
          {
            uri: url,
            fileType: "doc",
          },
        ]);
      }

      if (url.includes(".pdf") || url.includes(".PDF")) {
        setFileContract([
          {
            uri: url,
            fileType: "pdf",
          },
        ]);
      }

      if (url.includes(".xlsx")) {
        setFileContract([
          {
            uri: url,
            fileType: "xlsx",
          },
        ]);
      }

      if (url.includes(".pptx")) {
        setFileContract([
          {
            uri: url,
            fileType: "pptx",
          },
        ]);
      }
    }
  }, [url]);


  return (
    <div className="box__view_document">
      <div className="container-header">
        <div 
          className="button-download"
          onClick={() => {
            handDownloadFileOrigin(url, decodedName)
          }}
        >
          <Icon name="Download" />
          Tải xuống
        </div>
      </div>
      <DocViewer
        pluginRenderers={DocViewerRenderers}
        documents={fileContract}
        config={{
        header: {
            disableHeader: true,
            disableFileName: false,
            retainURLParams: false,
        },
        }}
        style={{ height: "100vh" }}
    />
    </div>
  );
}
