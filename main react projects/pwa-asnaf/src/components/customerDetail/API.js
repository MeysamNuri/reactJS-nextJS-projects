import { axiosInstance as axios } from "../../constants/axios";

const APIs = {
  async getCustomerDetail(bussinesid, customerId) {
    const { data } = await axios.get(
      `customer/transactions/${bussinesid}/${customerId}?sort=asc&page=1`
    );
    return data;
  },
};

export default APIs;
