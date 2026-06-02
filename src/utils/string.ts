export const getCharByCode = (str: string, position: number) => {
  return String.fromCharCode(str.charCodeAt(0) + position);
};

export const getTextFromReactElement = (elem: React.ReactElement | string) => {
  if (["string"].includes(typeof elem)) return elem;
  if (elem instanceof Array) return elem.map(getTextFromReactElement).join("");
  if (typeof elem === "object" && elem) return getTextFromReactElement(elem.props.children);
};

export const generateRandomString = (length) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const getField = (str) => {
  const AccentsMap = [
    "aàảãáạăằẳẵắặâầẩẫấậ",
    "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
    "dđ",
    "DĐ",
    "eèẻẽéẹêềểễếệ",
    "EÈẺẼÉẸÊỀỂỄẾỆ",
    "iìỉĩíị",
    "IÌỈĨÍỊ",
    "oòỏõóọôồổỗốộơờởỡớợ",
    "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
    "uùủũúụưừửữứự",
    "UÙỦŨÚỤƯỪỬỮỨỰ",
    "yỳỷỹýỵ",
    "YỲỶỸÝỴ",
  ];

  for (let i = 0; i < AccentsMap.length; i++) {
    const re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
    const char = AccentsMap[i][0];
    str = str.replace(re, char);
  }

  str = str.charAt(0).toLowerCase() + str.slice(1);
  str = str.replace(/[^a-zA-Z0-9]+(.)/g, (match, char) => char.toUpperCase());
  str = str.replace(/\s+/g, "");

  return str;
};
