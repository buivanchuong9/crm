export const handleDownload = async (link: string, nameData?: string) => {
  if (!link) return;
};

export const getFileExtension = (file) => {
  const lastIndex = file.lastIndexOf(".");
  if (lastIndex !== -1) {
    return file.slice(lastIndex + 1).toLowerCase();
  }
  return "png";
};

export const takeThumbnailImgYoutube = (url: string) => {
  if (!url) return;
  const params = url.split("&");
  const handleParmas = params.find((param) => param.includes("v="));
  const result = handleParmas?.slice(handleParmas.indexOf("=") + 1);
  return result;
};

export const handDownloadFileOrigin = (file, nameFile) => {
  if (!file) return;

  let fileUrl: string;

  if (file.trim().startsWith("{")) {
    const parsed = JSON.parse(file);
    if (parsed && typeof parsed.fileUrl === "string") {
      fileUrl = parsed.fileUrl;
    }
  } else {
    fileUrl = file;
  }

  const xhr = new XMLHttpRequest();
  xhr.open("GET", fileUrl, true);
  xhr.responseType = "blob";

  xhr.onload = function () {
    if (xhr.status === 200) {
      const blob = new Blob([xhr.response], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = nameFile;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
  };

  xhr.send();
};

export const downloadImage = (imageUrl, imageName) => {
  if (!imageUrl) return;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", imageUrl, true);
  xhr.responseType = "blob";

  xhr.onload = function () {
    if (xhr.status === 200) {
      const blob = new Blob([xhr.response], { type: xhr.getResponseHeader("Content-Type") });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = imageName || "image_download";
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
  };

  xhr.send();
};
