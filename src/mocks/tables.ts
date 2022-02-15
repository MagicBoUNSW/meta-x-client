import mock from "../utils/axios-mock";

mock.onPost(`/api/user/tables/`).reply((config) => {
  let pageSize = 10;
  let page = 1;
  if (config.data) {
    const request = JSON.parse(config.data);
    page = request.page;
    pageSize = request.pageSize;
  }

  const startPage = pageSize * page - pageSize;
  const endPage = pageSize * page > 64 ? 64 : pageSize * page;

  const TableData = () => {
    let data = [];
    for (let i = startPage; i < endPage; i++) {
      let item = {
        no: i + 1,
        key: i + 1,
        id: i + 1000,
        username: `curtis.weaver@example.com`,
        type: `Mock 1`,
        status: `${(i+1) % 3 == 0 ? "Done" : "In progress"}`,
        overallScore: `${(i+1) % 3 == 0 ? "60/90" : "-- / 90"}`,
        date: "Dec 4, 2019 21:42",
      };
      data.push(item);
    }
    return data;
  };
  const data = {
    total: 64,
    page: page,
    pageSize: pageSize,
    data: TableData(),
  };

  return [200, data];
});
