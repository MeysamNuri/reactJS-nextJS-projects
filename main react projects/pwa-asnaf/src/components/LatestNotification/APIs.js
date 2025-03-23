import { axiosInstance as axios } from "../../constants/axios";

const APIs = {
   async getLatestNotification() {
    const { data } = await axios.get("notification/latest");
    return data;
  },
  async getNotificationUnread() {
    const { data } = await axios.get('notification/unread/count');
    return data;
  },
};

export default APIs;