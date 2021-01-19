import { axiosInstance as axios } from "../../constants/axios";

const APIs = {
  async getShowNotificationContent(id) {
    const { data } = await axios.get(`notification/show/${id}`);
    return data;
  },
};

export default APIs;