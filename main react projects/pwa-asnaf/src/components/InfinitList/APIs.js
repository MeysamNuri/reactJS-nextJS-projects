import { axiosInstance as axios } from "../../constants/axios";

const APIs = {
  async getNotificationUnread() {
    const { data } = await axios.get('notification/unread/count');
    return data;
  },
  async getAllNotification(url) {
    const { data } = await axios.get(url);
    return data;
  },
};

export default APIs;