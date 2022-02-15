import mock from "../utils/axios-mock";

mock.onPost(`/api/admin/score/`).reply((config) => {
  let pageSize = 10;
  let page = 1;
  if (config.data) {
    const request = JSON.parse(config.data);
    page = request.page;
    pageSize = request.pageSize;
  }
  const SetData = () => {
    let data = [];
    for (let i = 0; i < 5; i++) {
      let item = {
        no: i + 1,
        id: i + 700,
      
        // username: `curtis.weaver@example.com`,
        // type: `Mock 1`,
        status: `${(i+1) % 3 == 0 ? "Done" : "In progress"}`,
      };
      data.push(item);
    }
    return data;
  };
  const data = {
    infor: SetData(),
  }; 
  return [200, data];
});
