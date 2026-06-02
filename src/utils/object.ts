import { isArray, isObject, transform } from "lodash";

export const isDifferenceObj = (orgObj, newObj) => {
  return Object.keys(differenceObj(orgObj, newObj)).length > 0;
};

export const differenceObj = (orgObj, newObj) => {
  function changes(newObj, orgObj): Record<string, any> {
    let arrayIndexCounter = 0;
    return transform(newObj, function (result, value, key: string) {
      if (value != orgObj[key]) {
        const resultKey = isArray(orgObj) ? arrayIndexCounter++ : key;
        result[resultKey] = isObject(value) && isObject(orgObj[key]) ? changes(value, orgObj[key]) : value;
      }
    });
  }
  function changesReverse(orgObj, newObj): Record<string, any> {
    let arrayIndexCounter = 0;
    return transform(orgObj, function (result, value, key: string) {
      if (value != newObj[key]) {
        const resultKey = isArray(newObj) ? arrayIndexCounter++ : key;
        result[resultKey] = isObject(value) && isObject(newObj[key]) ? changesReverse(value, newObj[key]) : value;
      }
    });
  }
  if (!newObj && !orgObj) {
    return {};
  }
  if (!newObj) {
    return orgObj;
  }
  if (!orgObj) {
    return newObj;
  }
  return { ...changes(newObj, orgObj), ...changesReverse(orgObj, newObj) };
};
