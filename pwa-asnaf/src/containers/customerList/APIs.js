import { axiosInstance as axios } from "../../constants/axios";

const APIs = {
  async getCustomerList(id, from, to, sort, page) {
    const { data } = await axios.get(
      `customers/list/${id}?from=${from}&to=${to}&sort=${sort}&page=${page}`
    );
    return data;
  },
};

export default APIs;
