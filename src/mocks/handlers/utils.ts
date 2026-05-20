export const getRequestInfo = (request: Request) => {
  const url = new URL(request.url);
  return {
    method: request.method.toUpperCase(),
    pathname: url.pathname.toLowerCase(),
  };
};

export const buildListResponse = (result: any[] = []) => {
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
