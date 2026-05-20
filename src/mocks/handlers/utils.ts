export const getRequestInfo = (request: Request) => {
  const url = new URL(request.url);
  return {
    method: request.method.toUpperCase(),
    pathname: url.pathname.toLowerCase(),
  };
};

export const parseQueryParams = (request: Request): Record<string, any> => {
  const url = new URL(request.url);
  const params: Record<string, any> = {};
  url.searchParams.forEach((value, key) => {
    if (value === "") {
      params[key] = "";
      return;
    }
    const asNum = Number(value);
    params[key] = !Number.isNaN(asNum) && value.trim() !== "" ? asNum : value;
  });
  return params;
};

export const filterAndPaginate = <T extends Record<string, any>>(items: T[], params: Record<string, any> = {}) => {
  let filtered = [...items];
  const name = params.name ?? params.keyword ?? params.reason ?? params.keyWord ?? "";

  if (name) {
    const q = String(name).toLowerCase();
    filtered = filtered.filter(
      (item) =>
        String(item.name ?? item.title ?? item.code ?? "").toLowerCase().includes(q) ||
        String(item.customerName ?? item.potId ?? "").toLowerCase().includes(q)
    );
  }

  if (params.status !== undefined && params.status !== "" && params.status !== -1 && params.status !== "-1") {
    filtered = filtered.filter((item) => Number(item.status) === Number(params.status));
  }

  if (params.isPriority !== undefined && params.isPriority !== "" && params.isPriority !== null) {
    const priority = Number(params.isPriority);
    if (priority === 4) {
      filtered = filtered.filter((item) => Number(item.priorityLevel) >= 4);
    } else if (priority === 3) {
      filtered = filtered.filter((item) => Number(item.priorityLevel) === 3);
    } else if (priority === 2) {
      filtered = filtered.filter((item) => Number(item.priorityLevel) <= 2);
    } else {
      filtered = filtered.filter((item) => Number(item.priorityLevel) >= priority);
    }
  }

  if (params.businessRuleId) {
    filtered = filtered.filter((item) => Number(item.businessRuleId) === Number(params.businessRuleId));
  }

  if (params.processId !== undefined && params.processId !== -1 && params.processId !== "" && params.processId !== "-1") {
    filtered = filtered.filter((item) => Number(item.processId) === Number(params.processId));
  }

  if (params.employeeId) {
    filtered = filtered.filter((item) => Number(item.employeeId) === Number(params.employeeId));
  }

  const limit = Number(params.limit) || 10;
  const page = Number(params.page) || 1;
  const total = filtered.length;
  const start = (page - 1) * limit;
  const pageItems = filtered.slice(start, start + limit);

  const arr: any = [...pageItems];
  arr.items = pageItems;
  arr.loadMoreAble = page * limit < total;
  arr.total = total;
  arr.totalCount = total;
  arr.page = page;
  arr.limit = limit;

  return {
    code: 0,
    message: "mock",
    result: arr,
    total,
    totalCount: total,
    recordsTotal: total,
    recordsFiltered: total,
  };
};

export const buildListResponse = (result: any[] = [], params: Record<string, any> = {}) => {
  if (params.page || params.limit || params.name || params.keyword || params.status !== undefined || params.isPriority) {
    return filterAndPaginate(result, params);
  }

  const arr = [...result] as any;
  arr.items = arr;
  arr.loadMoreAble = false;
  arr.total = arr.length;
  arr.totalCount = arr.length;
  arr.page = 1;
  arr.limit = 10;

  return {
    code: 0,
    message: "mock",
    result: arr,
    total: arr.length,
    totalCount: arr.length,
    recordsTotal: arr.length,
    recordsFiltered: arr.length,
  };
};

export const buildCountResponse = (count = 0) => ({
  code: 0,
  message: "mock",
  result: count,
});

export const buildDetailResponse = (result: Record<string, any> = {}) => ({
  code: 0,
  message: "mock",
  result,
});

export const buildOkResponse = (result: Record<string, any> = {}) => ({
  code: 0,
  message: "mock",
  success: true,
  result,
});
