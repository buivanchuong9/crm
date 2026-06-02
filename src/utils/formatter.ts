import moment from "moment";

export const formatCurrency = (num, separate = ",", suffixes = "đ", positionSuffixes = "right", decimal = 2) => {
  if (num || num === 0) {
    const s = decimal > 0 ? parseFloat(num).toFixed(decimal).toString() : Math.round(num).toString();
    const [integerPart, decimalPart] = s.split(".");
    const regex = /\B(?=(\d{3})+(?!\d))/g;
    const formattedInteger = integerPart.replace(regex, separate);
    const formattedNumber = decimal > 0 && decimalPart && parseFloat(decimalPart) > 0 ? `${formattedInteger}.${decimalPart}` : formattedInteger;
    return positionSuffixes === "right" ? formattedNumber + suffixes : suffixes + formattedNumber;
  } else {
    return positionSuffixes === "right"
      ? `0${decimal > 0 ? "." + "0".repeat(decimal) : ""}${suffixes}`
      : `${suffixes}0${decimal > 0 ? "." + "0".repeat(decimal) : ""}`;
  }
};

export const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const convertToPrettyNumber = (total: number) => {
  if (!total) {
    return `${0} <span className="currency-unit">Nghìn</span>`;
  }

  const options = {
    minimunFrationDigits: 0,
    maxnimunFrationDigits: 0,
    minimunIntegerDigits: 1,
  };

  if (total > 999000) {
    const formattedNumber = (total / 1000000).toLocaleString("vi-VN", options as any);
    return `${formattedNumber} <span className="currency-unit">Triệu</span>`;
  }

  if (total > 99000) {
    const formattedNumber = (total / 100000).toLocaleString("vi-VN", options as any);
    return `${formattedNumber} <span className="currency-unit">Trăm</span>`;
  }

  if (total > 9000) {
    const formattedNumber = (total / 10000).toLocaleString("vi-VN", options as any);
    return `${formattedNumber} <span className="currency-unit">Chục</span>`;
  }
};

export function listTimeSlots(startTime, endTime, intervalMinutes) {
  const timeSlots = [];
  let currentTime = moment(startTime);

  while (currentTime.isBefore(endTime)) {
    const data = {
      value: currentTime.format("HH:mm:ss"),
      label: currentTime.format("HH:mm"),
    };
    timeSlots.push(data);
    currentTime.add(intervalMinutes, "minutes");
  }

  return timeSlots;
}
