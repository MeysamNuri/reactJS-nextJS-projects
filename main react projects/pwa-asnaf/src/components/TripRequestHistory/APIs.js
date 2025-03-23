import { axiosInstance as axios } from "../../constants/axios";

const APIs = {
  async getTourAllowanceHistory() {
    const { data } = await axios.get("tourism/allowance/history");
    return data;
  },
};

export default APIs;
